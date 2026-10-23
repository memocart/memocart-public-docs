import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	// Registrada para o Starlight. Os JSON em src/content/i18n/ ficam vazios:
	// a interface já usa as traduções padrão de pt-BR e en.
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
