import adapter from '@sveltejs/adapter-cloudflare';

export default { kit: { adapter: adapter(), inlineStyleThreshold: 16384 } };
