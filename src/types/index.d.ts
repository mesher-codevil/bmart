export type Product = {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  thumbnail: string;
  stock: number;
  relaseDate: number;
  popular: number;
};

export type Subcategory = {
  name: string;
  id: number;
};
export type CategoryLink = {
  id: number;
  linkUrl: string;
  iconUrl: string;
  name: string;
  subcategory: Subcategory[];
};
export type CategoryLinks = CategoryLink[];
export type CategoryPage = {
  name: string;
  products: number[];
  subcategory?: Subcategory[];
};

export type CartListType = {
  id: number;
  amount: number;
  isChecked: boolean;
  discountedPrice: number;
  price: number;
}[];

export type ChangeCart = {
  id: number;
  discountedPrice?: number;
  price?: number;
  amount?: number;
  isChecked?: boolean;
};

export interface EditCart {
  isToggleFunction: boolean;
  id: number;
  multipledPrice: number;
}
