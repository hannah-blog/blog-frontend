import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="developer archiving"
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <ScrollableBlogPosts posts={posts} />
          <Testimonials />
          <FeaturesGallery />
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 10rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
