'use client'

import { CardBody, CardFooter, CardHeader, Chip, Typography } from '@material-tailwind/react';
import { Post as PostType } from '../../data/postData';
import Link from 'next/link';
import styled from 'styled-components';

interface PostProps {
  post: PostType;
  idx?: number;
}

export default function Post(props: PostProps) {
  const showPostData = props.post;
  return (
    <Link href={`/develop/blog/${showPostData.id}`}>
      <Card>
        <CardHeader color="indigo" className="relative h-56">
          <img
            src={showPostData.thumbnailUrl}
            alt={`thumbnail-url`}
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody className="text-center">
          {showPostData.title}
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">
            <TagWrap>
              {showPostData.tags.map((tag, idx) => {
                return <Chip className="mr-1" color="indigo" value={`#${tag.name}`} key={idx}/>
              })}
            </TagWrap>
          </Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            {showPostData.createdDate}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
}

const Card = styled.div`
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  --tw-text-opacity: 1;
  color: rgb(97 97 97 / var(--tw-text-opacity));
  background-clip: border-box;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  border-radius: 0.75rem;
  flex-direction: column;
  width: 24rem;
  display: flex;
  margin-top: 1rem;
  margin-bottom: 3rem;
  position: relative;

  transition: transform .2s;
  :hover {
    transform: scale(1.05);
  }
`;

const TagWrap = styled.div`
  display: flex;
`;
