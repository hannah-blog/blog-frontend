'use client'

import styled from 'styled-components';

export const PostWrap = styled.div`
  margin-top: 3rem;
  width: 70%;
  // 기본 ul, ol, li 스타일 설정
  ul, ol {
    display: block;
    list-style: disc outside none;
    margin: 1em 0 5px 20px;
    padding: 0;
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
  ul ul ul, ul ol ul, ol ul ul, ol ol ul {
    list-style-type: square;
    margin-left: 30px;
  }
  ol ol ol, ol ul ol, ul ol ol, ul ul ol {
    list-style-type: lower-roman;
    margin-left: 30px;
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
