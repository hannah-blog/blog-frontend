import Post from "../../../components/post/Post";
import { postData } from "../../../data/postData";
import styled from "styled-components";
import { TitleText } from "../../../components/styles/styleCompnents";
import { useState } from "react";
import Pagination from "../../../utils/pagination";
import HeadMeta from "../../../utils/headMeta";

export default function Blog() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 9;

  return <div className={"w-full"}>
    <HeadMeta />
    <TitleText>Develop Blog Page</TitleText>
    <BlogListBox>
      { postData.slice(offset, offset + 9).map((post, idx) => {
        return <Post key={idx} post={post} idx={idx} />;
      })}
    </BlogListBox>
    <Pagination total={postData.length} limit={9} page={page} setPage={setPage} />
  </div>;
}

const BlogListBox = styled.div`
  display: flex;
  -webkit-flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
