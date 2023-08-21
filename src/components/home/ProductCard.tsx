'use client';

import { Product } from '@/@types';
import { FavoriteContext } from '@/store/GlobalState';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useContext } from 'react';
import { Heart } from '@common/svg/Heart';
import { apiService } from '@/utils/api/api.service';

interface IProductCard {
  product: Product;
}

const Wrapper = styled.div`
  width: calc(33.3% - 10px);
`;
const ImageWrapper = styled.div`
  position: relative;
  & > svg {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
`;

export function ProductCard({ product }: IProductCard) {
  const [favoriteList, setFavoriteList] = useContext(FavoriteContext);
  const isFavoriteProduct = favoriteList.includes(product.id);

  const getFavoriteList = async () => {
    const data = await apiService.postFavorite(product.id);
    setFavoriteList(data);
  };
  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={product.thumbnail}
          width={200}
          height={200}
          alt={product.name}
        />
        <Heart isSelected={isFavoriteProduct} onClick={getFavoriteList} />
      </ImageWrapper>
      <div>{product.name}</div>
      <div>{product.price}</div>
    </Wrapper>
  );
}
