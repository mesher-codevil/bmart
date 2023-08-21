class ApiPath {
  public get MainBanner() {
    return `/mainbanner`;
  }
  public get PromotionBanner() {
    return `/promotion/banner`;
  }
  public get CustomizeRecommend() {
    return '/recommend/customize';
  }
  public get NewArrivalRecommend() {
    return '/recommend/new-arrival';
  }
  public get BestSellerRecommend() {
    return '/recommend/best-seller';
  }
  public get DailyRecommend() {
    return '/recommend/daily';
  }
  public get FoodRecommend() {
    return '/recommend/food';
  }
  public get Favorite() {
    return '/favorite';
  }
  public get HotDeal() {
    return '/hotdeal';
  }
  public get Search() {
    return '/search';
  }
}

export const apiPath = new ApiPath();
