import { CartListType } from "@/types";
import { hasWindow, parse } from "@/utils";

const STORE_KEY = {
  RECENT_SEARCH: "recent-search",
  CART: "cart",
};

const DEFAULT_LOCALSTORAGE_STRING = "[]";
const DEFAULT_SESSIONSTORAGE_STRING = "[]";

class BrowserStore {
  //localstorage
  private getLocalStorage(key: string) {
    if (!hasWindow()) return [];
    const localStorageValue = localStorage.getItem(key);
    return parse(localStorageValue || DEFAULT_LOCALSTORAGE_STRING);
  }

  private setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private setRecentSearch(value: string[] | []) {
    this.setLocalStorage(STORE_KEY.RECENT_SEARCH, value);
  }

  private filteredSearchKeyword(keyword: string) {
    const localStorage = this.getRecentSearch();
    return localStorage.filter((item: string) => item !== keyword) || [];
  }

  public getRecentSearch(): string[] {
    return this.getLocalStorage(STORE_KEY.RECENT_SEARCH);
  }

  public addRecentSearch(addedValue: string) {
    const addedList = [...this.filteredSearchKeyword(addedValue), addedValue];
    this.setRecentSearch(addedList);
    return addedList;
  }
  public removeSearch(removedValue: string) {
    const filteredList = this.filteredSearchKeyword(removedValue);
    this.setRecentSearch([...filteredList]);
    return filteredList;
  }
  public clearAllSearch() {
    this.setRecentSearch([]);
    return [];
  }

  //sessionstorage
  private getSessionStorage(key: string) {
    if (!hasWindow()) return [];
    const sessionStorageValue = sessionStorage.getItem(key);
    return parse(sessionStorageValue || DEFAULT_SESSIONSTORAGE_STRING);
  }
  private setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  public getCartList() {
    return this.getSessionStorage(STORE_KEY.CART);
  }
  public setCartList(cartList: CartListType) {
    return this.setSessionStorage(STORE_KEY.CART, cartList);
  }
}

export const browserStore = new BrowserStore();
