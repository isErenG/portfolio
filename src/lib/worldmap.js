// Build-time ASCII Mercator map from Natural Earth (world-atlas). Runs during prerender only.
import world from 'world-atlas/countries-110m.json' with { type: 'json' };
import { feature } from 'topojson-client';
import { geoContains, geoCentroid } from 'd3-geo';

const W = 72, H = 26, N = 80, S = -58;
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const unmerc = (y) => (Math.atan(Math.sinh(y)) * 180) / Math.PI;

export function worldMap(country) {
	const all = feature(world, world.objects.countries).features;
	const home = all.find((f) => f.properties.name === country);
	if (!home) throw new Error(`worldMap: unknown country "${country}"`);
	const [top, bot] = [merc(N), merc(S)];
	const grid = [];
	let hit = false;
	for (let r = 0; r < H; r++) {
		const lat = unmerc(top - ((r + 0.5) / H) * (top - bot));
		const row = [];
		for (let c = 0; c < W; c++) {
			const p = [-180 + ((c + 0.5) / W) * 360, lat];
			const h = geoContains(home, p);
			hit ||= h;
			row.push(h ? 2 : all.some((f) => geoContains(f, p)) ? 1 : 0);
		}
		grid.push(row);
	}
	// small countries fall between cell centres: mark the centroid's cell instead
	if (!hit) {
		const [lon, lat] = geoCentroid(home);
		const r = Math.floor(((top - merc(lat)) / (top - bot)) * H);
		grid[r][Math.floor(((lon + 180) / 360) * W)] = 2;
	}
	return grid.map((row) => row.map((v) => ' ·●'[v]).join(''));
}
