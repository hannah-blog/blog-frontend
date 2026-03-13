import styles from '@/styles/components/post/side.module.css'
import Link from 'next/link'
import { Typography } from '@/components/tailwind/client-components'
import GithubSlugger from 'github-slugger'

type IdxType = {
	idx: number
	line: string
	link: string
}

function renderInlineCode(text: string) {
	const parts = text.split(/(`[^`]+`)/g);
	return parts.map((part, i) => {
		if (part.startsWith('`') && part.endsWith('`')) {
			return <code key={i} className="bg-surface-200 text-primary-700 px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
		}
		return part;
	});
}

export default function IdxBox({ content, id, url }: { content: string, id: number, url: string, }) {
	const result = getIdxList(content);

	return <div className={styles.idxWrapper}>
		{ result.length != 0 && <>
      <Typography variant="h6" color="gray">목차</Typography>
			{ result.map((item, idx) => {
				return <Typography key={idx} color="gray" className={`${styles[`idxTap${item.idx}`]} ${styles.idx}`}>
					<Link href={`/${url}/${id}/#${item.link}`}>
						{renderInlineCode(item.line)}
					</Link>
				</Typography>;
			})}
    </> }
	</div>;
}

const getIdxList = (content: string): IdxType[] => {
	const slugger = new GithubSlugger();
	const result: IdxType[] = [];
	const contentByLine: string[] = getPlainContent(content);
	contentByLine.map((line) => {
		const first = firstMatch(line);
		const second = secondMatch(line);
		const third = thirdMatch(line);

		if (first) {
			const text = first[0].replace(/^# /, '');
			result.push({ idx: 1, line: text, link: slugger.slug(text) });
		} else if (second) {
			const text = second[0].replace(/^## /, '');
			result.push({ idx: 2, line: text, link: slugger.slug(text) });
		} else if (third) {
			const text = third[0].replace(/^### /, '');
			result.push({ idx: 3, line: text, link: slugger.slug(text) });
		}
	});
	return result;
}

const getPlainContent = (content: string): string[] => {
	return content
		.replace(/^> (.*$)/gim, '')
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
