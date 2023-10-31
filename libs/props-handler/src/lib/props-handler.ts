import get from 'lodash-es/get';
import startsWith from 'lodash-es/startsWith';

interface EnvCollection {
  [key: string]: string;
}

function isJSON(str: string): boolean {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}
const removeVitePrefix = (key: string) => {
  return key.replace('VITE_', '');
};

const getViteKeys = (envs: Record<string, string>) => {
  return Object.keys(envs)
      .filter((k) => startsWith(k, 'VITE_'))
      .map((k) => removeVitePrefix(k));
};

const dotfileEnvs = (envs: EnvCollection) => {
  const cleanEnvs = {} as Record<string, string>;

  getViteKeys(envs).forEach((k) => {
    cleanEnvs[k] = envs['VITE_' + k];
  });

  return cleanEnvs;
};

const castToBoolean = (v: unknown): string | boolean => {
  if (typeof v === 'string') {
    if (v.toLowerCase() === 'true') {
      return true;
    }
    if (v.toLowerCase() === 'false') {
      return false;
    }
  }

  return String(v);
};
const datasetPropsExtractor = (el: HTMLElement) => {
  const datasetProps = get(el, 'dataset.props', '');

  try {
    if (!datasetProps.length) {
      return {};
    }

    const json = isJSON(datasetProps);
    if (json) {
      return json;
    }

    return JSON.parse(atob(datasetProps));
  } catch (e) {
    if (String(import.meta.env.PROD) === 'true') {
      return {};
    } else {
      throw e;
    }
  }
};

export const propsHandler = (
    el?: HTMLElement,
    bundler = 'vite'
): Record<string, string | boolean> => {
  const datasetProps = datasetPropsExtractor(
      el || document.getElementById('root') || document.body
  );
  const localEnvs = dotfileEnvs(
      bundler === 'vite'
          ? (import.meta.env as EnvCollection)
          : (process.env as EnvCollection)
  );

  const allProps = {
    ...localEnvs,
    ...datasetProps,
  };

  Object.keys(allProps).forEach((k) => {
    allProps[k] = castToBoolean(allProps[k]);
  });

  return allProps;
};
