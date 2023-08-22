import { CategoryPage, Product } from "@/types";
import { shuffleArray } from "..";
import { CATEGORIES_LINKS } from "@/mock/category";

const MOCKUP_IMG_BANNER =
  "https://marketplace.canva.com/EAFmRS3WR2w/1/0/400w/canva-red-modern-fried-chicken-grand-opening-banner-f63odXMauCw.jpg";
const MOCKUP_IMG_ALT = "치킨 이미지";
const MOCKUP_PRODUCT_LIST: Product[] = [
  {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 2,
    name: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    discountedPrice: 10,
    thumbnail:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 3,
    name: "Mens Cotton Jacket",
    price: 55.99,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 4,
    name: "Mens Casual Slim Fit",
    price: 15.99,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 5,
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    discountedPrice: 10,
    thumbnail:
      "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 6,
    name: "Solid Gold Petite Micropave ",
    price: 168,
    discountedPrice: 10,
    thumbnail:
      "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 7,
    name: "White Gold Plated Princess",
    price: 9.99,
    discountedPrice: 10,
    thumbnail:
      "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 8,
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    discountedPrice: 10,
    thumbnail:
      "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 9,
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 10,
    name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 11,
    name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 12,
    name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 13,
    name: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 14,
    name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 15,
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 16,
    name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 17,
    name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 18,
    name: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 19,
    name: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
  {
    id: 20,
    name: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    discountedPrice: 10,
    thumbnail: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    stock: 10,
    relaseDate: 1,
    popular: 0,
  },
];

const shuffleProductList = () => shuffleArray(MOCKUP_PRODUCT_LIST);

const createCategoryEndpoint = (): IMockup => {
  const categoryEndpoint: IMockup = {};
  for (const category of CATEGORIES_LINKS) {
    categoryEndpoint[`/category/${category.id}`] = {
      enabled: true,
      response: {
        name: category.name,
        subcategory: category.subcategory,
        recommend: shuffleProductList().slice(0, 15),
        products: shuffleProductList(),
      },
    };
    for (const subcategory of category.subcategory) {
      categoryEndpoint[`/category/${subcategory.id}`] = {
        enabled: true,
        response: {
          name: subcategory.name,
          products: shuffleProductList(),
        },
      };
    }
  }
  return categoryEndpoint;
};

const createProductEndpoint = (): IMockup => {
  const productEndpoint: IMockup = {};
  MOCKUP_PRODUCT_LIST.forEach(
    (product) =>
      (productEndpoint[`/product/${product.id}`] = {
        enabled: true,
        response: product,
      })
  );
  return productEndpoint;
};

export interface IMockup {
  [key: string]: {
    enabled: boolean;
    response: any;
    post?: (n: any) => any;
  };
}

export const Mockup: IMockup = {
  "/mainbanner": {
    enabled: true,
    response: Array(11).fill({
      imgSrc: MOCKUP_IMG_BANNER,
      alt: MOCKUP_IMG_ALT,
    }),
  },
  "/promotion/banner": {
    enabled: true,
    response: Array(11).fill({
      imgSrc: MOCKUP_IMG_BANNER,
      alt: MOCKUP_IMG_ALT,
    }),
  },
  "/recommend/customize": {
    enabled: true,
    get response() {
      return shuffleProductList();
    },
  },
  "/recommend/new-arrival": {
    enabled: true,
    get response() {
      return shuffleProductList();
    },
  },
  "/recommend/best-seller": {
    enabled: true,
    get response() {
      return shuffleProductList();
    },
  },
  "/recommend/daily": {
    enabled: true,
    get response() {
      return shuffleProductList();
    },
  },
  "/hotdeal": {
    enabled: true,
    get response() {
      return shuffleProductList();
    },
  },
  "/recommend/food": {
    enabled: true,
    get response() {
      return shuffleProductList();
    },
  },
  "/favorite": {
    enabled: true,
    response: [1, 3, 5],
    post(n: number) {
      if (this.response.includes(n))
        return (this.response = this.response.filter(
          (item: number) => item !== n
        ));
      return (this.response = [...this.response, n]);
    },
  },
  "/search": {
    enabled: true,
    response: shuffleProductList(),
  },

  ...createCategoryEndpoint(),
  ...createProductEndpoint(),
};
