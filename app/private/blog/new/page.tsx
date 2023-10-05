'use client'

import styles from '@/styles/app/private/page.module.css'
import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Typography } from '@/components/tailwind/client-components'
import { imageActions } from '@/api/fetch-formatter'
import { useRouter } from 'next/navigation'
import { CreatePost, fetchCreateBlog, fetchTags, Tag } from '@/api/caller'
import onImagePasted from '@/components/utils/on-image-pasted'

export default function Blog() {
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

	const [tags, setTags] = useState<Tag[]>([]);
	const addTag = (tag: Tag) => setTags([...tags, tag]);
	const deleteTag = (deleteTag: Tag) => setTags(tags.filter(tag => tag !== deleteTag));

	const [defaultTag, setDefaultTag] = useState<Tag[]>([]);
	const addDefaultTag = (tag: Tag) => setDefaultTag([...defaultTag, tag]);
	const deleteDefaultTag = (deleteTag: Tag) => setDefaultTag(defaultTag.filter(tag => tag !== deleteTag));

	const onTags = (tag: Tag) => {
		addDefaultTag(tag);
		deleteTag(tag);
	}
	const onDefaultTags = (tag: Tag) => {
		deleteDefaultTag(tag);
		addTag(tag);
	}

	useEffect(() => {
		fetchTags().then(setDefaultTag);
	}, []);

	const save = async () => {
		if (!title || !content || !thumbnailUrl || !tags) {
			alert('빈칸 채워');
			return;
		}
		const request: CreatePost = {
			title,
			content,
			thumbnailUrl,
			tagIds: tags.map(tag => tag.id)
		}
		fetchCreateBlog(request)
			.then(() => {
				alert('성공');
				router.push('/private/blog');
			});
	}

	return <div className={styles.wrapper}>
		<Typography variant="h1">Create Blog</Typography>
		<Typography variant="h5">title</Typography>
		<input value={title} onChange={onTitle} />
		<Typography variant="h5">content</Typography>
		<MDEditor
			value={content}
			onChange={setContent}
			onPaste={async (event) => {
				await onImagePasted(event.clipboardData, setContent);
			}}
			onDrop={async (event) => {
				await onImagePasted(event.dataTransfer, setContent);
			}}
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
			width="100%"/>
		<Button onClick={uploadImage}>업로드</Button>
		<Image alt={thumbnailUrl} src={thumbnailUrl} width={300} height={300} />
		<Typography variant="h5">추가할 태그</Typography>
		{tags.map((tag, index) => {
			return <Button key={index} onClick={() => onTags(tag)} value={tag.id}>
				{tag.name}
			</Button>
		})}
		<Typography variant="h5">태그 선택하셈</Typography>
		{defaultTag.map((tag, index) => {
			return <Button key={index} onClick={() => onDefaultTags(tag)} value={tag.id}>
				{tag.name}
			</Button>
		})}
		<br />
		<hr />
		<br />
		<Button onClick={save}>저장</Button>
	</div>
}



