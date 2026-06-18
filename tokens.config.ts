export interface ColorTokens {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  text: string;
  textInverse: string;
  border: string;
  background: string;
  backgroundHover: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface FontSizeTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface DesignTokens {
  colors: ColorTokens;
  spacing: SpacingTokens;
  fontSize: FontSizeTokens;
  shadows: ShadowTokens;
}

export const defaultTokens: DesignTokens = {
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#4b5563',
    secondaryHover: '#374151',
    text: '#374151',
    textInverse: '#ffffff',
    border: '#9ca3af',
    background: 'transparent',
    backgroundHover: '#f3f4f6',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
};

export default defaultTokens;
