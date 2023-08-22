"use client";

import { Product } from "@/types";

import { CartContext } from "@/store/GlobalState";
import { apiService } from "@/utils/api/api.service";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

interface ICartProduct {
  id: number;
  amount: number;
  isSelectAll: boolean;
}
export function CartProduct({ id, amount }: ICartProduct) {
  const { cartList: cartState, updateCartState } = useContext(CartContext);

  const [product, setProduct] = useState<Product>();

  const increaseAmount = () => updateCartState({ id: id, amount: amount + 1 });
  const decreaseAmount = () => updateCartState({ id: id, amount: amount - 1 });
  const removeProduct = () => updateCartState({ id: id, amount: -1 });

  const onClickHandler = () => {
    const isChecked = cartState.filter((item) => item.id === id)?.[0].isChecked;
    updateCartState({ id: id, isChecked: !isChecked });
  };

  const getProduct = async () => {
    const data = await apiService.getProduct(id);
    setProduct(data);
    updateCartState({
      id: id,
      price: data.price,
      discountedPrice: data.discountedPrice,
    });
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) return null;
  return (
    <div>
      <h2>{product.name}</h2>
      <div>
        <span>{product.name}</span>
        <button onClick={removeProduct}>삭제</button>
      </div>
      <div>
        <input
          type="checkbox"
          checked={cartState.filter((item) => item.id === id)?.[0].isChecked}
          onClick={onClickHandler}
        />
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={50}
          height={50}
        />
        <div>
          <div>
            <div>{product.price}</div>
            <div>{product.discountedPrice || product.price}</div>
            <div>
              <button onClick={decreaseAmount} disabled={amount === 1}>
                -
              </button>
              {amount}
              <button onClick={increaseAmount}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
