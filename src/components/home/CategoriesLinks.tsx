'use client';

import { CATEGORIESLINKS } from '@/constant/category';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > img {
    width: 20%;
    height: fit-content;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 100%;
  }
`;

export function CategoriesLinks() {
  const { push } = useRouter();
  const onClickHandler = (id: number) => push(`/category?category_id=${id}`);
  return (
    <Wrapper>
      {CATEGORIESLINKS.map((category, index) => (
        <Image
          width={50}
          height={50}
          src={category.iconUrl}
          key={index}
          alt={category.name}
          onClick={() => onClickHandler(category.id)}
        />
      ))}
    </Wrapper>
  );
}
