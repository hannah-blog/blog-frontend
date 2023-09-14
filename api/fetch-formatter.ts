
const baseUrl = process.env.BASE_URL

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export const actions = async (url: string, method: HttpMethod, body: Object | null) => {
	try {
		const request = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
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
