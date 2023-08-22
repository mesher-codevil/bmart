"use client";
import Image from "next/image";
import styled from "@emotion/styled";
import { Header } from "@/components/common/Header";
import Arrow from "@assets/arrow.svg";
import { useContext, useEffect, useState } from "react";
import { apiService } from "@/utils/api/api.service";
import { Subcategory } from "@/types";
import { useRouter } from "next/navigation";
import { DisplayRecommend } from "@/components/home/DisplayRecommend";
import { CategoryProducts } from "./CategoryProducts";
import { SearchOpenContext, SidebarOpenContext } from "@/store/GlobalState";
const Wrapper = styled.div`
  margin-top: 30px;
`;

interface ISuperCategory {
  id: string | null;
}

const Navigator = styled.ul`
  display: flex;
  flex-flow: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;
const SubCategoryLink = styled.li`
  width: calc(50% - 2px);
  border: 1px solid black;
  padding: 10px 20px;
  box-sizing: border-box;
`;
export function SuperCategory({ id }: ISuperCategory) {
  const { setIsSearchOpen } = useContext(SearchOpenContext);
  const { setIsSidebarOpen } = useContext(SidebarOpenContext);
  const openSearch = () => setIsSearchOpen(true);
  const openSidebar = () => setIsSidebarOpen(true);
  const [category, setCategory] = useState({
    name: "",
    subcategory: [],
    recommend: [],
    products: [],
  });
  const { push } = useRouter();

  const goToSubcategory = (id: number) => push(`/category?category_id=${id}`);
  const getSubcategory = async () => {
    const data = await apiService.getCategoryPage(id || "0");
    setCategory(data);
  };
  useEffect(() => {
    getSubcategory();
  }, []);
  if (!id) return <></>;
  return (
    <Wrapper>
      <Header>
        <Image src={Arrow} alt="back to page" />
        {category.name}
        <div>
          <Image src={Arrow} alt="back to page" onClick={openSearch} />
          <Image src={Arrow} alt="back to page" onClick={openSidebar} />
        </div>
      </Header>
      {category.subcategory && (
        <>
          <Navigator>
            {category.subcategory.map((sub: Subcategory, index: number) => (
              <SubCategoryLink
                key={index}
                onClick={() => goToSubcategory(sub.id)}
              >
                {sub.name}
              </SubCategoryLink>
            ))}
          </Navigator>
          <DisplayRecommend
            title="이 상품 어때요?"
            products={category.recommend}
            type="row"
          />
        </>
      )}
      <CategoryProducts products={category.products} />
    </Wrapper>
  );
}
