'use client';

import { useEffect, useState } from 'react';
import { DisplayRecommend } from './DisplayRecommend';
import { Product } from '@/@types';
import { apiService } from '@/utils/api/api.service';
import styled from '@emotion/styled';

const CUSTOMIZE_LIST_LENGTH = 9;
const NEWARRIVAL_LIST_LENGTH = 20;
const BESTSELLER_LIST_LENGTH = 20;
const DAILY_LIST_LENGTH = 6;
const FOOD_LIST_LENGTH = 6;

const RefetchButton = styled.button`
  border: 1px solid green;
  background-color: transparent;
  color: green;
  width: 100%;
  font-size: 25px;
`;

export function RecommendMenu() {
  const [customizeList, setCustomizeList] = useState<Product[]>([]);
  const [newArrivalList, setNewArrivalList] = useState<Product[]>([]);
  const [bestSellerList, setBestSellerList] = useState<Product[]>([]);
  const [dailyList, setDailyList] = useState<Product[]>([]);
  const [foodList, setFoodList] = useState<Product[]>([]);

  const getCustomizeList = async () => {
    const data = await apiService.getCustomizeRecommend();
    setCustomizeList(data.slice(0, CUSTOMIZE_LIST_LENGTH));
  };
  const getNewArrivalList = async () => {
    const data = await apiService.getNewArrivalRecommend();
    setNewArrivalList(data.slice(0, NEWARRIVAL_LIST_LENGTH));
  };
  const getBestSeller = async () => {
    const data = await apiService.getBestSellerRecommend();
    setBestSellerList(data.slice(0, BESTSELLER_LIST_LENGTH));
  };
  const getDaily = async () => {
    const data = await apiService.getDailyRecommend();
    setDailyList(data.slice(0, DAILY_LIST_LENGTH));
  };
  const getFood = async () => {
    const data = await apiService.getFoodRecommend();
    setFoodList(data.slice(0, FOOD_LIST_LENGTH));
  };
  useEffect(() => {
    getCustomizeList();
    getNewArrivalList();
    getBestSeller();
    getDaily();
    getFood();
  }, []);
  return (
    <div>
      <DisplayRecommend
        title="크롱님을 위한 준비한 상품"
        products={customizeList}
        type="row"
      />
      <DisplayRecommend title="지금 뭐 먹지?" products={foodList} type="grid" />
      <RefetchButton onClick={getFood}>지금 뭐 먹지?</RefetchButton>

      <DisplayRecommend
        title="지금 필요한 생필품"
        products={dailyList}
        type="grid"
      />
      <RefetchButton onClick={getDaily}>
        지금 필요한 생필품! 다른 상품 보기
      </RefetchButton>
      <DisplayRecommend
        title="새로 나왔어요"
        products={newArrivalList}
        type="row"
      />
      <DisplayRecommend
        title="요즘 잘팔려요"
        products={bestSellerList}
        type="row"
      />
    </div>
  );
}
