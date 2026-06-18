import type { Plugin, ResolvedConfig } from 'vite';
import path from 'node:path';
import type { DesignTokens } from './src/tokens/utils';
import { mergeWithDefaults, generateCssVariables, formatMissingTokenWarnings } from './src/tokens/utils';

const VIRTUAL_MODULE_ID = 'virtual:tokens.css';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

export interface TokensPluginOptions {
  tokens?: Partial<DesignTokens>;
}

export default function tokensPlugin(options: TokensPluginOptions = {}): Plugin {
  let viteConfig: ResolvedConfig;
  let cssContent: string;
  let missingTokens: string[] = [];

  const buildTokens = (opts: TokensPluginOptions) => {
    const { missing, merged } = mergeWithDefaults(opts.tokens);
    missingTokens = missing;
    cssContent = generateCssVariables(merged);
  };

  return {
    name: 'vite-plugin-design-tokens',

    configResolved(config) {
      viteConfig = config;
    },

    buildStart() {
      buildTokens(options);

      if (missingTokens.length > 0) {
        this.warn(formatMissingTokenWarnings(missingTokens));
      }

      if (viteConfig.command === 'build') {
        console.log('\n[Design Tokens] Generated CSS variables:');
        console.log(cssContent);
        if (missingTokens.length > 0) {
          console.warn('\n' + formatMissingTokenWarnings(missingTokens));
        }
      }
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return cssContent;
      }
    },

    configureServer(server) {
      const configPath = path.resolve(process.cwd(), 'tokens.config.ts');
      server.watcher.add(configPath);
      server.watcher.on('change', (file) => {
        if (file.endsWith('tokens.config.ts')) {
          buildTokens(options);

          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({
              type: 'full-reload',
            });
          }

          if (missingTokens.length > 0) {
            console.warn('\n' + formatMissingTokenWarnings(missingTokens));
          }
          console.log('\n[Design Tokens] Tokens updated, reloading...');
        }
      });
    },
  };
}
