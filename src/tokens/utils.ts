import { defaultTokens, DesignTokens, ColorTokens, SpacingTokens, FontSizeTokens, ShadowTokens } from '../../tokens.config';

type TokenCategory = keyof DesignTokens;
type TokenKey<T extends TokenCategory> = keyof DesignTokens[T];

export interface TokenValidationResult {
  missing: string[];
  merged: DesignTokens;
}

export function mergeWithDefaults(userTokens: Partial<DesignTokens> = {}): TokenValidationResult {
  const missing: string[] = [];

  const mergeCategory = <T extends TokenCategory>(
    category: T,
    defaults: DesignTokens[T]
  ): DesignTokens[T] => {
    const userCategory = (userTokens[category] || {}) as Partial<DesignTokens[T]>;
    const result = { ...defaults } as DesignTokens[T];

    for (const key of Object.keys(defaults) as TokenKey<T>[]) {
      const keyStr = String(key);
      if (userCategory[key] === undefined) {
        missing.push(`${String(category)}.${keyStr}`);
      } else {
        (result as any)[key] = userCategory[key];
      }
    }

    return result;
  };

  const merged: DesignTokens = {
    colors: mergeCategory('colors', defaultTokens.colors),
    spacing: mergeCategory('spacing', defaultTokens.spacing),
    fontSize: mergeCategory('fontSize', defaultTokens.fontSize),
    shadows: mergeCategory('shadows', defaultTokens.shadows),
  };

  return { missing, merged };
}

export function generateCssVariables(tokens: DesignTokens): string {
  const lines: string[] = [':root {'];

  for (const [name, value] of Object.entries(tokens.colors)) {
    lines.push(`  --color-${toKebab(name)}: ${value};`);
  }
  for (const [name, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${toKebab(name)}: ${value};`);
  }
  for (const [name, value] of Object.entries(tokens.fontSize)) {
    lines.push(`  --font-size-${toKebab(name)}: ${value};`);
  }
  for (const [name, value] of Object.entries(tokens.shadows)) {
    lines.push(`  --shadow-${toKebab(name)}: ${value};`);
  }

  lines.push('}');
  return lines.join('\n');
}

function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function formatMissingTokenWarnings(missing: string[]): string {
  if (missing.length === 0) return '';
  const lines = [
    '[Design Tokens] Warning: Missing tokens detected, using defaults:',
    ...missing.map((m) => `  - ${m}`),
  ];
  return lines.join('\n');
}

export { defaultTokens };
export type { DesignTokens, ColorTokens, SpacingTokens, FontSizeTokens, ShadowTokens };
