'use client';
import { CartListType, IChangeCart } from '@/@types';
import { apiService } from '@/utils/api/api.service';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactNode,
} from 'react';
import { browserStore } from './BrowserStore';
interface IGlobalContext {
  children: React.ReactNode;
}

type booleanStateType = [boolean, Dispatch<SetStateAction<boolean>>];

const INITIALIZE_POST_FAVORITE_NUMBER = -1;
const DEFAULT_DISPATCH = () => null;
const DEFAULT_BOOLEAN_STATE: booleanStateType = [false, DEFAULT_DISPATCH];

const CartButton = styled.div`
  position: fixed;
  bottom: 0px;
  left: 500px;
  background-color: black;
  color: white;
  padding: 10px;
`;

export const FavoriteContext = createContext<
  [number[], Dispatch<SetStateAction<number[]>>]
>([[], DEFAULT_DISPATCH]);

export const CartContext = createContext<
  [
    CartListType,
    (props: IChangeCart) => void,
    (ids: number[]) => void,
    (state: boolean) => void,
  ]
>([[], DEFAULT_DISPATCH, DEFAULT_DISPATCH, DEFAULT_DISPATCH]);

export const SidebarOpenContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>(DEFAULT_BOOLEAN_STATE);

export const SearchOpenContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>(DEFAULT_BOOLEAN_STATE);

export function GlobalStateContext({ children }: IGlobalContext): ReactNode {
  const [cartList, setCartList] = useState<CartListType>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [favoriteList, setFavoriteList] = useState<number[]>([]);

  const { push } = useRouter();

  const changeCartState = (props: IChangeCart) => {
    const { id, price, isChecked, amount, discountedPrice } = props;
    const selectedIndex = cartList.findIndex((item) => item.id === id);
    if (selectedIndex === -1)
      return setCartList([
        ...cartList,
        {
          id: id,
          amount: 1,
          isChecked: false,
          price: price || 0,
          discountedPrice: discountedPrice || 0,
        },
      ]);
    if (amount === -1)
      return setCartList([...cartList.filter((item) => item.id !== id)]);

    const currentCart = cartList[selectedIndex];
    const isCheckedExist = isChecked !== undefined;

    return setCartList([
      ...cartList.slice(0, selectedIndex),
      {
        id: currentCart.id,
        amount: amount || currentCart.amount + (isCheckedExist ? 0 : 1),
        isChecked: isCheckedExist ? isChecked : currentCart.isChecked,
        price: price || currentCart.price,
        discountedPrice: discountedPrice || currentCart.discountedPrice,
      },

      ...cartList.slice(selectedIndex + 1),
    ]);
  };

  const clearChecked = (idList: number[]) => {
    setCartList(cartList.filter((item) => !idList.includes(item.id)));
  };
  const toggleAll = (state: boolean) => {
    setCartList(cartList.map((item) => ({ ...item, isChecked: state })));
  };
  const getFavoriteList = async () => {
    const data = await apiService.postFavorite(INITIALIZE_POST_FAVORITE_NUMBER);
    setFavoriteList(data);
  };

  useEffect(() => {
    getFavoriteList();
    setCartList(browserStore.getCartList());
  }, []);
  useEffect(() => {
    browserStore.setCartList(cartList);
  }, [cartList]);
  return (
    <FavoriteContext.Provider value={[favoriteList, setFavoriteList]}>
      <CartContext.Provider
        value={[cartList, changeCartState, clearChecked, toggleAll]}
      >
        <SidebarOpenContext.Provider value={[isSidebarOpen, setIsSidebarOpen]}>
          <SearchOpenContext.Provider value={[isSearchOpen, setIsSearchOpen]}>
            <main>
              {children}
              <CartButton onClick={() => push('/cart')}>
                {cartList.length}
              </CartButton>
            </main>
          </SearchOpenContext.Provider>
        </SidebarOpenContext.Provider>
      </CartContext.Provider>
    </FavoriteContext.Provider>
  );
}
