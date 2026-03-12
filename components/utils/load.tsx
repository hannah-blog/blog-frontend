import styles from '@/styles/components/utils/style.module.css'

export default function Load() {
  return (
    <div className={styles.loadStyle}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
    </div>
  )
}
