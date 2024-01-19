import styles from '@/styles/components/post/side.module.css'
import Link from 'next/link'
import { Typography } from '@/components/tailwind/client-components'

type IdxType = {
	idx: number
	line: string
	link: string
}

export default function IdxBox({ content, id }: { content: string, id: number }) {
	const result: IdxType[] = [];

	const contentByLine = content.split('\n');
	contentByLine.map((line) => {
		const first = line.match(/^# (.*$)/gim);
		const second = line.match(/^## (.*$)/gim);
		const third = line.match(/^### (.*$)/gim);

		if (first) {
			result.push({
				idx: 1,
				line: first[0].slice(2),
				link: first[0].replace(/#/g, '').replace(/^ /g, '#').replace(/ /g, '-').replace(/\?/g, '').replace(/\./g, '').toLowerCase()
			});
		} else if (second) {
			result.push({
				idx: 2,
				line: second[0].slice(3),
				link: second[0].replace(/#/g, '').replace(/^ /g, '#').replace(/ /g, '-').replace(/\?/g, '').replace(/\./g, '').toLowerCase()
			});
		} else if (third) {
			result.push({
				idx: 3,
				line: third[0].slice(4),
				link: third[0].replace(/#/g, '').replace(/^ /g, '#').replace(/ /g, '-').replace(/\?/g, '').replace(/\./g, '').toLowerCase()
			});
		}
	});

	return <div className={styles.idxWrapper}>
		<Typography variant="h6" color="gray">목차</Typography>
		{result.map((item, idx) => {
			return <Typography key={idx} color="gray" className={`ml-${item.idx * 2}`}>
				<Link href={`https://www.hannah-log.site/develop/blog/${id}/${item.link}`}>{item.line}</Link>
			</Typography>;
		})}
	</div>;
}
