'use client'
import { MilkdownEditorWrapper } from "@/components/features/MilkdownEditor/MilkdownEditor";
import styles from './page.module.css'

export default function Page({ params }) {

    const getID = async () => (await params).id

    console.log(`On chapters/${getID()}`)

    return (
        <div className={styles['content-container']}>
            <div className={styles['editor-container']}>
                <MilkdownEditorWrapper />
            </div>
        </div>
    )
}