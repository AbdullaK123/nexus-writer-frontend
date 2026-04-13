import { AnalysisSidebarProps, AnalysisSection } from "./types";
import styles from './AnalysisSidebar.module.css';

const sections: { key: AnalysisSection; label: string; icon: string }[] = [
    { key: 'characters', label: 'Characters', icon: '👤' },
    { key: 'plot',       label: 'Plot',       icon: '📖' },
    { key: 'structure',  label: 'Structure',  icon: '🏗' },
    { key: 'world',      label: 'World',      icon: '🌍' },
];

export default function AnalysisSidebar({
    activeSection,
    onCharactersClicked,
    onPlotClicked,
    onStructureClicked,
    onWorldClicked
}: AnalysisSidebarProps) {
    const handlers: Record<AnalysisSection, () => void> = {
        characters: onCharactersClicked,
        plot: onPlotClicked,
        structure: onStructureClicked,
        world: onWorldClicked,
    };

    return (
        <aside className={styles.sidebar}>
            <h3 className={styles.heading}>Analysis</h3>
            <nav className={styles.nav}>
                {sections.map(({ key, label, icon }) => (
                    <button
                        key={key}
                        className={activeSection === key ? styles['nav-item-active'] : styles['nav-item']}
                        onClick={handlers[key]}
                        aria-current={activeSection === key ? 'page' : undefined}
                        type="button"
                    >
                        <span className={styles.icon} aria-hidden="true">{icon}</span>
                        <span className={styles.label}>{label}</span>
                        <span className={styles.indicator} />
                    </button>
                ))}
            </nav>
        </aside>
    );
}