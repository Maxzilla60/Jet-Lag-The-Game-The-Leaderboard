import { values } from 'lodash';
import { JetLagSeason } from './shared.ts';

interface TableRow {
  Season: string;
  Title: string;
  'Winner(s)': string;
}

export async function fetchSeasonsData(): Promise<JetLagSeason[]> {
  const seasonsTable: TableRow[] = await fetch('https://www.wikitable2json.com/api/Jet_Lag:_The_Game?table=1&keyRows=2')
    .then(response => response.json())
    .then(json => {
      if (!json || json.length === 0) {
        return undefined;
      }
      return json[0];
    });

  if (!seasonsTable) {
    throw new Error('Couldn\'t find seasons table');
  }

  return seasonsTable!
    .filter(row => !values(row).some(cell => cell.includes('TBA'))) // Filter out unfinished seasons
    .map(row => ({
      seasonNumber: Number(row.Season),
      seasonName: row.Title,
      winners: row['Winner(s)'].split(' & '),
    }))
    .sort((a, b) => a.seasonNumber - b.seasonNumber);
}
