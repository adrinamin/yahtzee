# Yahtzee

This digital yahtzee game is my personal side project. It is work in progress and not intended for production use in any way.

## Building

To create a production version of your app:

```bash
npm run build
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## When using neovim

When using neovim for development, you need to install the svelte and tailwindcss lsp with your neovim lsp manager.
You should also have the svelte-language-server installed on your machine.
More infos here:

- https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#svelte
- https://github.com/sveltejs/language-tools/tree/master/packages/typescript-plugin#usage
