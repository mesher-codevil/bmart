'use client';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Header } from '@common/Header';
import Arrow from '@assets/arrow.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { SidebarOpenContext, SearchOpenContext } from '../store/GlobalState';
import { MainBanner } from '@/components/home/MainBanner';
import { CategoriesLinks } from '@/components/home/CategoriesLinks';
import { RecommendMenu } from '@/components/home/RecommendMenu';
import { MD } from '@/components/home/MD';
import { HotDeal } from '@/components/home/HotDeal';
import { PromotionBanner } from '@/components/home/PromotionBanner';
import Spinner from '@/components/common/svg/Spinner';

const HOME = {
  HEADER_TITLE: 'B마트',
};
const Main = styled.div`
  &>: nth-child(2) {
    padding-top: 50px;
  }
`;
export default function Home(): React.ReactNode {
  const [, setIsSearchOpen] = useContext(SearchOpenContext);
  const [, setIsSidebarOpen] = useContext(SidebarOpenContext);

  const [isPullMeUp, setIsPullMeUp] = useState<boolean>(false);

  const onDragEndHandler = (event: React.MouseEvent) => {
    if (event.pageY < 0) return;
    setIsPullMeUp(true);
  };
  const onTouchEndHandler = (event: any) => {
    if (event.view?.scrollY !== 0) return;
    setIsPullMeUp(true);
  };
  const openSearch = () => setIsSearchOpen(true);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <Main>
      <Header>
        <Image src={Arrow} alt="back to page" />
        {HOME.HEADER_TITLE}
        <div>
          <Image src={Arrow} alt="back to page" onClick={openSearch} />
          <Image src={Arrow} alt="back to page" onClick={openSidebar} />
        </div>
      </Header>
      {isPullMeUp && (
        <Spinner onAnimationIteration={() => setIsPullMeUp(false)} />
      )}
      <div
        draggable
        onDragEnd={onDragEndHandler}
        onTouchEnd={onTouchEndHandler}
      >
        땅겨요!
        <br></br>
        <br></br>
      </div>
      <MainBanner />
      <HotDeal />
      <CategoriesLinks />
      <RecommendMenu />
      <PromotionBanner />
      <MD />
    </Main>
  );
}
