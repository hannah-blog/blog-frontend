'use client'

import { fetchDeleteTag } from '@/api/caller'
import { Button } from '@/components/tailwind/client-components'

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
