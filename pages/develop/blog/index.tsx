import Post from "../../../components/post/Post";
import { getPosts, postData, PostList } from "../../../data/postData";
import styled from "styled-components";
import { TitleText } from "../../../components/styles/styleCompnents";
import { useState } from "react";
import Pagination from "../../../utils/pagination";
import HeadMeta from "../../../utils/headMeta";
import { GetStaticProps } from "next";

interface Props {
  list: PostList
}

export default function Blog({list}: Props) {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 9;

  return <div className={"w-full"}>
    <HeadMeta title="Develop Blog" description="Hannah Develop Blog"/>
    <TitleText>Develop Blog Page</TitleText>
    <BlogListBox>
      { list.slice(offset, offset + 9).map((post, idx) => {
        return <Post key={idx} post={post} idx={idx} />;
      })}
    </BlogListBox>
    <Pagination total={postData.length} limit={9} page={page} setPage={setPage} />
  </div>;
}

export const getStaticProps: GetStaticProps = async () => {
  const data = getPosts();

  console.log(data[1]);

  return {
    props: {
      list: data,
    },
  };
}

const BlogListBox = styled.div`
  display: flex;
  -webkit-flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
