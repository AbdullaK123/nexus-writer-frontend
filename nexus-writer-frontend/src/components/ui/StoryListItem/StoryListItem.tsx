'use client'
import { StoryListItemProps } from "@/app/types";
import styles from "./StoryListItem.module.css";
import { formatWordCount } from "@/app/lib/utils";
import {useInView} from "@/app/hooks/useInView";
import {useStoryListItemActions} from "@/app/hooks/useStoryListItemActions";
import AnalyticsContextMenu from "@/components/ui/AnalyticsContextMenu/AnalyticsContextMenu";

export default function StoryListItem({
    storyId,
    title,
    status,
    wordCount,
    handleOnClick,
    handleClearSelection,
    handleOnShowTargetForm
}: StoryListItemProps) {
    const {
        menu,
        closeMenu,
        openMenu,
        handleOnAction
    } = useStoryListItemActions(
        storyId,
        handleOnClick,
        handleClearSelection,
        handleOnShowTargetForm
    )
    const {elementRef} = useInView(1, closeMenu)

    return (
        <div ref={elementRef}>
            <div
                onClick={handleOnClick}
                className={styles['story-list-item-container']}
                onContextMenu={openMenu}
            >
                <div className={styles['flex-col-container']}>
                    <div className={styles['story-title']}>{title}</div>
                    <div className={styles['story-metadata-container']}>
                        <span>{formatWordCount(wordCount)}</span>
                        <span>{status}</span>
                    </div>
                </div>
                <div className={styles['arrow-icon']}>
                    →
                </div>
            </div>
            {menu.visible && (
                <AnalyticsContextMenu 
                    x={menu.x}
                    y={menu.y}
                    onClose={closeMenu}
                    onAction={handleOnAction}   
                />
            )}
        </div>
    )
}