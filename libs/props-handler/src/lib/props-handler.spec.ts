import { propsHandler } from './props-handler';
import { vi } from 'vitest';
import get from 'lodash-es/get';

describe('utils -> propsHandler', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('should work by using a .env variable', () => {
    vi.stubEnv('VITE_TESTING_PROPS_HANDLER', 'true');

    expect(propsHandler()).toHaveProperty('TESTING_PROPS_HANDLER', true);
  });
  //
  it('should work by using the dataset props (encoded)', () => {
    const root = document.createElement('div');
    root.dataset['props'] = 'eyJURVNUIjoidHJ1ZSJ9';

    expect(propsHandler(root)).toHaveProperty('TEST', true);
  });
  //
  it('should work by using the dataset props (decoded)', () => {
    const root = document.createElement('div');
    root.dataset['props'] = '{"TESTING_PROPS_HANDLER":"true"}';

    expect(propsHandler(root)).toHaveProperty('TESTING_PROPS_HANDLER', true);
  });
  //
  it('should throw SyntaxError Exception', () => {
    try {
      const root = document.createElement('div');
      root.dataset['props'] = '{"TESTING_PROPS_HANDLER:"true"}';

      propsHandler(root);
    } catch (e: unknown) {
      expect(get(e, 'message', '')).toEqual(
          'The string to be decoded contains invalid characters.'
      );
    }
  });
  //
  it('should not throw SyntaxError Exception', () => {
    vi.stubEnv('PROD', 'true');
    const root = document.createElement('div');
    root.dataset['props'] = '{"TESTING_PROPS_HANDLER:"true"}';

    const props = propsHandler(root);

    expect(props).toBeTypeOf('object');
    expect(props).not.toHaveProperty('TESTING_PROPS_HANDLER');
  });
});
