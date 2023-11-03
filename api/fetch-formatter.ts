import * as process from 'process'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const imageBaseUrl = new URL(String(process.env.NEXT_PUBLIC_IMAGE_BASE_URL));

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export const actions = async (url: string, method: HttpMethod, body: object | null) => {
	try {
		const request: RequestInit = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		}
		if (body) request['body'] = JSON.stringify(body);

		const data = await fetch(`${baseUrl}/${url}`, request);
		const result = await data.json();
		if (result.code !== 200) throw new Error(result);

		return result.data;
	} catch (e) {
		console.error(e);
	}
	return;
}

export const imageActions = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('path', 'BLOG');
	try {
		const data = await fetch(imageBaseUrl, {
			method: 'POST',
			body: formData,
		})
			.catch((e) => {
				console.error(e);
				throw new Error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
			});
		return await data.json();
	} catch (e) {
		console.error(e);
	}
	return;
}
