import styled from "styled-components";

export default function Logo() {
  return (
    <ProfileImg>
      <img alt="Hannah github profile image" src="https://avatars.githubusercontent.com/u/57277976?v=4" />
      <h1>Hannah Blog</h1>
    </ProfileImg>
  );
}

const ProfileImg = styled.div`
  display: flex;
  h1 {
    margin-left: 1rem;
    font-size: 3.8rem;
    font-family: 'Explora', serif;
  }
  
  img {
    width: 55px;
    height: 55px;
    border-radius: 0.8rem;
  }
`;
