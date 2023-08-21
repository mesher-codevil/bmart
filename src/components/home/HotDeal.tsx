import { Product } from '@/@types';
import { CartContext } from '@/store/GlobalState';
import { getRate } from '@/utils';
import { apiService } from '@/utils/api/api.service';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

const HOTDEAL_PRODUCTS_LENGTH = 4;

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
export function HotDeal() {
  const [products, setProducts] = useState<Product[]>([]);
  const [zoomedIndex, setZoomedIndex] = useState<number>(0);
  const selectedProduct = products[zoomedIndex];

  const [, changeCartState] = useContext(CartContext);

  const getProducts = async () => {
    const data = await apiService.getHotDeal();
    setProducts(data.slice(0, HOTDEAL_PRODUCTS_LENGTH));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product: Product, index: number) => (
        <Image
          src={product.thumbnail}
          width={100}
          height={100}
          alt={product.name}
          key={index}
          onClick={() => setZoomedIndex(index)}
        />
      ))}
      {selectedProduct?.thumbnail && (
        <div>
          <Image
            src={selectedProduct.thumbnail}
            width={400}
            height={400}
            alt={selectedProduct.name}
          />
          <div>{selectedProduct.name}</div>
          {selectedProduct.discountedPrice && (
            <RateSpan>
              {getRate(selectedProduct.discountedPrice, selectedProduct.price)}
            </RateSpan>
          )}
          <Price>{selectedProduct.price}</Price>
          {selectedProduct.discountedPrice && (
            <DiscountedPrice>{selectedProduct.discountedPrice}</DiscountedPrice>
          )}
          <Cart onClick={() => changeCartState({ id: selectedProduct.id })}>
            장바구니 담기
          </Cart>
        </div>
      )}
    </div>
  );
}
