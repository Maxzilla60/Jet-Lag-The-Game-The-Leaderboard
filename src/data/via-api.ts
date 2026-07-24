import { values, chain, isNil, isEmpty } from 'lodash';
import { JetLagSeason, MAIN_PLAYERS } from '../shared.ts';

type WikiTableRow = {
	Season: string;
	Title: string;
	'Guest(s)': string;
	'Winner(s)': string;
}

export async function fetchSeasonsData(): Promise<JetLagSeason[]> {
	const wikiTable: WikiTableRow[] = await fetch('https://www.wikitable2json.com/api/Jet_Lag:_The_Game' +
		'?table=0' +
		'&keyRows=2' +
		'&brNewLine=true',
	)
		.then(response => response.json())
		.then(json => {
			if (isNil(json) || isEmpty(json)) {
				return undefined;
			}
			return json[0];
		});

	if (isNil(wikiTable)) {
		throw new Error('Couldn\'t find seasons table');
	}

	return chain(wikiTable)
		.filter(rowIsNotTBA) // Filter out unfinished seasons
		.map(mapToJetLagSeason)
		.sortBy('seasonNumber')
		.value();
}

function rowIsNotTBA(row: WikiTableRow): boolean {
	return !values(row)
		.some(cell => cell.includes('TBA'));
}

function mapToJetLagSeason(row: WikiTableRow): JetLagSeason {
	return {
		seasonNumber: Number(row.Season),
		seasonName: row.Title.replace(/\[[a-z]]$/g, ''),
		winners: parseGuests(row['Winner(s)']),
		players: [...MAIN_PLAYERS, ...parseGuests(row['Guest(s)'])],
	};
}

function parseGuests(guests: string): string[] {
	if (guests === '—') {
		return [];
	}

	return guests
		.split(/, & | & |, |\n& |\n/)
		.map(name => name.replace(/\s+/g, ' ')) // Replace U+00A0 with regular whitespace
		.map(name => name.trim())
}
