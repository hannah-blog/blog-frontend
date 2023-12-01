export const pad = (n: number) => { return n < 10 ? '0' + n : n }

export const dateKoFormat = (date: string) => {
	const dateObject = new Date(date);
	return `${dateObject.getFullYear()}년 ${dateObject.getMonth() + 1}월 ${dateObject.getDate()}일`
}

export const dateFormat = (date: string) => {
	const dateObject = new Date(date);
	const month = dateObject.getMonth() + 1;
	const day = dateObject.getDate();
	return `${dateObject.getFullYear()}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`
}

export const timeFormat = (date: string) => {
	const dateObject = new Date(date);
	return `${pad(dateObject.getHours())}:${pad(dateObject.getMinutes())}`
}
