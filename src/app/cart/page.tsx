'use client';

import { IEditCart } from '@/@types';
import { CartProduct } from '@/components/cart/CartProduct';
import { Header } from '@/components/common/Header';
import { CartContext } from '@/store/GlobalState';
import styled from '@emotion/styled';
import Image from 'next/image';
import { createContext, useContext, useEffect, useState } from 'react';
import Arrow from '@assets/arrow.svg';
import { useRouter } from 'next/navigation';
export const CheckContext = createContext<
  [IEditCart[], (props: IEditCart) => void]
>([[], () => null]);

const BuyCartButton = styled.div`
  position: fixed;
  bottom: 10px;
  background-color: green;
  width: 500px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  color: white;
  & > span {
    background-color: white;
    color: green;
    padding: 6px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
  }
`;
const Wrapper = styled.div`
  padding-top: 50px;
`;
export default function Cart() {
  const [cartList, _, clearChecked, toggleAll] = useContext(CartContext);
  const [isSelectAll, setisSelectAll] = useState(false);

  const { back } = useRouter();

  const removeCheckedItem = () => {
    clearChecked(
      cartList.filter((item) => item.isChecked).map((item) => item.id)
    );
  };

  const backtoPreviousPage = () => back();

  useEffect(() => {
    toggleAll(isSelectAll);
  }, [isSelectAll]);

  return (
    <Wrapper>
      <div>
        <Header>
          <Image src={Arrow} alt="back to page" onClick={backtoPreviousPage} />
          <div>장바구니</div>
          <span />
        </Header>
        <div>
          <div onClick={() => setisSelectAll(!isSelectAll)}>
            {isSelectAll ? '선택 해제' : '모두 선택하기'}
          </div>
          <div onClick={removeCheckedItem}>선택 비우기</div>
        </div>
        <div>
          <h3>일반 상품</h3>
          {cartList.map((product, index) => (
            <CartProduct
              id={product.id}
              amount={product.amount}
              isSelectAll={isSelectAll}
              key={index}
            />
          ))}
        </div>
        <BuyCartButton>
          <span>{cartList.length}</span>
          {cartList.reduce(
            (acc, { isChecked, amount, discountedPrice, price }) =>
              acc + (isChecked ? amount * (discountedPrice || price) : 0),
            0
          )}
          주문하기
        </BuyCartButton>
      </div>
    </Wrapper>
  );
}
