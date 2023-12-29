'use client'

import styles from '@/styles/components/modal/portfolio-modal.module.css'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { fetchPortfolio } from '@/api/caller'
import Markdown from '@/components/utils/markdown'

export default function PortfolioModal({
	isOpen, handleOpen, portfolioId
}: {
	isOpen: boolean, handleOpen: () => void, portfolioId: number
}) {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');

	useEffect(() => {
		fetchPortfolio(portfolioId).then((portfolio) => {
			setTitle(portfolio.title);
			setContent(portfolio.content);
		});
	}, [portfolioId]);

	return <>
		<Dialog
			open={isOpen}
			size="lg"
			handler={handleOpen}
			animate={{
				mount: { scale: 1, y: 0 },
				unmount: { scale: 0.9, y: -100 },
			}}
		>
			<DialogHeader>{title}</DialogHeader>
			<DialogBody className={`${styles.postWrapper} h-[40rem] overflow-scroll`}>
				<Markdown content={content} />
			</DialogBody>
			<DialogFooter>
				<Button variant="text" color="red" onClick={handleOpen} className="mr-1">
					<span>Close</span>
				</Button>
			</DialogFooter>
		</Dialog>
	</>;
}
