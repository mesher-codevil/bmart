'use client';

import styled from '@emotion/styled';
import { useContext, useEffect, useRef, useState } from 'react';
import { SearchOpenContext } from '../../store/GlobalState';
import Image from 'next/image';
import Arrow from '@assets/arrow.svg';
import { browserStore } from '@/store/BrowserStore';
import { Product } from '@/@types';
import { apiService } from '@/utils/api/api.service';
const Wrapper = styled.div`
  position: fixed;
  background-color: lightgray;
  width: var(--mobile-width);
`;
const InputWrapper = styled.div`
  display: flex;
`;
const SearchInput = styled.input`
  width: 100%;
  display: flex;
`;

const RecentBoard = styled.ul``;
export function Search(): React.ReactNode {
  const [, setIsSearchOpen] = useContext(SearchOpenContext);

  const [currentKeyword, setCurrentKeyword] = useState('');
  const [recentlySearched, setRecentlySearched] = useState<string[]>(
    browserStore.getRecentSearch()
  );

  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const $SearchInput = useRef<HTMLInputElement>(null);

  const closeSearch = () => setIsSearchOpen(false);

  const search = () => {
    const isValidSearchKeyword =
      !$SearchInput?.current?.value ||
      $SearchInput?.current?.value.trim() === '';

    if (isValidSearchKeyword) return;
    const keyword = $SearchInput?.current?.value;
    const addedList = browserStore.addRecentSearch(keyword);
    setCurrentKeyword(keyword);
    setRecentlySearched(addedList);
    $SearchInput.current.value = '';
  };
  const removeKeyword = (keyword: string) => {
    const removedList = browserStore.removeSearch(keyword);
    setRecentlySearched(removedList);
  };

  const clearAllKeyword = () => {
    const clearedKeyword = browserStore.clearAllSearch();
    setRecentlySearched(clearedKeyword);
  };

  const getSearch = async () => {
    const data = await apiService.getSearch();
    setSearchResult(data.filter((item) => item.name.includes(currentKeyword)));
  };
  useEffect(() => {
    getSearch();
  }, [currentKeyword]);
  return (
    <Wrapper>
      <InputWrapper>
        <Image src={Arrow} alt="back to page" onClick={closeSearch} />
        <SearchInput placeholder="어떤 메뉴를 찾으시나요?" ref={$SearchInput} />
        <Image src={Arrow} alt="search the keyword" onClick={search} />
      </InputWrapper>
      <RecentBoard>
        {recentlySearched.reverse().map((keyword: string, index: number) => (
          <li key={index}>
            {keyword}
            <Image
              src={Arrow}
              alt="back to page"
              onClick={() => removeKeyword(keyword)}
            />
          </li>
        ))}
      </RecentBoard>
      <div>{searchResult.map((item) => item.name).join(', ')}</div>
      <button onClick={clearAllKeyword}>전체 삭제하기</button>
    </Wrapper>
  );
}
