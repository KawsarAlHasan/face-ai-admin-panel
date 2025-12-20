// New Code for ScanDetailsModal

import { Modal, Progress, Tag, Divider } from 'antd';
import { Check, TrendingUp, Target } from 'lucide-react';

interface ScanDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    scan: any | null;
}

export function ScanDetailsModal({ isOpen, onClose, scan }: ScanDetailsModalProps) {
    if (!scan) return null;

    const getRatingColor = (rating: number) => {
        if (rating >= 8.5) return '#52c41a';
        if (rating >= 7.0) return '#1890ff';
        if (rating >= 5.5) return '#faad14';
        return '#ff4d4f';
    };

    const getProgressStatus = (rating: number): "success" | "normal" | "exception" => {
        if (rating >= 8.5) return 'success';
        if (rating >= 7.0) return 'normal';
        return 'exception';
    };

    const ratings = scan.ratings || {};
    const ratingCategories = [
        { label: 'Skin Quality', value: ratings.skin_quality || 0, key: 'skin_quality' },
        { label: 'Jawline Definition', value: ratings.jawline_definition || 0, key: 'jawline_definition' },
        { label: 'Cheekbone Structure', value: ratings.cheekbone_structure || 0, key: 'cheekbone_structure' },
        { label: 'Eye Area', value: ratings.eye_area || 0, key: 'eye_area' },
        { label: 'Facial Proportions', value: ratings.facial_proportions || 0, key: 'facial_proportions' },
        { label: 'Symmetry', value: ratings.symmetry || 0, key: 'symmetry' },
        { label: 'Goals', value: ratings.goals || 0, key: 'goals' },
    ];

    return (
        <Modal 
            title={
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    paddingRight: 40
                }}>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>Scan Details - ID: {scan.id}</span>
                    <Tag 
                        color={getRatingColor(scan.average_rating || 0)}
                        style={{ 
                            fontSize: 16, 
                            padding: '4px 12px',
                            margin: 0
                        }}
                    >
                        Overall: {scan.average_rating?.toFixed(1) || 'N/A'}/10
                    </Tag>
                </div>
            }
            open={isOpen} 
            onCancel={onClose} 
            footer={null} 
            centered 
            width={1000}
        >
            <div style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - Ratings */}
                    <div className="col-span-5">
                        <div style={{
                            backgroundColor: '#fafafa',
                            padding: 20,
                            borderRadius: 12,
                            border: '1px solid #f0f0f0'
                        }}>
                            <h3 style={{ 
                                fontSize: 16, 
                                fontWeight: 600, 
                                marginBottom: 20,
                                color: '#1890ff'
                            }}>
                                Detailed Ratings
                            </h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {ratingCategories.map((category) => (
                                    <div key={category.key}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            marginBottom: 8
                                        }}>
                                            <span style={{ 
                                                fontSize: 14, 
                                                fontWeight: 500,
                                                color: '#262626'
                                            }}>
                                                {category.label}
                                            </span>
                                            <span style={{ 
                                                fontSize: 14, 
                                                fontWeight: 600,
                                                color: getRatingColor(category.value)
                                            }}>
                                                {category.value.toFixed(1)}/10
                                            </span>
                                        </div>
                                        <Progress 
                                            percent={category.value * 10} 
                                            showInfo={false}
                                            strokeColor={getRatingColor(category.value)}
                                            status={getProgressStatus(category.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <Divider />

                            <div style={{
                                backgroundColor: '#fff',
                                padding: 16,
                                borderRadius: 8,
                                textAlign: 'center'
                            }}>
                                <div style={{ 
                                    fontSize: 14, 
                                    color: '#8c8c8c',
                                    marginBottom: 8
                                }}>
                                    Average Rating
                                </div>
                                <div style={{ 
                                    fontSize: 36, 
                                    fontWeight: 700,
                                    color: getRatingColor(scan.average_rating || 0)
                                }}>
                                    {scan.average_rating?.toFixed(2) || 'N/A'}
                                </div>
                                <div style={{ 
                                    fontSize: 13, 
                                    color: '#8c8c8c'
                                }}>
                                    out of 10
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Strengths and Guidance */}
                    <div className="col-span-7">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* Key Strengths */}
                            {scan.key_strengths && scan.key_strengths.length > 0 && (
                                <div style={{
                                    backgroundColor: '#f6ffed',
                                    padding: 20,
                                    borderRadius: 12,
                                    border: '1px solid #b7eb8f'
                                }}>
                                    <h3 style={{ 
                                        fontSize: 16, 
                                        fontWeight: 600, 
                                        marginBottom: 16,
                                        color: '#52c41a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8
                                    }}>
                                        <Check className="w-5 h-5" />
                                        Key Strengths
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {scan.key_strengths.map((strength: string, index: number) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 12,
                                                    backgroundColor: '#fff',
                                                    padding: 12,
                                                    borderRadius: 8,
                                                    border: '1px solid #b7eb8f'
                                                }}
                                            >
                                                <Check className="w-4 h-4 text-[#52c41a] shrink-0" style={{ color: '#52c41a' }} />
                                                <span style={{ fontSize: 14, color: '#262626' }}>
                                                    {strength}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Exercise Guidance */}
                            {scan.exercise_guidance && scan.exercise_guidance.length > 0 && (
                                <div style={{
                                    backgroundColor: '#e6f7ff',
                                    padding: 20,
                                    borderRadius: 12,
                                    border: '1px solid #91d5ff'
                                }}>
                                    <h3 style={{ 
                                        fontSize: 16, 
                                        fontWeight: 600, 
                                        marginBottom: 16,
                                        color: '#1890ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8
                                    }}>
                                        <TrendingUp className="w-5 h-5" />
                                        Exercise Guidance
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {scan.exercise_guidance.map((guidance: string, index: number) => (
                                            <div
                                                key={index}
                                                style={{
                                                    backgroundColor: '#fff',
                                                    padding: 12,
                                                    borderRadius: 8,
                                                    border: '1px solid #91d5ff'
                                                }}
                                            >
                                                <span style={{ fontSize: 14, color: '#262626' }}>
                                                    {index + 1}. {guidance}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* AI Recommendations */}
                            {scan.ai_recommendations && scan.ai_recommendations.length > 0 && (
                                <div style={{
                                    backgroundColor: '#fff7e6',
                                    padding: 20,
                                    borderRadius: 12,
                                    border: '1px solid #ffd591'
                                }}>
                                    <h3 style={{ 
                                        fontSize: 16, 
                                        fontWeight: 600, 
                                        marginBottom: 16,
                                        color: '#fa8c16',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8
                                    }}>
                                        <Target className="w-5 h-5" />
                                        AI Recommendations
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {scan.ai_recommendations.map((recommendation: any, index: number) => (
                                            <div
                                                key={index}
                                                style={{
                                                    backgroundColor: '#fff',
                                                    padding: 16,
                                                    borderRadius: 8,
                                                    border: '1px solid #ffd591'
                                                }}
                                            >
                                                <div style={{ 
                                                    fontSize: 15, 
                                                    fontWeight: 600,
                                                    color: '#fa8c16',
                                                    marginBottom: 6
                                                }}>
                                                    {recommendation.title}
                                                </div>
                                                <div style={{ 
                                                    fontSize: 14, 
                                                    color: '#595959',
                                                    lineHeight: 1.6
                                                }}>
                                                    {recommendation.description}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* No Recommendations Message */}
                            {(!scan.ai_recommendations || scan.ai_recommendations.length === 0) && (
                                <div style={{
                                    backgroundColor: '#f5f5f5',
                                    padding: 20,
                                    borderRadius: 12,
                                    textAlign: 'center',
                                    color: '#8c8c8c'
                                }}>
                                    No AI recommendations available for this scan
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}