import { css } from 'styled-components';

const sizes = {
  min: '20em', // 320px
  xs: '30em', // 480px
  s: '36em', // 576px
  sm: '40em', // 640px
  m: '48em', // 768px
  ml: '60em', // 960px
  l: '64em', // 1024px
  xl: '67.5em', // 1080px
  base: '80em', // 1280px
  wide: '90em', // 1440px
};
const min = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const max = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export default min;
export { max };
