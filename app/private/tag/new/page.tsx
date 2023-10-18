'use client'

import styles from '@/styles/app/private/page.module.css'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { fetchCreateTag } from '@/api/caller'
import { Button, Typography } from '@/components/tailwind/client-components'

export default function Tag() {
	const router = useRouter();

	const [tag, setTag] = useState<string>('');
	const onTag = (e: ChangeEvent<HTMLInputElement>) => setTag(e.target.value);

	const save = async () => {
		if (!tag) {
			alert('빈칸 채워');
			return;
		}
		fetchCreateTag(tag)
			.then(() => {
				alert('성공');
				router.push('/private/tag');
			});
	}

	return <div className={styles.wrapper}>
		<Typography variant="h1">New Tag</Typography>
		<Typography variant="h5">tag</Typography>
		<input type="text" onChange={onTag} />
		<br />
		<hr />
		<br />
		<Button onClick={save}>save</Button>
	</div>

}
