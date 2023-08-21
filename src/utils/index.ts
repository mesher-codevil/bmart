import { CATEGORIESLINKS } from '@/constant/category';

const pickNumber = (n: number): number => Math.floor(Math.random() * n);

export const hasWindow = (): boolean => !(typeof window === 'undefined');

export const shuffleArray = (array: any[]): number[] => {
  const maxLength = array.length;
  return [...array].sort(() => pickNumber(maxLength) - pickNumber(maxLength));
};

export const findCategoryName = (
  id: string | null
): 'category' | 'subcategory' | undefined => {
  if (id === null) return undefined;
  for (const category of CATEGORIESLINKS) {
    if (String(category.id) === id) return 'category';
    for (const subcategory of category.subcategory) {
      if (String(subcategory.id) === id) return 'subcategory';
    }
  }
  return undefined;
};

export const getRate = (
  discountedPrice: number | undefined,
  price: number
): number => {
  if (!discountedPrice) return 0;
  return (price - discountedPrice) / price;
};
