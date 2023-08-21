'use client';
import styled from '@emotion/styled';
import { useContext } from 'react';
import { SidebarOpenContext } from '../../store/GlobalState';
import { CategoryLinkType, SubcategoryType } from '@/@types';
import Image from 'next/image';
import Arrow from '@assets/arrow.svg';
import { CATEGORIESLINKS } from '@/constant/category';

const Wrapper = styled.div`
  @keyframes sliding {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  animation: 1s ease-in-out sliding;
  position: fixed;
  background-color: lightgray;
  width: var(--mobile-width);
`;
const CategoriesWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;
const CategoryWrapper = styled.ul`
  width: 50%;
  padding: 0;
  margin: 0;
`;
export function Sidebar(): React.ReactNode {
  const [isSidebarOpen, setIsSidebarOpen] = useContext(SidebarOpenContext);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Wrapper>
      <Image src={Arrow} alt="back to page" onClick={closeSidebar} />
      <CategoriesWrapper>
        {CATEGORIESLINKS.map((category: CategoryLinkType, index: number) => (
          <CategoryWrapper key={index}>
            <details>
              <summary>{category.name}</summary>
              {category.subcategory.map(
                (subcategory: SubcategoryType, index: number) => (
                  <li key={index}>{subcategory.name}</li>
                )
              )}
            </details>
          </CategoryWrapper>
        ))}
      </CategoriesWrapper>
    </Wrapper>
  );
}
