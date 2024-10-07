import { Hole, html } from 'uhtml';
import { hardcodedJetLagSeasons } from './hardcoded.ts';
import { uniq } from 'lodash';
import { fetchSeasonsData } from './via-api.ts';
import { JetLagSeason } from './shared.ts';

(async () => {
  renderTables(hardcodedJetLagSeasons);

  try {
    const apiJetLagSeasons = await fetchSeasonsData();
    renderTables(apiJetLagSeasons);
    setDataInfo(html`
		Data fetched from the
		<a href="https://en.wikipedia.org/wiki/Jet_Lag:_The_Game#Seasons" target="_blank" rel="noreferrer noopener">Wikipedia page</a>
    `);
  } catch (e) {
    renderTables(hardcodedJetLagSeasons);
    setDataInfo(html`
		Fetching data from the
		<a href="https://en.wikipedia.org/wiki/Jet_Lag:_The_Game#Seasons" target="_blank" rel="noreferrer noopener">Wikipedia page</a>
		failed, fallback on hardcoded (possibly outdated) data
    `);
  }
})();

// ---

function setDataInfo(content: Hole): void {
  const dataInfoElement = document.getElementById('data-info')!;
  dataInfoElement.innerHTML = '';
  dataInfoElement.appendChild(content.toDOM());
}

function renderTables(seasons: JetLagSeason[]) {
  const leaderboardElement = document.getElementById('leaderboard-table')!;
  leaderboardElement.innerHTML = '';
  leaderboardElement.appendChild(createLeaderboardTable(seasons));

  const seasonsElement = document.getElementById('seasons-table')!;
  seasonsElement.innerHTML = '';
  seasonsElement.appendChild(createSeasonsTable(seasons));
}

function createLeaderboardTable(seasons: JetLagSeason[]): Node {
  return html`
	  <table>
		  <thead>
		  <tr>
			  <th>Rank</th>
			  <th>Name</th>
		  <th>Seasons Won / Seasons Played</th>
		  </tr>
		  </thead>
		  <tbody>
	  ${mapToLeaderboard(seasons).map((season, index) => leaderboardTableRow(index + 1, season))}
		  </tbody>
	  </table>
  `.toDOM();
}

function mapToLeaderboard(seasons: JetLagSeason[]): { name: string, seasonsWon: number, seasonsPlayed: number }[] {
  const players = uniq(seasons.flatMap(season => season.players));

  return players.map(name => {
    const seasonsPlayed = seasons
      .filter(season => season.players.includes(name))
      .length;
    const seasonsWon = seasons
      .filter(season => season.winners.includes(name))
      .length;
    return { name, seasonsWon, seasonsPlayed };
  })
    .sort((a, b) => (b.seasonsWon / b.seasonsPlayed) - (a.seasonsWon / a.seasonsPlayed));
}

function leaderboardTableRow(rank: number, winner: {
  name: string,
  seasonsWon: number,
  seasonsPlayed: number
}): Hole {
  return html`
	  <tr>
		  <td>${mapRankToEmoji(rank)}</td>
		  <td>${winner.name}</td>
		<td>${winner.seasonsWon} / ${winner.seasonsPlayed}</td>
	  </tr>
  `;
}

function createSeasonsTable(seasons: JetLagSeason[]): Node {
  return html`
	  <table>
		  <thead>
		  <tr>
			  <th>Season</th>
			  <th>Title</th>
			  <th>Winners</th>
		  </tr>
		  </thead>

		  <tbody>
		  ${seasons.map((season, index) => seasonTableRow(index + 1, season))}
		  </tbody>
	  </table>
  `.toDOM();
}

function seasonTableRow(seasonNumber: number, season: JetLagSeason): Hole {
  return html`
	  <tr>
		  <td>${seasonNumber}</td>
		  <td>${season.seasonName}</td>
		  <td>${season.winners.join(' & ')}</td>
	  </tr>
  `;
}

function mapRankToEmoji(rank: number): Hole | string {
  const rankString = '#' + rank;
  switch (rank) {
    case 1:
      return html`<span title=${rankString}>🥇</span>`;
    case 2:
      return html`<span title=${rankString}>🥈</span>`;
    case 3:
      return html`<span title=${rankString}>🥉</span>`;
    default:
      return rankString;
  }
}
