import styles from './ContextMenu.module.css'

interface MenuSectionProps {
  title: string
  children: React.ReactNode
}

export default function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      {children}
    </div>
  )
}