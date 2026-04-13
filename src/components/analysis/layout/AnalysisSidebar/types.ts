export type AnalysisSection = 'characters' | 'plot' | 'structure' | 'world';

export interface AnalysisSidebarProps {
    activeSection: AnalysisSection;
    onCharactersClicked: () => void;
    onPlotClicked: () => void;
    onStructureClicked: () => void;
    onWorldClicked: () => void;
}