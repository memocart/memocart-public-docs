// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.memocart.link',
	integrations: [
		starlight({
			title: 'MemoCart',
			description: 'Crie, adicione e compartilhe produtos.',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Português',
					lang: 'pt-BR',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			customCss: ['./src/styles/custom.css'],
			components: {
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			expressiveCode: {
				themes: ['github-dark'],
			},
			sidebar: [
				{
					label: 'Começando',
					translations: {
						en: 'Getting started',
					},
					slug: 'getting-started',
				},
				...openAPISidebarGroups,
			],
			plugins: [
				starlightOpenAPI([
					{
						base: 'api',
						schema: 'openapi/openapi.json',
						sidebar: {
							label: 'API Reference',
							collapsed: false,
							operations: {
								badges: true,
								labels: 'summary',
								sort: 'document',
							},
						},
					},
				]),
			],
		}),
	],
});
