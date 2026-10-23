/**
 * Baixa o OpenAPI público e grava a cópia versionada usada no build.
 * O build não acessa a rede: ele lê openapi/openapi.json.
 *
 * Se o endpoint não responder, o script termina com erro e não substitui
 * o arquivo existente. Ele não inventa um contrato.
 */
const source = 'https://api.memocart.link/openapi.json';
const destination = new URL('../openapi/openapi.json', import.meta.url);

const response = await fetch(source);
if (!response.ok) {
	console.error(`Não foi possível baixar ${source}: HTTP ${response.status}.`);
	console.error('O build continua usando openapi/openapi.json, se o arquivo já existir.');
	process.exit(1);
}

const body = await response.text();
let document: unknown;
try {
	document = JSON.parse(body);
} catch {
	console.error(`A resposta de ${source} não é JSON.`);
	process.exit(1);
}

if (
	typeof document !== 'object' ||
	document === null ||
	!('openapi' in document) ||
	!('paths' in document)
) {
	console.error(`A resposta de ${source} não parece um documento OpenAPI.`);
	process.exit(1);
}

await Bun.write(destination, `${JSON.stringify(document, null, 2)}\n`);
console.log('OpenAPI salvo em openapi/openapi.json');
