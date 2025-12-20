import { MetricCircle } from './MetricCircle';

interface AnalysisResult {
    overallScore: number;
    rating: string;
    metrics: {
        name: string;
        score: number;
    }[];
}

interface ResultsStepProps {
    results: AnalysisResult;
    onClose?: () => void;
}

export function ResultsStep({ results }: ResultsStepProps) {
    return (
        <div className="px-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-1">Résultats de votre analyse</h2>
            <p className="text-sm text-[#2F2F2F] mb-6">Voici votre rapport d'analyse faciale personnalisé!</p>

            <div className="bg-[#A855F7] rounded-xl p-6 mb-6 text-center">
                <div className="text-6xl font-bold text-white mb-1">{results.overallScore.toFixed(1)}</div>
                <p className="text-purple-100 font-medium">Score global</p>
                <p className="text-sm text-purple-200 mt-1">{results.rating}</p>
            </div>

            <div className="">
                <h3 className="text-lg font-medium text-[#2F2F2F] mb-4">Analyse détaillée</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {results?.metrics?.map((metric) => (
                        <MetricCircle key={metric.name} name={metric.name} score={metric.score} />
                    ))}
                </div>
            </div>
        </div>
    );
}