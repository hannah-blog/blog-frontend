import styles from '@/styles/components/post/side.module.css'
import { Typography } from '@/components/tailwind/client-components'
import { Tag } from '@/api/caller'
import { toUpperCase } from 'uri-js/dist/esnext/util'

export default function TagBox({ tags }: { tags: Tag[] }) {
	return <div className={styles.tagWrapper}>
		<Typography variant="h6" color="gray">태그</Typography>
		{tags.map((tag, idx) => {
			return <Typography key={idx} color="gray">#{toUpperCase(tag.name)}</Typography>;
		})}
	</div>;
}
