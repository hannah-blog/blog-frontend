import "@uiw/react-markdown-preview/markdown.css";

import { getPostById, Post } from "../../../data/postData";
import { PostWrap, TitleText } from "../../../components/styles/styleCompnents";
import dynamic from "next/dynamic";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import { Typography } from "@material-tailwind/react";
import styled from "styled-components";
import HeadMeta from "../../../utils/headMeta";
import { GetServerSideProps } from "next";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(() => import("@uiw/react-markdown-preview"), {ssr: false});

interface Props {
  item: Post
}

export default function DetailPost({item}: Props) {

  return <>
    <HeadMeta
      title={item.title}
      description={item.content.substring(0, 100)}
      image={item.thumbnailUrl}
      url={"/develop/blog/" + item.id}
      tags={item.tags.map(tag => tag.name)}
    />
    <TitleText>{item.title}</TitleText>
    <DateWrap>
      <Typography>Created Date {item.createdDate}</Typography>
    </DateWrap>
    <ThumbnailBox src={item.thumbnailUrl} alt={`${item.id}-thumbnail-image`}/>
    <PostWrap>
      <MarkdownPreview source={item.content}/>
    </PostWrap>
  </>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);

  const data = await getPostById(id);

  console.log(data);

  return {
    props: {
      item: data,
    },
  };
}

const DateWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
`;

const ThumbnailBox = styled.img`
  border-radius: 0.5rem;
  width: 50%;
  margin-top: 1rem;
`
