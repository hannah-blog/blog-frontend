import "@uiw/react-markdown-preview/markdown.css";

import { useRouter } from "next/router";
import { getPostById } from "../../../data/postData";
import { PostWrap, TitleText } from "../../../components/styles/styleCompnents";
import dynamic from "next/dynamic";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import {Typography} from "@material-tailwind/react";
import styled from "styled-components";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function DetailPost() {
  const { query } = useRouter()
  const showData = getPostById(Number(query.id));

  return <>
    <TitleText>{showData.title}</TitleText>
    <DateWrap>
      <Typography>Created Date {showData.createdDate}</Typography>
    </DateWrap>
    <ThumbnailBox src={showData.thumbnailUrl} alt={`${showData.id}-thumbnail-image`} />
    <PostWrap>
      <MarkdownPreview source={showData.content}/>
    </PostWrap>
  </>
}

const DateWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;

const ThumbnailBox = styled.img`
  border-radius: 0.5rem;
  width: 50%;
  margin-top: 1rem;
`
