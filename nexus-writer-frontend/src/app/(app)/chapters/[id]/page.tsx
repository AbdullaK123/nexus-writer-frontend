'use client'
import LexicalEditor from '@/components/features/LexicalEditor/LexicalEditor'
import styles from './page.module.css'

export default function Page({ params }) {

    const getID = async () => (await params).id

    console.log(`On chapters/${getID()}`)

    return (
        <div className={styles['content-container']}>
            <LexicalEditor />
        </div>
    )
}