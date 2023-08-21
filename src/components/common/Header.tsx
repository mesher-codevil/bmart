'use client';
import styled from '@emotion/styled';
import { useContext } from 'react';
import { SidebarOpenContext, SearchOpenContext } from '../../store/GlobalState';
import { Sidebar } from './Sidebar';
import { Search } from './Search';
const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  display: flex;
  width: 100%;
  max-width: 500px;
  justify-content: space-between;
  z-index: 100;
`;

interface IHeader {
  children: React.ReactNode;
}

export function Header({ children }: IHeader): React.ReactNode {
  const [isSidebarOpen] = useContext(SidebarOpenContext);
  const [isSearchOpen] = useContext(SearchOpenContext);
  return (
    <Wrapper>
      {children}
      {isSearchOpen && <Search />}
      {isSidebarOpen && <Sidebar />}
    </Wrapper>
  );
}
