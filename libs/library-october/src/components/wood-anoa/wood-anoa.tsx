import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LibraryOctoberProps {}

const StyledLibraryOctober = styled.div`
  color: purple;
`;

export function WoodAnoa(props: LibraryOctoberProps) {
  return (
    <StyledLibraryOctober>
      <h1>Testing Wood Anoa Component</h1>
    </StyledLibraryOctober>
  );
}

export default WoodAnoa;
