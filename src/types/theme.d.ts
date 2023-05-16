
import { TypeBackground } from '@mui/material/styles/createPalette';
import { PaletteColor } from '@mui/material/styles';
import { Palette } from '@mui/material/styles';


declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    alt: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
      [key: string]: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    [key: string]: string;
  }
}

