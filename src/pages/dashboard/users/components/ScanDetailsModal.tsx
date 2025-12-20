import { Modal } from 'antd';
import { Check, Target } from 'lucide-react';
import { ResultsStep } from './ResultsStep';

interface ScanDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    scan: any | null;
}

export function ScanDetailsModal({ isOpen, onClose, scan }: ScanDetailsModalProps) {
    if (!scan) return null;

    // Transform scan data to match ResultsStep expected format
    const analysisResult = {
        overallScore: scan.average_rating || 0,
        rating: getOverallRating(scan.average_rating || 0),
        metrics: [
            { name: 'Qualité de la peau', score: scan.ratings?.skin_quality || 0 },
            { name: 'Définition de la mâchoire', score: scan.ratings?.jawline_definition || 0 },
            { name: 'Structure des pommettes', score: scan.ratings?.cheekbone_structure || 0 },
            { name: 'Zone des yeux', score: scan.ratings?.eye_area || 0 },
            { name: 'Proportions faciales', score: scan.ratings?.facial_proportions || 0 },
            { name: 'Symétrie', score: scan.ratings?.symmetry || 0 },
            { name: 'Objectifs', score: scan.ratings?.goals || 0 },
        ],
    };

    function getOverallRating(score: number): string {
        if (score >= 9.5) return 'Exceptionnel';
        if (score >= 9.0) return 'Remarquable';
        if (score >= 8.5) return 'Excellent';
        if (score >= 8.0) return 'Très bien';
        if (score >= 7.5) return 'Bien';
        if (score >= 7.0) return 'Supérieur à la moyenne';
        if (score >= 6.0) return 'Moyenne';
        if (score >= 5.0) return 'En dessous de la moyenne';
        return 'Nécessite des améliorations';
    }

    return (
        <Modal title="Détails du scan" open={isOpen} onCancel={onClose} footer={null} centered width={1000}>
            <div className="grid grid-cols-12 gap-8">
                {/* Colonne gauche - Résultats */}
                <div className="md:min-w-lg p-2 md:pt-5 rounded-2xl whiteShadow pt-[610px] col-span-5">
                    <ResultsStep results={analysisResult} />
                </div>

                {/* Colonne droite - Forces, Conseils et Recommandations */}
                <div className="md:min-w-lg min-w-full pt-5 whiteShadow rounded-2xl p-6 space-y-6 col-span-7">
                    {/* Forces clés */}
                    {scan.key_strengths && scan.key_strengths.length > 0 && (
                        <div>
                            <h2 className="text-[#2F2F2F] text-lg font-medium mb-3">Forces clés</h2>
                            <div className="space-y-2">
                                {scan.key_strengths.map((strength: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 whiteShadow rounded-[10px] px-4 py-3"
                                    >
                                        <Check className="w-4 h-4 text-[#A855F7] shrink-0" />
                                        <span className="text-[#000000] text-sm">{strength}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Conseils d'amélioration */}
                    {scan.exercise_guidance && scan.exercise_guidance.length > 0 && (
                        <div>
                            <h2 className="text-[#2F2F2F] text-lg font-medium mb-3">Conseils d'amélioration</h2>
                            <div className="space-y-2">
                                {scan.exercise_guidance.map((tip: string, index: number) => (
                                    <div key={index} className="whiteShadow rounded-[10px] px-4 py-3">
                                        <span className="text-[#000000] text-sm">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recommandations de l'IA */}
                    {scan.ai_recommendations && scan.ai_recommendations.length > 0 && (
                        <div>
                            <h2 className="text-[#2F2F2F] text-lg font-medium mb-3">Recommandations IA</h2>
                            <div className="space-y-3">
                                {scan.ai_recommendations.map((recommendation: any, index: number) => (
                                    <div key={index} className="whiteShadow rounded-[10px] px-4 py-3">
                                        <div className="flex items-start gap-3">
                                            <Target className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-[#2F2F2F] text-sm mb-1">
                                                    {recommendation.title}
                                                </div>
                                                <span className="text-[#000000] text-sm">
                                                    {recommendation.description}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Message si pas d'information disponible */}
                    {(!scan.key_strengths || scan.key_strengths.length === 0) &&
                        (!scan.exercise_guidance || scan.exercise_guidance.length === 0) &&
                        (!scan.ai_recommendations || scan.ai_recommendations.length === 0) && (
                            <div className="text-center py-8">
                                <p className="text-[#8c8c8c] text-sm">
                                    Aucune information supplémentaire disponible pour ce scan
                                </p>
                            </div>
                        )}
                </div>
            </div>
        </Modal>
    );
}
