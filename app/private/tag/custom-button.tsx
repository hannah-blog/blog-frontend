'use client'

import { fetchDeleteTag } from '@/api/caller'
import { Button } from '@material-tailwind/react'

export function OnClickButton({ tagId }: { tagId: number }) {
	const tagDelete = async (id: number) => {
		console.log(id)
		fetchDeleteTag(id)
			.then(() => {
				alert('성공');
			});
	}

	return <Button size="sm" onClick={() => tagDelete(tagId)}>Delete</Button>;
}
