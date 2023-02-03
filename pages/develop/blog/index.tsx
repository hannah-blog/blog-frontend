import Post from "../../../components/post/Post";
import { postData } from "../../../data/postData";
import styled from "styled-components";
import { TitleText } from "../../../components/styles/styleCompnents";

export default function Blog() {
  return <div className={"w-full"}>
      <TitleText>Develop Blog Page</TitleText>
      <BlogListBox>
        { postData.map((post, idx) => {
          return <Post key={idx} post={post} idx={idx} />;
        })}
      </BlogListBox>
    </div>;
}

const BlogListBox = styled.div`
  display: flex;
  -webkit-flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
