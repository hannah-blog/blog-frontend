import styles from '@/styles/components/post/side.module.css'
import Link from 'next/link'
import { Typography } from '@/components/tailwind/client-components'

type IdxType = {
	idx: number
	line: string
	link: string
}

export default function IdxBox({ content, id }: { content: string, id: number }) {
	const result = getIdxList(content);

	return <div className={styles.idxWrapper}>
		{ result.length != 0 && <>
      <Typography variant="h6" color="gray">목차</Typography>
			{ result.map((item, idx) => {
				return <Typography key={idx} color="gray" className={`${styles[`idxTap${item.idx}`]} ${styles.idx}`}>
					<Link href={`${process.env.NEXT_PUBLIC_WWW_URL}/develop/blogs/${id}/${item.link}`}>
						{item.line}
					</Link>
				</Typography>;
			})}
    </> }
	</div>;
}

const getIdxList = (content: string): IdxType[] => {
	const result: IdxType[] = [];
	const contentByLine: string[] = getPlainContent(content);
	contentByLine.map((line) => {
		const first = firstMatch(line);
		const second = secondMatch(line);
		const third = thirdMatch(line);

		if (first) {
			const insert: IdxType = getIdx(1, first[0]);
			result.push(insert);
		} else if (second) {
			const insert: IdxType = getIdx(2, second[0]);
			result.push(insert);
		} else if (third) {
			const insert: IdxType = getIdx(3, third[0]);
			result.push(insert);
		}
	});
	return result;
}

const getPlainContent = (content: string): string[] => {
	return content
		.replace(/^> (.*$)/gim, '')
		.replace(/\*\*(.*)\*\*/gim, '')
		.replace(/\*(.*)\*/gim, '')
		.replace(/!\[(.*?)]\((.*?)\)/gim, '')
		.replace(/\[(.*?)]\((.*?)\)/gim, '')
		.replace(/^([A-Za-z \t]*)```([A-Za-z]*)?\n([\s\S]*?)```([A-Za-z \t]*)*$/gm, '')
		.split('\n');
}

const firstMatch = (str: string) => {
	return str.match(/^# (.*$)/gim);
}

const secondMatch = (str: string) => {
	return str.match(/^## (.*$)/gim);
}

const thirdMatch = (str: string) => {
	return str.match(/^### (.*$)/gim);
}

const getIdx = (idx: number, str: string): IdxType => {
	const hash = getHash(idx);
	return {
		idx: idx,
		line: str.slice(idx + 1),
		link: formatLink(str, hash)
	}
}

const getHash = (idx: number): string => {
	let hash = '';
	for (let i = 0; i < idx; i++) {
		hash += '#'
	}
	return hash
}

const formatLink = (str: string, hash: string): string => {
	return str
		.replace(hash, '')
		.replace(/\(/g, ' ')
		.replace(/\)/g, ' ')
		.replace(/^ /g, '#')
		.replace(/ /g, '-')
		.replace(/\?/g, '')
		.replace(/\./g, '')
		.replace(/--/g, '-')
		.replace(/-$/g, '')
		.toLowerCase()
}
