import { Product } from "@/types";
import { CartContext } from "@/store/GlobalState";
import { getRate } from "@/utils";
import styled from "@emotion/styled";
import Image from "next/image";
import { useContext } from "react";

interface IMDCard {
  product: Product;
}
const RateSpan = styled.span`
  color: red;
`;
const Price = styled.span`
  color: gray;
  text-decoration: line-through;
`;
const DiscountedPrice = styled.span`
  color: black;
`;
const Cart = styled.span`
  color: green;
  float: right;
  border: 1px solid green;
  padding: 2px 5px;
  border-radius: 5px;
`;
export function MDCard({ product }: IMDCard) {
  const { updateCartState } = useContext(CartContext);
  return (
    <div>
      <Image
        src={product.thumbnail}
        width={400}
        height={400}
        alt={product.name}
      />
      <div>{product.name}</div>
      {product.discountedPrice && (
        <RateSpan>{getRate(product.discountedPrice, product.price)}</RateSpan>
      )}
      <Price>{product.price}</Price>
      {product.discountedPrice && (
        <DiscountedPrice>{product.discountedPrice}</DiscountedPrice>
      )}
      <Cart onClick={() => updateCartState({ id: product.id })}>
        장바구니 담기
      </Cart>
    </div>
  );
}
