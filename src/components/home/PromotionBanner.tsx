'use client';
import { apiService } from '../../utils/api/api.service';
import { useEffect, useState } from 'react';
import { responseMainBanner } from '@/utils/api/api.dto';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styled from '@emotion/styled';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Wrapper = styled.div`
  margin-top: 50px;
`;
const BannerItemWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`;

export function PromotionBanner(): React.ReactNode {
  const [bannerArray, setBannerArray] = useState<responseMainBanner>([]);
  const getPromotionBanner = async () => {
    const bannerData = await apiService.getPromotionBanner();
    setBannerArray(bannerData);
  };

  useEffect(() => {
    getPromotionBanner();
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
