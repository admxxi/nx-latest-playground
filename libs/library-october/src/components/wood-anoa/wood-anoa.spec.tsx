import { render } from '@testing-library/react';

import WoodAnoa from './wood-anoa';

describe('LibraryOctober', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WoodAnoa />);
    expect(baseElement).toBeTruthy();
  });
});
