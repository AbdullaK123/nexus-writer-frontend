'use client'

import { toCastManagementReportCardProps, toCharacterCountLineChartProps, toCharacterDensityChartProps, toCharacterGridProps, toCharacterPresenceHeatmapProps } from "@/compatability/transformers"
import { CastManagementReportCard, CharacterCountLineChart, CharacterDensityChart, CharacterGrid, CharacterPresenceHeatmap } from "@/components/analysis"
import { AsyncBoundary } from "@/components/common"
import { useCharacters } from "@/data/hooks"
import { useParams } from "next/navigation"
import styles from "../AnalysisPage.module.css"

export default function CastPageContent() {

    const params = useParams()
    const storyId = params.id as string

    const {
          // characters
        characters,
        charactersLoading,
        charactersLoadingError,
        // character presence map
        characterPresenceMap,
        characterPresenceMapLoading,
        characterPresenceMapError,
        // character introduction rate
        characterIntroductionRate,
        characterIntroductionRateLoading,
        characterIntroductionRateError,
        // cast density
        castDensity,
        castDensityLoading,
        castDensityError,
        // cast Report
        castReport,
        castReportLoading,
        castReportError
    } = useCharacters(storyId)


    return (
        <div className={styles.page}>
            <h2>Characters</h2>
            <div className={styles.section}>
                <h3>Cast Overview</h3>
                <AsyncBoundary
                    data={characters && characterPresenceMap ? { characters, characterPresenceMap } : undefined}
                    isLoading={charactersLoading || characterPresenceMapLoading}
                    isError={charactersLoadingError || characterPresenceMapError}
                    errorMessage="Failed to load characters."
                >
                    {(data) => (
                        <CharacterGrid 
                            {...toCharacterGridProps(storyId, data.characters, data.characterPresenceMap)}
                        />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Presence and Density</h3>
                <AsyncBoundary
                    data={characterPresenceMap}
                    isLoading={characterPresenceMapLoading}
                    isError={characterPresenceMapError}
                    errorMessage="Failed to load character presence map."
                >
                    {(data) => (
                        <CharacterPresenceHeatmap 
                            {...toCharacterPresenceHeatmapProps(storyId, data)}
                        />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={characterIntroductionRate}
                    isLoading={characterIntroductionRateLoading}
                    isError={characterIntroductionRateError}
                    errorMessage="Failed to load character introduction rate."
                >
                    {(data) => (
                        <CharacterCountLineChart 
                            {...toCharacterCountLineChartProps(storyId, data)}
                        />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={castDensity}
                    isLoading={castDensityLoading}
                    isError={castDensityError}
                    errorMessage="Failed to load cast density."
                >
                    {(data) => (
                        <CharacterDensityChart 
                            {...toCharacterDensityChartProps(storyId, data)}
                        />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Cast Report</h3>
                <AsyncBoundary
                    data={castReport}
                    isLoading={castReportLoading}
                    isError={castReportError}
                    errorMessage="Failed to load cast management report."
                >
                    {(data) => (
                        <CastManagementReportCard 
                            {...toCastManagementReportCardProps(data)}
                        />
                    )}
                </AsyncBoundary>
            </div>
        </div>
    )
}