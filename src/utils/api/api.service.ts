import {
  responseCustomizeRecommend,
  responseMainBanner,
  responsePromotionBanner,
  responseNewArrivalRecommend,
  responseBestSellerRecommend,
  responseDailyRecommend,
  responseFoodRecommend,
  responseHotDeal,
  responseProduct,
  responseSearch,
} from './api.dto';
import { IMockup, Mockup } from './api.mock';
import { apiPath } from './api.path';
import axios from 'axios';

class ApiService {
  private readonly axiosInstance = axios.create({
    baseURL: '/',
    timeout: 60000,
  });
  private getMockData(mockup: IMockup, endpoint: string) {
    const mockupValue = mockup?.[endpoint];
    const hasMockupKey = !!mockupValue;
    const isEnabled = !!mockupValue?.enabled;
    const inValidReturn = undefined;
    return hasMockupKey && isEnabled ? mockupValue?.response : inValidReturn;
  }
  private postMockData(mockup: IMockup, endpoint: string, data: any) {
    const mockupValue = mockup?.[endpoint];
    const inValidReturn = undefined;
    if (!mockupValue?.post) return inValidReturn;
    const hasMockupKey = !!mockupValue;
    const isEnabled = !!mockupValue?.enabled;

    return hasMockupKey && isEnabled ? mockupValue?.post(data) : inValidReturn;
  }

  private readonly axiosRequestOption =
    this.axiosInstance.interceptors.request.use(
      (request) => {
        const mock =
          request.method === 'get'
            ? this.getMockData(Mockup, request?.url || '')
            : this.postMockData(Mockup, request?.url || '', request.data);
        if (!mock) return request;

        return {
          ...request,
          adapter: (config) => {
            return new Promise((resolve) => {
              const res = {
                data: mock,
                status: 200,
                statusText: 'OK',
                headers: { 'content-type': 'text/plain; charset=utf-8' },
                config,
                request: {},
              };
              return resolve(res);
            });
          },
        };
      },
      (err) => new Promise(err)
    );
  public async getMainBanner() {
    const { data } = await this.axiosInstance.get<responseMainBanner>(
      apiPath.MainBanner
    );
    return data;
  }
  public async getPromotionBanner() {
    const { data } = await this.axiosInstance.get<responsePromotionBanner>(
      apiPath.PromotionBanner
    );
    return data;
  }
  public async getCustomizeRecommend() {
    const { data } = await this.axiosInstance.get<responseCustomizeRecommend>(
      apiPath.CustomizeRecommend
    );
    return data;
  }
  public async getNewArrivalRecommend() {
    const { data } = await this.axiosInstance.get<responseNewArrivalRecommend>(
      apiPath.NewArrivalRecommend
    );
    return data;
  }
  public async getBestSellerRecommend() {
    const { data } = await this.axiosInstance.get<responseBestSellerRecommend>(
      apiPath.BestSellerRecommend
    );
    return data;
  }
  public async getDailyRecommend() {
    const { data } = await this.axiosInstance.get<responseDailyRecommend>(
      apiPath.DailyRecommend
    );
    return data;
  }
  public async getFoodRecommend() {
    const { data } = await this.axiosInstance.get<responseFoodRecommend>(
      apiPath.FoodRecommend
    );
    return data;
  }
  public async getHotDeal() {
    const { data } = await this.axiosInstance.get<responseHotDeal>(
      apiPath.HotDeal
    );
    return data;
  }
  public async getCategoryPage(id: string) {
    const { data } = await this.axiosInstance.get(`/category/${id}`);
    return data;
  }
  public async getProduct(id: number) {
    const { data } = await this.axiosInstance.get<responseProduct>(
      `/product/${id}`
    );
    return data;
  }
  public async getSearch() {
    const { data } = await this.axiosInstance.get<responseSearch>(
      apiPath.Search
    );
    return data;
  }
  public async postFavorite(n: number) {
    const { data } = await this.axiosInstance.post(apiPath.Favorite, n);
    return data;
  }
}

export const apiService = new ApiService();
