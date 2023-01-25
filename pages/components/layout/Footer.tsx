import styled from "styled-components";
import {navData} from "../../data/navData";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterBox>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <NavWrap>
              {navData.map(({ mainTitle, link, children }, key) =>(
                <Nav key={key}>
                  <MainTitle>{mainTitle}</MainTitle>
                  <LinkWrap>
                    {children.map(({ title, cLink }, cKey) => (
                      <Link key={key + cKey} href={link + cLink} className="block pb-2 text-sm font-normal text-[#1A237E]/60">
                        {title}
                      </Link>
                    ))}
                  </LinkWrap>
                </Nav>
              ))}
            </NavWrap>
          </div>
        </div>
        <Hr />
        <CopyrightWrap>
          <Link href="/" className="text-dark inline-flex items-center font-semibold no-underline">
            <span className="mr-1">Powered by</span>
            <Logo>Hannah</Logo>
          </Link>
          <CopyrightBox>
            <Copyright>
              Copyright &copy; {year} Hannah Archiving{" "}
              <Link href="/" className="text-inherit transition-all">
                Pages.
              </Link>
            </Copyright>
          </CopyrightBox>
        </CopyrightWrap>
      </div>
    </FooterBox>
  );
}

const NavWrap = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin-bottom: 1.5rem;
`;

const FooterBox = styled.footer`
  --tw-text-opacity: 1;
  color: rgb(26 35 126 / var(--tw-text-opacity));
  padding-bottom: 1.5rem;
  padding-top: 4rem;
  --tw-bg-opacity: 1;
  background-color: rgb(245 245 245 / var(--tw-bg-opacity));
  z-index: 50;
  position: relative;
`;

const MainTitle = styled.span`
  --tw-text-opacity: 1;
  color: rgb(26 35 126 / var(--tw-text-opacity));
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const Nav = styled.div`
  @media (min-width: 1140px) {
    width: 33.333333%;
  }
  @media (min-width: 720px) {
    padding-top: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
  }
  padding-top: 1.5rem;
  width: 50%;
`;

const CopyrightWrap = styled.div`
  @media (min-width: 720px) {
    justify-content: space-between;
  }
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
`;

const CopyrightBox = styled.div`
  @media (min-width: 720px) {
    text-align: right;
    padding-left: 0;
    padding-right: 0;
    width: 33.333333%;
  }
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
`;

const Copyright = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const LinkWrap = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Logo = styled.span`
  font-size: 2rem;
  font-family: 'Sacramento', serif;
`;

const Hr = styled.hr`
  --tw-border-opacity: 1;
  border-color: rgb(224 224 224 / var(--tw-border-opacity));
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
