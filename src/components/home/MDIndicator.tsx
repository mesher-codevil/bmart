import { CATEGORIES_LINKS } from "@/mock/category";
import styled from "@emotion/styled";

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
    <Indicator onClick={clickHandler}>
      {" "}
      {CATEGORIES_LINKS[index].name}
    </Indicator>
  );
}
