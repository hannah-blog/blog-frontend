import { actions, HttpMethod } from './fetch-formatter'

enum RequestUrl {
	BLOG = 'blogs',
	TAG = 'tags',
	PORTFOLIO = 'portfolios',
	SERIES = 'series',
}

export type Tag = {
	id: number,
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

export type CreatePost = {
	title: string,
	content: string,
	thumbnailUrl: string,
	tagIds: number[],
}

export type Portfolio = {
	id: number,
	title: string,
	content: string,
	thumbnailUrl: string,
	createdDate: string,
	modifiedDate: string,
}

export type CreatePortfolio = {
	title: string,
	content: string,
	thumbnailUrl: string,
}

export type Series = {
	id: number,
	title: string,
	thumbnailUrl: string,
	createdDate: string,
	blogs: Post[],
}

export type CreateSeries = {
	title: string,
	thumbnailUrl: string,
	blogIds: number[],
}

export const fetchBlogs = async (): Promise<Post[]> => {
	return actions(RequestUrl.BLOG, HttpMethod.GET, null);
}

export const fetchBlogsBySeries = async (id: number): Promise<Series> => {
	return await actions(`${RequestUrl.SERIES}/${id}`, HttpMethod.GET, null);
}

export const fetchBlog = async (id: number): Promise<Post> => {
	return actions(`${RequestUrl.BLOG}/${id}`, HttpMethod.GET, null);
}

export const fetchCreateBlog = async (request: CreatePost): Promise<Post> => {
	return actions(RequestUrl.BLOG, HttpMethod.POST, request);
}

export const fetchUpdateBlog = async (id: number, request: CreatePost): Promise<Post> => {
	return actions(`${RequestUrl.BLOG}/${id}`, HttpMethod.PATCH, request);
}

export const fetchDeleteBlog = async (id: number) => {
	return actions(`${RequestUrl.BLOG}/${id}`, HttpMethod.DELETE,  null);
}

export const fetchTags = async (): Promise<Tag[]> => {
	return actions(RequestUrl.TAG, HttpMethod.GET, null);
}

export const fetchCreateTag = async (name: string): Promise<Tag> => {
	return actions(RequestUrl.TAG, HttpMethod.POST, { name });
}

export const fetchDeleteTag = async (id: number) => {
	return actions(`${RequestUrl.TAG}/${id}`, HttpMethod.DELETE,  null);
}

export const fetchPortfolios = async (): Promise<Portfolio[]> => {
	return actions(RequestUrl.PORTFOLIO, HttpMethod.GET, null);
}

export const fetchPortfolio = async (id: number): Promise<Portfolio> => {
	return actions(`${RequestUrl.PORTFOLIO}/${id}`, HttpMethod.GET, null);
}

export const fetchCreatePortfolio = async (request: CreatePortfolio): Promise<Portfolio> => {
	return actions(RequestUrl.PORTFOLIO, HttpMethod.POST, request);
}

export const fetchUpdatePortfolio = async (id: number, request: CreatePortfolio): Promise<Portfolio> => {
	return actions(`${RequestUrl.PORTFOLIO}/${id}`, HttpMethod.PATCH, request);
}

export const fetchDeletePortfolio = async (id: number) => {
	return actions(`${RequestUrl.PORTFOLIO}/${id}`, HttpMethod.DELETE,  null);
}

export const fetchSeries = async (): Promise<Series[]> => {
	return actions(RequestUrl.SERIES, HttpMethod.GET, null);
}

export const fetchCreateSeries = async (request: CreateSeries): Promise<Series> => {
	return actions(RequestUrl.SERIES, HttpMethod.POST, request);
}

export const fetchUpdateSeries = async (id: number, request: CreateSeries): Promise<Series> => {
	return actions(`${RequestUrl.SERIES}/${id}`, HttpMethod.PATCH, request);
}

export const fetchDeleteSeries = async (id: number) => {
	return actions(`${RequestUrl.SERIES}/${id}`, HttpMethod.DELETE,  null);
}
