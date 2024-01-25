'use client'

import styles from '@/styles/app/private/page.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { imageActions } from '@/api/fetch-formatter'
import { ChangeEvent, useEffect, useState } from 'react'
import { CreateSeries, fetchBlogs, fetchCreateSeries, Post } from '@/api/caller'
import { Button, Typography } from '@/components/tailwind/client-components'

export default function Series() {
	const router = useRouter();

	const [title, setTitle] = useState<string>('');
	const onTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

	const [file, setFile] = useState<File | null>(null);
	const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

	const uploadImage = async () => {
		if (!file) return alert('파일 선택하셈');

		const result = await imageActions(file);
		if (result) {
			setThumbnailUrl(result.data);
		}
	}

	const save = async () => {
		if (!title || !thumbnailUrl) return alert('빈칸 채워');

		const request: CreateSeries = {
			title,
			thumbnailUrl,
			blogIds: blogs.map(blog => blog.id),
		}

		await fetchCreateSeries(request)
			.then(() => {
				alert('저장됨');
				router.push('/private/series');
			});
	}

	const [blogs, setBlogs] = useState<Post[]>([]);
	const addBlog = (blog: Post) => setBlogs([...blogs, blog]);
	const deleteBlog = (deleteBlog: Post) => setBlogs(blogs.filter(blog => blog !== deleteBlog));

	const [defaultBlogs, setDefaultBlogs] = useState<Post[]>([]);
	const addDefaultBlog = (blog: Post) => setDefaultBlogs([...defaultBlogs, blog]);
	const deleteDefaultBlog = (deleteBlog: Post) => setDefaultBlogs(defaultBlogs.filter(blog => blog !== deleteBlog));

	const onBlog = (blog: Post) => {
		addDefaultBlog(blog);
		deleteBlog(blog);
	}

	const onDefaultBlog = (blog: Post) => {
		deleteDefaultBlog(blog);
		addBlog(blog);
	}

	useEffect(() => {
		fetchBlogs().then((data) => {
			const blog = blogCheck(data);
			setDefaultBlogs(blog);
		});
	}, [blogs]);

	const blogCheck = (data: Post[]) => {
		const blogIds = blogs.map(blog => blog.id);
		return data.filter(blog => {
			return !blogIds.includes(blog.id)
		});
	}

	return <div className={styles.wrapper}>
		<Typography variant="h1">Create Series</Typography>
		<Typography variant="h5">title</Typography>
		<input type="text" value={title} onChange={onTitle} />
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
		<Typography variant="h5">추가할 블로그</Typography>
		{blogs.map((blog) => {
			return <Button key={blog.id} onClick={() => onBlog(blog)}>{blog.title}</Button>
		})}
		<Typography variant="h5">추가할 블로그 선택하셈</Typography>
		{defaultBlogs.map((blog) => {
			return <Button key={blog.id} onClick={() => onDefaultBlog(blog)}>{blog.title}</Button>
		})}
		<br />
		<hr />
		<br />
		<Button onClick={save}>저장</Button>
	</div>
}
