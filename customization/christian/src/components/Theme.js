import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as COLORS from './styles/colors';
import bp from './styles/breakpoints';

const Theme = ({ children }) => (
  <ThemeProvider
    theme={{
      primaryColor: COLORS.primary,
      secondaryColor: COLORS.secondary,
      blackColor: COLORS.black,
      whiteColor: COLORS.white,
      grayColor: COLORS.gray,
      lightGrayColor: COLORS.lightGray,
      disabledTextColor: COLORS.gray,
      dangerColor: COLORS.danger,
      warningColor: COLORS.warning,
      successColor: COLORS.success,
      ...bp,
    }}
  >
    {children}
  </ThemeProvider>
);

export default Theme;
