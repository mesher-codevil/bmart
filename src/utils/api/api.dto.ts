import { CategoryPageType, Product } from '@/@types';

export type responseMainBanner = {
  imgSrc: string;
  alt: string;
}[];
export type responsePromotionBanner = {
  imgSrc: string;
  alt: string;
}[];

export type responseCustomizeRecommend = Product[];
export type responseNewArrivalRecommend = Product[];
export type responseBestSellerRecommend = Product[];
export type responseDailyRecommend = Product[];
export type responseFoodRecommend = Product[];
export type responseHotDeal = Product[];
export type responseSearch = Product[];
export type responseCategorypage = CategoryPageType;
export type responseProduct = Product;
