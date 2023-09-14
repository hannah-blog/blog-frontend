import { actions, HttpMethod } from './fetch-formatter'

enum RequestUrl {
	BLOG = 'blog',
}

export type Tag = {
	name: string,
};

export type Post = {
	id: number,
	title: string,
	content: string,
	thumbnailUrl: string,
	tags: Tag[],
	createdDate: string,
};

export const fetchBlogs = async (): Promise<Post[]> => {
	return actions(RequestUrl.BLOG, HttpMethod.GET, null);
}

export const fetchBlog = async (id: number): Promise<Post> => {
	return actions(`${RequestUrl.BLOG}/${id}`, HttpMethod.GET, null);
}
