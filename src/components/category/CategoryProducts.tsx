import { Product } from "@/types";
import { ProductCard } from "../home/ProductCard";
import styled from "@emotion/styled";
import Select from "react-select";
import { useState } from "react";
import { getRate } from "@/utils";

interface ICategoryProducts {
  products: Product[];
}
const Wrapper = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const SORT_OPTION = [
  { value: "base", label: "기본" },
  { value: "popular", label: "인기" },
  { value: "priceDsc", label: "금액높은순" },
  { value: "priceAsc", label: "금액낮은순" },
  { value: "new", label: "신규 상품순" },
  { value: "discount", label: "할인율 순" },
];
const sortProducts = (
  products: Product[],
  { value }: { value: string; label: string }
) => {
  if (value === "popular")
    return products.sort((prev, next) => prev.popular - next.popular);
  if (value === "new")
    return products.sort((prev, next) => prev.relaseDate - next.relaseDate);
  if (value === "priceAsc")
    return products.sort((prev, next) => prev.price - next.price);

  if (value === "priceDsc")
    return products.sort((prev, next) => prev.price - next.price).reverse();
  if (value === "discount")
    return products.sort(
      (prev, next) =>
        getRate(prev?.discountedPrice, prev.price) -
        getRate(next?.discountedPrice, next.price)
    );
  return products;
};
export function CategoryProducts({ products }: ICategoryProducts) {
  const [sortOption, setSortOption] = useState({
    value: "base",
    label: "기본",
  });
  const sortedProducts = sortProducts(products, sortOption);
  return (
    <>
      <Select
        options={SORT_OPTION}
        defaultValue={{
          value: "base",
          label: "기본",
        }}
        onChange={setSortOption}
      />

      <Wrapper>
        {sortedProducts?.map((product: Product, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </Wrapper>
    </>
  );
}
