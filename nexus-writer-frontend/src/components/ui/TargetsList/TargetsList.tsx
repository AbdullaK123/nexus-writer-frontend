'use client'
import { TargetResponse } from '@/app/types';
import styles from './TargetsList.module.css';

interface TargetsListProps {
    targets: TargetResponse[];
    onEdit: (target: TargetResponse) => void;
    onDelete: (target: TargetResponse) => void;
}

const frequencyEmoji: Record<string, string> = {
    'Daily': '📅',
    'Weekly': '📆',
    'Monthly': '🗓️'
};

const frequencyColor: Record<string, string> = {
    'Daily': '#00d4ff',
    'Weekly': '#00ff88',
    'Monthly': '#ff7300'
};

export default function TargetsList({ targets, onEdit, onDelete }: TargetsListProps) {
    if (targets.length === 0) {
        return null;
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                🎯 Active Targets ({targets.length})
            </h3>
            
            <div className={styles.targetsList}>
                {targets.map((target) => (
                    <div 
                        key={target.targetId} 
                        className={styles.targetCard}
                        style={{ 
                            borderColor: frequencyColor[target.frequency],
                            '--glow-color': frequencyColor[target.frequency]
                        } as React.CSSProperties}
                    >
                        <div className={styles.targetHeader}>
                            <span className={styles.frequencyBadge}>
                                {frequencyEmoji[target.frequency]} {target.frequency}
                            </span>
                            <div className={styles.actions}>
                                <button 
                                    className={styles.editButton}
                                    onClick={() => onEdit(target)}
                                    aria-label="Edit target"
                                >
                                    ✏️
                                </button>
                                <button 
                                    className={styles.deleteButton}
                                    onClick={() => onDelete(target)}
                                    aria-label="Delete target"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                        
                        <div className={styles.targetInfo}>
                            <div className={styles.quota}>
                                <span className={styles.label}>Quota:</span>
                                <span className={styles.value}>{target.quota.toLocaleString()} words</span>
                            </div>
                            <div className={styles.dateRange}>
                                <span className={styles.label}>Period:</span>
                                <span className={styles.value}>
                                    {formatDate(target.fromDate)} → {formatDate(target.toDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
