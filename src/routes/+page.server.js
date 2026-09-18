import { worldMap } from '$lib/worldmap.js';

// Where I am now: its city turns orange in the footer and its country is marked on the map.
const here = 'Antwerp';
const cities = [['Antwerp', 'Europe/Brussels', 'Belgium'], ['Istanbul', 'Europe/Istanbul', 'Turkey'], ['New York City', 'America/New_York', 'United States of America'], ['London', 'Europe/London', 'United Kingdom']];

export const load = () => ({ here, cities, map: worldMap(cities.find(([n]) => n === here)[2]) });
