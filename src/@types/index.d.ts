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

export type SubcategoryType = {
  name: string;
  id: number;
};
export type CategoryLinkType = {
  id: number;
  linkUrl: string;
  iconUrl: string;
  name: string;
  subcategory: SubcategoryType[];
};
export type CategoryLinksType = CategoryLinkType[];
export type CategoryPageType = {
  name: string;
  products: number[];
  subcategory?: SubcategoryType[];
};

export type CartListType = {
  id: number;
  amount: number;
  isChecked: boolean;
  discountedPrice: number;
  price: number;
}[];

export type IChangeCart = {
  id: number;
  discountedPrice?: number;
  price?: number;
  amount?: number;
  isChecked?: boolean;
};

export interface IEditCart {
  isToggleFunction: boolean;
  id: number;
  multipledPrice: number;
}
