'use client'

import styles from '@/styles/app/private/page.module.css'
import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import { Button, Input, Typography } from '@/components/tailwind/client-components'
import { useEffect, useState } from 'react'
import { imageActions } from '@/api/fetch-formatter'
import { CreatePost, fetchCreateBlog, fetchTags, Tag } from '@/api/caller'
import onImagePasted from '@/components/utils/on-image-pasted'

export default function Blog() {

	const [title, setTitle] = useState('');
	const onTitle = ({ target }) => setTitle(target.value);

	const [content, setContent] = useState('');

	const [thumbnailUrl, setThumbnailUrl] = useState('');
	const uploadImage = async ({ target }) => {
		const file = target.files[0];
		const result = await imageActions(file);
		if (result) {
			setThumbnailUrl(result.data);
		}
	}

	const [tags, setTags] = useState<Tag[]>([]);
	const addTag = (tag) => setTags([...tags, tag]);
	const deleteTag = (deleteTag) => setTags(tags.filter(tag => tag !== deleteTag));

	const [defaultTag, setDefaultTag] = useState<Tag[]>([]);
	const addDefaultTag = (tag) => setDefaultTag([...defaultTag, tag]);
	const deleteDefaultTag = (deleteTag) => setDefaultTag(defaultTag.filter(tag => tag !== deleteTag));

	const onTags = (tag) => {
		addDefaultTag(tag);
		deleteTag(tag);
	}
	const onDefaultTags = (tag) => {
		deleteDefaultTag(tag);
		addTag(tag);
	}

	useEffect(() => {
		const fetchDataTags = async () => {
			const fetchTagsData = await fetchTags();
			setDefaultTag(fetchTagsData);
		};
		fetchDataTags();
	}, []);

	const save = async () => {
		const request: CreatePost = {
			title,
			content,
			thumbnailUrl,
			tagIds: tags.map(tag => tag.id)
		}
		const result = await fetchCreateBlog(request);
	}

	return <div className={styles.wrapper}>
		<Typography variant="h1">Create Blog</Typography>
		<Input value={title} onChange={onTitle} label="Title" />
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
		<Input type="file" onInput={uploadImage} label="썸네일 이미지" placeholder="썸네일 이미지 업로드" width="100%" />
		<Image src={thumbnailUrl} width={300} height={300} />
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



