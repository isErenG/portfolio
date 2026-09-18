<script>
	import globe from '$lib/globe.js?raw';
	import clock from '$lib/clock.js?raw';
	import contact from '$lib/contact.js?raw';
	import posthog from 'posthog-js';
	let { data } = $props();
	const { here, cities } = data;
	const projects = [
		{ name: 'agent-evals', note: 'Regression tests for LLM agents', href: 'https://github.com/' },
		{ name: 'vectordb-bench', note: 'Latency benchmarks across vector stores', href: 'https://github.com/' }
	];
</script>

<svelte:head>
	<title>Eren Korkmaz — software engineer</title>
	<meta name="description" content="AI engineer and independent consultant: backend, infrastructure, AI pipelines and platforms. Go, Python, Rust." />
</svelte:head>

<main>
	<nav class="top muted">
		{#each ['About','Projects','Education','Blog','Contact'] as t}<a href="#{t.toLowerCase()}">{t}</a>{/each}
	</nav>
	<header id="contact">
		<img class="portrait" src="/portrait.jpg" alt="" width="96" height="128" />
		<div>
			<h1>Eren Korkmaz</h1>
			<p class="muted">AI engineer. Backend, infrastructure and AI systems.</p>
			<nav class="muted">
				<a href="https://cal.com/ereng" onclick={() => posthog.capture('book_call_clicked')}>Book a call</a>
				<a id="email" href="mailto:erengkorkmaz@gmail.com" onclick={() => posthog.capture('contact_email_clicked')}>erengkorkmaz@gmail.com</a>
				<a href="https://github.com/isErenG" onclick={() => posthog.capture('professional_profile_opened', { profile_provider: 'github' })}>GitHub</a>
				<a href="https://www.linkedin.com/in/erengk/" onclick={() => posthog.capture('professional_profile_opened', { profile_provider: 'linkedin' })}>LinkedIn</a>
			</nav>
		</div>
	</header>

	<section>
		<p>
			I help teams turn complicated problems into clean, working software: scalable backend
			services, the infrastructure and DevOps lifecycle around them, and AI systems from data
			pipelines and LLM applications to serving them in production. I work independently, as a
			consultant or contractor.
		</p>
	</section>

	<section id="about">
		<h2>About</h2>
		<p>
			My go-to languages are Go, Python, and Rust. I build with the future in mind, choosing
			architecture and scalability for the use case from the start, whether that's a backend
			service, a deployment platform, or model serving with the evals and observability to keep
			it reliable. I do my best work in
			collaborative, cross-cultural teams; they push me to grow technically and personally.
		</p>
	</section>

	<section id="projects">
		<h2>Projects</h2>
		<ul>
			{#each projects as p}
				<li><div><a href={p.href} onclick={() => posthog.capture('project_repository_opened', { project_name: p.name })}>{p.name}</a><span class="muted">{p.note}</span></div></li>
			{/each}
		</ul>
	</section>

	<section id="education">
		<h2>Education</h2>
		<ul>
			<li><div><span>Karel de Grote-Hogeschool</span><span class="muted">BASc Computer Science, cum laude</span></div></li>
		</ul>
	</section>

	<section id="blog">
		<h2>Blog</h2>
		<p class="muted">Nothing published yet.</p>
	</section>

	<footer class="muted">
		<p class="now">Currently in {here}</p>
		<pre class="map" aria-hidden="true">{@html data.map.join('\n').replaceAll('●', '<b>●</b>')}</pre>
		<p>{#each cities as [name, tz], i}{i ? ' · ' : ''}<span class="city" class:here={name === here} data-tz={tz}>{name}</span>{/each}</p>
	</footer>
</main>

<aside aria-hidden="true"><div class="planet"><pre id="globe"></pre><pre id="globe2"></pre></div></aside>
{@html `<script>${globe}${clock}${contact}</script>`}

<style>
	:global(:root) {
		--bg: #fff;
		--fg: #111;
		--muted: #757575;
		--line: #eaeaea;
		--accent: #f0641e;
		color-scheme: light dark;
	}
	@media (prefers-color-scheme: dark) {
		:global(:root) { --bg: #0a0a0a; --fg: #ededed; --muted: #8a8a8a; --line: #222; }
	}
	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--fg);
		font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}
	:global(body) { display: grid; grid-template-columns: minmax(1.25rem, 1fr) minmax(0, 40rem) minmax(1.25rem, 1fr); }
	main { grid-column: 2; min-width: 0; padding: 2rem 0 4rem; }
	.top { margin: 0 0 4rem; font-size: 13px; justify-content: space-between; }
	:global(html) { scroll-behavior: smooth; }
	section, header { scroll-margin-top: 2rem; }
	:global(.wave span) { animation: wave calc(var(--n) * 70ms) linear 3; animation-delay: calc(var(--i) * 70ms); }
	@keyframes -global-wave { 0%, 12% { color: var(--accent); } 13%, 100% { color: inherit; } }
	aside { grid-column: 3; position: sticky; top: 0; align-self: start; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: flex-end; }
	.planet { position: relative; transform: translateX(50%) scaleX(0.8); }
	.planet pre { margin: 0; font: clamp(8px, calc((50vw - 23rem) / 25), 17px)/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--muted); user-select: none; cursor: crosshair; touch-action: none; }
	#globe2 { position: absolute; inset: 0; color: var(--accent); pointer-events: none; }
	@media (max-width: 900px) { aside { display: none; } }
	header { display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 3rem; }
	.portrait { flex: none; width: 96px; height: 128px; object-fit: cover; background: var(--line); border-radius: 2px; }
	nav { display: flex; gap: 1rem; margin-top: 0.75rem; }
	h1 { font-size: 1rem; font-weight: 500; margin: 0; letter-spacing: -0.01em; }
	h2 { font-size: 1rem; font-weight: 500; margin: 0 0 0.75rem; }
	p { margin: 0; }
	section { margin-bottom: 3rem; }
	section + section { border-top: 1px solid var(--line); padding-top: 3rem; }
	ul { list-style: none; margin: 0; padding: 0; }
	li { padding: 0.5rem 0; }
	li div { display: flex; justify-content: space-between; gap: 1rem; }
	li div .muted { text-align: right; white-space: nowrap; }
	a {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: var(--line);
		text-underline-offset: 3px;
		transition: text-decoration-color 150ms ease-out;
	}
	a:hover { text-decoration-color: var(--fg); }
	.muted { color: var(--muted); }
	footer { font-size: 13px; text-align: center; border-top: 1px solid var(--line); padding-top: 3rem; }
	.city { position: relative; cursor: default; }
	.city::after { content: attr(data-time); position: absolute; left: 0; top: -1.4em; color: var(--fg); opacity: 0; transition: opacity 150ms ease-out; pointer-events: none; }
	.city:hover::after { opacity: 1; }
	.here { color: var(--accent); }
	.now { margin: 0 0 1rem; }
	.map { width: fit-content; margin: 0 auto 1.5rem; font: min(11px, calc((100vw - 2.5rem) / 72 / .6))/1.1 ui-monospace, SFMono-Regular, Menlo, monospace; }
	.map :global(b) { color: var(--accent); font-weight: inherit; }
	@media (prefers-reduced-motion: no-preference) {
		.map :global(b) { display: inline-block; animation: pulse 2.4s ease-in-out infinite; }
	}
	@keyframes pulse { 50% { opacity: .6; transform: scale(.85); text-shadow: 0 0 6px var(--accent); } }
	@media (max-width: 480px) {
		/* photo left, name + tagline centred beside it, links full width below */
		header { display: grid; grid-template-columns: 96px 1fr; grid-template-rows: 64px 64px auto; gap: 0 1.25rem; }
		header > div { display: contents; }
		.portrait { grid-row: 1 / 3; }
		h1 { grid-column: 2; align-self: end; }
		header p { grid-column: 2; align-self: start; }
		header nav { grid-column: 1 / -1; flex-direction: column; gap: 0.25rem; margin-top: 1.25rem; }
		.top { flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem; }
		li div { flex-direction: column; gap: 0; }
		li div .muted { text-align: left; white-space: normal; }
	}
</style>
