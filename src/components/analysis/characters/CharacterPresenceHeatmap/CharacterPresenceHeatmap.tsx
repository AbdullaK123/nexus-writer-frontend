import { Fragment } from 'react'
import Link from 'next/link'
import { CharacterPresenceHeatmapProps } from './types'
import styles from './CharacterPresenceHeatmap.module.css'


export default function CharacterPresenceHeatmap({ storyId, maps }: CharacterPresenceHeatmapProps) {
    const chapterMap = new Map<number, string>()
    for (const m of maps) {
        for (const a of m.appearances) {
            chapterMap.set(a.chapterNumber, a.chapterId)
        }
    }
    const chapters = Array.from(chapterMap.entries()).sort((a, b) => a[0] - b[0])

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Character Presence Map</h3>
            {chapters.length === 0 ? (
                <div className={styles.empty}><p>No appearance data yet.</p></div>
            ) : (
                <div
                    className={styles.heatmap}
                    style={{ gridTemplateColumns: `140px repeat(${chapters.length}, minmax(32px, 1fr))` }}
                >
                    <div className={styles['corner-cell']} />
                    {chapters.map(([num]) => (
                        <div key={num} className={styles['header-cell']}>{num}</div>
                    ))}
                    {maps.map(charMap => {
                        const present = new Set(charMap.appearances.map(a => a.chapterNumber))
                        return (
                            <Fragment key={charMap.characterName}>
                                <div className={styles['name-cell']}>{charMap.characterName}</div>
                                {chapters.map(([num, chId]) =>
                                    present.has(num) ? (
                                        <Link key={num} href={`/chapters/${storyId}/${chId}`} className={`${styles.cell} ${styles['cell-active']}`} />
                                    ) : (
                                        <div key={num} className={styles.cell} />
                                    )
                                )}
                            </Fragment>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
