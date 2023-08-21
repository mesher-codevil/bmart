import { CATEGORIESLINKS } from '@/constant/category';
import styled from '@emotion/styled';

const SelectedIndicator = styled.span`
  background-color: black;
  color: white;
`;
const UnSelectedIndicator = styled.span``;

export function MDIndicator(
  clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
  isSelected: boolean,
  index: number,
  label: string
) {
  const Indicator = isSelected ? SelectedIndicator : UnSelectedIndicator;
  return (
    <Indicator onClick={clickHandler}> {CATEGORIESLINKS[index].name}</Indicator>
  );
}
