export const pad = (n: number) => { return n < 10 ? '0' + n : n }

export const dateKoFormat = (date: string) => {
	const dateObject = new Date(date);
	return `${dateObject.getFullYear()}년 ${dateObject.getMonth() + 1}월 ${dateObject.getDate()}일`
}

export const dateFormat = (date: string) => {
	const dateObject = new Date(date);
	return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
}

export const timeFormat = (date: string) => {
	const dateObject = new Date(date);
	return `${pad(dateObject.getHours())}:${pad(dateObject.getMinutes())}`
}
