import styles from '@/styles/components/utils/style.module.css'
import { Spinner } from '@material-tailwind/react'

export default function Load() {
	return <div className={styles.loadStyle}>
		<Spinner color="indigo" className="h-12 w-12" />
	</div>;
}
