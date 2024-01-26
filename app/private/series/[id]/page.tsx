'use client'

import styles from '@/styles/app/private/page.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { imageActions } from '@/api/fetch-formatter'
import {
	fetchBlogs,
	fetchDeleteSeries,
	fetchSeriesById,
	fetchUpdateSeries,
	Post,
	Series
} from '@/api/caller'
import { Button, Typography } from '@/components/tailwind/client-components'
import Image from 'next/image'


export default function SeriesDetail({
	params: { id },
}: {
	params: { id: number }
}) {
	const router = useRouter();

	const [series, setSeries] = useState<Series | null>(null);
	const [file, setFile] = useState<File | null>(null);

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

	const blogCheck = (data: Post[]) => {
		const blogIds = blogs.map(blog => blog.id);
		return data.filter(blog => {
			return !blogIds.includes(blog.id)
		});
	}

	const uploadImage = async () => {
		if (!file) return alert('파일 선택하셈');

		const result = await imageActions(file);
		if (result) {
			series.thumbnailUrl = result.data;
		}
	}

	const update = () => {
		if (!series) return alert('안 돼. 돌아가.');

		const request = {
			title: String(series.title),
			thumbnailUrl: String(series.thumbnailUrl),
			blogIds: blogs.map(blog => blog.id),
		}

		fetchUpdateSeries(series.id, request)
			.then(() => {
				alert('와안료');
				router.push('/private/series');
			});
	}

	const deleteSeries = () => {
		if (!series) return alert('안 돼. 돌아가.');

		fetchDeleteSeries(series.id)
			.then(() => {
				alert('삭제함');
				router.push('/private/series');
			});
	}

	useEffect(() => {
		fetchSeriesById(id).then((data) => {
			setSeries(data);
			setBlogs(data.blogs);
		});
	}, []);

	useEffect(() => {
		fetchBlogs().then((data) => {
			const blogs = blogCheck(data);
			setDefaultBlogs(blogs);
		});
	}, [blogs]);

	return <>
		{ series && <div className={styles.wrapper}>
			<Typography variant="h1">Update Series</Typography>
			<Typography variant="h5">title</Typography>
			<input
				value={series.title}
				onChange={(e) => setSeries({ ...series, title: e.target.value })}
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
			<Image alt={series.thumbnailUrl} src={series.thumbnailUrl} width={300} height={300} />
			<Typography variant="h5">추가할 블로그</Typography>
			{ blogs.map((blog, idx) => {
				return <Button key={idx} onClick={() => onBlog(blog)} value={blog.id}>
					{blog.title}
				</Button>;
			})}
			<Typography variant="h5">추가할 블로그 선택하셈</Typography>
			{ defaultBlogs.map((blog, idx) => {
				return <Button key={idx} onClick={() => onDefaultBlog(blog)} value={blog.id}>
					{blog.title}
				</Button>;
			})}
			<br />
			<hr />
			<br />
			<Button onClick={update}>수정</Button>
			<Button onClick={deleteSeries}>삭제</Button>
		</div> }
	</>;
}
