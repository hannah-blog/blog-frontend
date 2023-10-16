'use client'

import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import styles from '@/styles/app/private/page.module.css'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { imageActions } from '@/api/fetch-formatter'
import { CreatePortfolio, fetchCreatePortfolio } from '@/api/caller'
import { Button, Typography } from '@/components/tailwind/client-components'
import onImagePasted from '@/components/utils/on-image-pasted'

export default function Portfolio() {
	const router = useRouter();

	const [title, setTitle] = useState<string>('');
	const onTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

	const [file, setFile] = useState<File | null>(null);
	const [content, setContent] = useState<string | undefined>();
	const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

	const uploadImage = async () => {
		if (!file) {
			alert('파일 선택하셈');
			return;
		}
		const result = await imageActions(file);
		if (result) {
			setThumbnailUrl(result.data);
		}
	}

	const save = async () => {
		if (!title || !content || !thumbnailUrl) {
			alert('빈칸 채워');
			return;
		}
		const request: CreatePortfolio = {
			title,
			content,
			thumbnailUrl,
		}
		fetchCreatePortfolio(request)
			.then(() => {
				alert('성공');
				router.push('/private/portfolio');
			});
	}

	return <div className={styles.wrapper}>
		<Typography variant="h1">New Portfolio</Typography>
		<Typography variant="h5">title</Typography>
		<input type="text" onChange={onTitle} />
		<Typography variant="h5">content</Typography>
		<MDEditor
			value={content}
			onChange={setContent}
			onPaste={ async (e) => await onImagePasted(e.clipboardData, setContent) }
			onDrop={ async (e) => await onImagePasted(e.dataTransfer, setContent) }
			height={400}
		/>
		<Typography variant="h5">thumbnail</Typography>
		<input
			type="file"
			onChange={(e) => {
				if (!e.target?.files) return;
				setFile(e.target?.files[0]);
			}}
			placeholder="썸네일 이미지 업로드"
			width="100%"
		/>
		<Button onClick={uploadImage}>업로드</Button>
		<Image alt={thumbnailUrl} src={thumbnailUrl} width={300} height={300} />
		<br />
		<hr />
		<br />
		<Button onClick={save}>저장</Button>
	</div>

}
