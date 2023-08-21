'use client';

import { useSearchParams } from 'next/navigation';
import { findCategoryName } from '@/utils';
// import { SuperCategory } from './SuperCategory';

import { NullCategory } from '@/components/category/NullCategory';
import { SuperCategory } from '@/components/category/SuperCategory';
export default function Home() {
  const params = useSearchParams();
  const categoryId = params.get('category_id');
  const categoryType = findCategoryName(categoryId);
  if (!categoryType) return <NullCategory />;
  return <SuperCategory id={categoryId} />;
}
