'use client';
import { apiService } from '../../utils/api/api.service';
import { createElement, useEffect, useRef, useState } from 'react';
import { responseMainBanner } from '@/utils/api/api.dto';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styled from '@emotion/styled';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Wrapper = styled.div``;
const BannerItemWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`;

export function MainBanner(): React.ReactNode {
  const [bannerArray, setBannerArray] = useState<responseMainBanner>([]);

  const getMainBanner = async () => {
    const bannerData = await apiService.getMainBanner();
    setBannerArray(bannerData);
  };

  useEffect(() => {
    getMainBanner();
  }, []);

  return (
    <Wrapper>
      <Carousel
        showArrows={false}
        transitionTime={10}
        autoPlay={true}
        infiniteLoop={true}
      >
        {bannerArray.map((banner, index) => (
          <BannerItemWrapper key={index}>
            <Image src={banner.imgSrc} alt={banner.alt} layout="fill" />
          </BannerItemWrapper>
        ))}
      </Carousel>
    </Wrapper>
  );
}
