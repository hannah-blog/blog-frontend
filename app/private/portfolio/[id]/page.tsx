'use client'

import styles from '@/styles/app/private/page.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchDeletePortfolio, fetchPortfolio, fetchUpdatePortfolio, Portfolio } from '@/api/caller'
import { imageActions } from '@/api/fetch-formatter'
import { Button, Typography } from '@/components/tailwind/client-components'
import onImagePasted from '@/components/utils/on-image-pasted'
import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import Load from '@/components/utils/load'

export default function PortfolioDetail({
 params: { id },
}: {
	params: { id: number }
}) {

	const router = useRouter();

	const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
	const [content, setContent] = useState<string>();
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		fetchPortfolio(id).then((data) => {
			setPortfolio(data);
			setContent(data.content);
		});
	}, []);

	const uploadImage = async () => {
		if (!file) {
			alert('파일 선택하셈');
			return;
		}
		const result = await imageActions(file);
		if (result && portfolio) {
			portfolio.thumbnailUrl = result.data;
		}
	}

	const update = () => {
		if (!portfolio) return alert('안 돼. 돌아가.');
		const request = {
			title: String(portfolio.title),
			content: String(content),
			thumbnailUrl: String(portfolio.thumbnailUrl),
		}
		fetchUpdatePortfolio(portfolio.id, request)
			.then(() => {
				alert('와안료');
				router.push('/private/portfolio');
			})
	}

	const deletePost = () => {
		if (!portfolio) return alert('안 돼. 돌아가.');
		fetchDeletePortfolio(portfolio.id)
			.then(() => {
				alert('삭제함');
				router.push('/private/portfolio');
			});
	}

	return <>
		{ portfolio ?
			<>
				<div className={styles.wrapper}>
					<Typography variant="h1">Update Portfolio</Typography>
					<Typography variant="h5">title</Typography>
					<input
						value={portfolio.title}
						onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
					/>
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
					<Image alt={portfolio.thumbnailUrl} src={portfolio.thumbnailUrl} width={300} height={300} />
					<br />
					<hr />
					<br />
					<Button onClick={update}>수정</Button>
					<Button onClick={deletePost}>삭제</Button>
				</div>
			</> : <Load />
		}
	</>;
}
