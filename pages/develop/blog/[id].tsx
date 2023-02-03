import "@uiw/react-markdown-preview/markdown.css";

import { useRouter } from "next/router";
import { getPostById } from "../../../data/postData";
import { PostWrap, TitleText } from "../../../components/styles/styleCompnents";
import dynamic from "next/dynamic";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function DetailPost() {
  const { query } = useRouter()
  const showData = getPostById(Number(query.id));

  return <>
    <TitleText>{showData.title}</TitleText>
    <div>{showData.createdDate}</div>
    <img src={showData.thumbnailUrl} alt={"test"}/>
    <PostWrap>
      <MarkdownPreview source={showData.content}/>
    </PostWrap>
  </>
}
