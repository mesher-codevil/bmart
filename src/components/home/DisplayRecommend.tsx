"use client";

import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import styled from "@emotion/styled";

interface IDisplayRecommendMenu {
  title: string;
  products: Product[];
  type: "row" | "grid";
}

const RowWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
`;
const GridWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: wrap;
`;
export function DisplayRecommend(props: IDisplayRecommendMenu) {
  const { title, products, type } = props;
  const Wrapper = type === "row" ? RowWrapper : GridWrapper;
  return (
    <>
      <h2>{title}</h2>
      <Wrapper>
        {products.map((product: Product, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </Wrapper>
    </>
  );
}
