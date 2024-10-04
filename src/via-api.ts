import { flattenDeep } from 'lodash';

export interface ApiJetLagSeason {
  seasonNumber: number;
  seasonName: string;
  winners: string[];
}

export async function fetchSeasonsData(): Promise<ApiJetLagSeason[]> {
  const allTablesFromWikiPage: string[][][] = await fetch('https://www.wikitable2json.com/api/Jet_Lag:_The_Game')
    .then(response => response.json());

  const seasonsTable: string[][] | undefined = findSeasonsTable(allTablesFromWikiPage);

  if (!seasonsTable) {
    throw new Error('Couldn\'t find seasons table');
  }

  const headers = findHeaders(seasonsTable);

  return seasonsTable!
    .filter(row => !flattenDeep(row).some(cell => cell.includes('Title'))) // Filter out headers
    .filter(row => !flattenDeep(row).some(cell => cell.includes('TBA'))) // Filter out unfinished seasons
    .map(row => mapRow(row, headers));
}

// ---

function findSeasonsTable(tables: string[][][]) {
  return tables.find(table => {
    const flattened = flattenDeep(table);
    return flattened.some(cell => cell.includes('Winner'));
  });
}

function findHeaders(seasonsTable: string[][]): { headerCell: string, index: number }[] {
  const headerRow = seasonsTable[0];

  if (!headerRow) {
    throw new Error('Couldn\'t find header row');
  }

  const headers = headerRow
    .map((headerCell, index) => ({
      headerCell,
      index,
    }))
    .filter(({ headerCell }) => {
      return headerCell.includes('Season')
        || headerCell.includes('Title')
        || headerCell.includes('Winner');
    });

  if (headers.length !== 3) {
    throw new Error('Couldn\'t retrieve "Season", "Title", and "Winner" header cells');
  }

  return headers;
}

function mapRow(row: string[], headers: { headerCell: string; index: number }[]): ApiJetLagSeason {
  return {
    seasonNumber: Number(getColumnIndexForHeader(row, headers, 'Season')),
    seasonName: getColumnIndexForHeader(row, headers, 'Title'),
    winners: getColumnIndexForHeader(row, headers, 'Winner').split(' & '),
  };
}

function getColumnIndexForHeader(
  row: string[],
  headers: {
    headerCell: string;
    index: number
  }[],
  headerTitle: string,
): string {
  const header = headers.find(({ headerCell }) => headerCell.includes(headerTitle))!;

  if (row.length <= header.index) {
    throw new Error('Couldn\'t find cell for given header index');
  }

  return row[header.index];
}
