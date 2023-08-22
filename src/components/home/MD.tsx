"use client";
import { CategoryPage } from "@/types";
import { apiService } from "@/utils/api/api.service";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { MDIndicator } from "./MDIndicator";
import styled from "@emotion/styled";

const CarouselItem = styled.div`
  height: 500px;
`;

export function MD() {
  const [products, setProducts] = useState<CategoryPage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const getProducts = async () => {
    const data = await apiService.getCategoryPage(String(currentPage));
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2>번쩍하면 배달오는 B마트 대표상품</h2>
      {/* <Carousel
        swipeScrollTolerance={5}
        showArrows={false}
        renderIndicator={MDIndicator}
        axis="vertical"
        emulateTouch={true}
        swipeable={true}
      >
        <CarouselItem>1</CarouselItem>
        <CarouselItem>1</CarouselItem>
        <CarouselItem>1</CarouselItem>
        <CarouselItem>1</CarouselItem>
        <CarouselItem>1</CarouselItem>
        <CarouselItem>1</CarouselItem>
      </Carousel> */}
    </div>
  );
}
