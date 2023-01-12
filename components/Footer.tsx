import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import NextLink from 'next/link';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

type SingleFooterListItem = { title: string; href: string };
type FooterListItems = SingleFooterListItem[];
type SingleFooterList = { title: string; items: FooterListItems };
type FooterItems = SingleFooterList[];

const footerItems: FooterItems = [
  {
    title: 'How is Hannah?',
    items: [
      { title: 'Resume', href: '/privacy-policy' },
      { title: 'Cover Letter', href: '/cookies-policy' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Develop Archiving',
    items: [
      { title: 'Blog', href: '/blog' },
      { title: 'Series', href: '/series' },
      { title: 'Guest Book', href: '/help-center' },
    ],
  },
  {
    title: 'Daily Archiving',
    items: [
      { title: 'Trip', href: '/contact' },
      { title: 'Popular Restaurant', href: '/faq' },
    ],
  },
];

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <ListContainer>
          {footerItems.map((singleItem) => (
            <FooterList key={singleItem.title} {...singleItem} />
          ))}
        </ListContainer>
        <BottomBar>
          <ShareBar>
            <NextLink href="https://github.com/HongChaeMin" passHref>
              <a>
                <GitHubIcon fontSize="large" color="primary" />
              </a>
            </NextLink>

            <NextLink href="coals0329@cowave.kr" passHref>
              <a>
                <EmailIcon fontSize="large" color="primary" />
              </a>
            </NextLink>

            <NextLink href="https://www.linkedin.com/in/hannah-linkdin" passHref>
              <a>
                <LinkedInIcon fontSize="large" color="primary" />
              </a>
            </NextLink>
          </ShareBar>
          <Copyright>&copy; Copyright 2023 Hannah Archiving Pages</Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function FooterList({ title, items }: SingleFooterList) {
  return (
    <ListWrapper>
      <ListHeader>{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

function ListItem({ title, href }: SingleFooterListItem) {
  return (
    <ListItemWrapper>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </ListItemWrapper>
  );
}

const FooterWrapper = styled.div`
  padding-top: 10rem;
  padding-bottom: 4rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListHeader = styled.p`
  font-weight: bold;
  font-size: 2.25rem;
  margin-bottom: 2.5rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  margin-right: 5rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${media('<=tablet')} {
    flex: 0 40%;
    margin-right: 1.5rem;
  }

  ${media('<=phone')} {
    flex: 0 100%;
    margin-right: 0rem;
  }
`;

const ListItemWrapper = styled.p`
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: rgba(var(--textSecondary), 0.75);
  }
`;

const ShareBar = styled.div`
  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const BottomBar = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
