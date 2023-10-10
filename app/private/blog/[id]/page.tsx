'use client'

import styles from '@/styles/app/private/page.module.css'
import MDEditor from '@uiw/react-md-editor'
import { Button, Typography } from '@/components/tailwind/client-components'
import { fetchBlog, fetchDeleteBlog, fetchTags, fetchUpdateBlog, Post, Tag } from '@/api/caller'
import { useEffect, useState } from 'react'
import { imageActions } from '@/api/fetch-formatter'
import { useRouter } from 'next/navigation'
import onImagePasted from '@/components/utils/on-image-pasted'
import Image from 'next/image'
import Load from '@/components/utils/load'

export default function BlogDetail({
	 params: { id },
 }: {
	params: { id: number }
}) {
	const router = useRouter();

	const [post, setPost] = useState<Post | null>(null);
	const [content, setContent] = useState<string>();
	const [file, setFile] = useState<File | null>(null);

	const [tags, setTags] = useState<Tag[]>([]);
	const addTag = (tag: Tag) => setTags([...tags, tag]);
	const deleteTag = (deleteTag: Tag) => setTags(tags.filter(tag => tag !== deleteTag));

	const [defaultTags, setDefaultTags] = useState<Tag[]>([]);
	const addDefaultTags = (tag: Tag) => setDefaultTags([...defaultTags, tag]);
	const deleteDefaultTags = (deleteTag: Tag) => setDefaultTags(defaultTags.filter(tag => tag !== deleteTag));

	useEffect(() => {
		fetchBlog(id).then((data) => {
			setPost(data);
			setTags(data.tags);
			setContent(data.content);
		}).then(() => {
			fetchTags().then(setDefaultTags)
		});
	}, []);

	useEffect(() => {
		defaultTags.map(tag => {
			tags.map(t => {
				if (tag.id === t.id) {
					setDefaultTags(defaultTags.filter(tag => tag.id !== t.id));
				}
			});
		});
	}, [!defaultTags.length]);

	const uploadImage = async () => {
		if (!file) {
			alert('파일 선택하셈');
			return;
		}
		const result = await imageActions(file);
		if (result && post) {
			post.thumbnailUrl = result.data;
		}
	}

	const onTags = (tag: Tag) => {
		addDefaultTags(tag);
		deleteTag(tag)
	}

	const onDefaultTags = (tag: Tag) => {
		deleteDefaultTags(tag);
		addTag(tag)
	}

	const update = () => {
		if (!post) return alert('안 돼. 돌아가.');
		const request = {
			title: String(post.title),
			content: String(content),
			thumbnailUrl: String(post.thumbnailUrl),
			tagIds: tags.map(tag => tag.id)
		}
		fetchUpdateBlog(post.id, request)
			.then(() => {
				alert('와안료');
				router.push('/private/blog');
			})
	}

	const deletePost = () => {
		if (!post) return alert('안 돼. 돌아가.');
		fetchDeleteBlog(post.id)
			.then(() => {
				alert('삭제함');
				router.push('/private/blog');
			});
	}

	return <>
		{ post ?
			<>
				<div className={styles.wrapper}>
					<Typography variant="h1">Update Blog</Typography>
					<Typography variant="h5">title</Typography>
					<input value={post.title} onChange={(e) => post.title = e.target.value} />
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
					<Image alt={post.thumbnailUrl} src={post.thumbnailUrl} width={300} height={300} />
					<Typography variant="h5">추가할 태그</Typography>
					{tags.map((tag, index) => {
						return <Button key={index} onClick={() => onTags(tag)} value={tag.id}>
							{tag.name}
						</Button>
					})}
					<Typography variant="h5">태그 선택하셈</Typography>
					{defaultTags.map((tag, index) => {
						return <Button key={index} onClick={() => onDefaultTags(tag)} value={tag.id}>
							{tag.name}
						</Button>
					})}
					<br />
					<hr />
					<br />
					<Button onClick={update}>수정</Button>
					<Button onClick={deletePost}>삭제</Button>
				</div>
			</>	: <Load />
		}
	</>;
}
