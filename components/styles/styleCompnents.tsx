import styled from "styled-components";

export const MainWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  width: 100%;
  color: rgb(26 35 126);
  margin-top: 7%;
`;

export const TextWrap = styled.div`
  width: 43%;
`;

export const PostWrap = styled.div`
  margin-top: 3rem;
  width: 70%;
  // 기본 ul, ol, li 스타일 설정
  ul, ol {
    display: block;
    list-style: disc outside none;
    margin: 1em 0;
    padding: 0 0 0 40px;
  }
  ol {
    list-style-type: decimal;
  }
  li {
    display: list-item;
  }
  ul ul, ol ul {
    list-style-type: circle;
    margin-left: 15px;
  }
  ol ol, ul ol {
    list-style-type: lower-latin;
    margin-left: 15px;
  }
`;

export const TitleText = styled.div`
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0;
  line-height: 1.25;
  font-weight: 600;
  font-size: 3rem;
  font-family: Roboto, sans-serif;
  display: block;
  margin: 2rem;
  color: rgb(26 35 126);
`;
