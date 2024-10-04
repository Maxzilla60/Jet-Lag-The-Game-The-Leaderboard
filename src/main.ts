import { Hole, html } from 'uhtml';
import { hardcodedJetLagSeasons, JetLagSeason } from './data.ts';
import { countBy, entries } from 'lodash';

(async () => {
  renderTables(hardcodedJetLagSeasons);
})();

// ---

function renderTables(seasons: JetLagSeason[]) {
  const seasonsElement = document.getElementById('seasons-table')!;
  const leaderboardElement = document.getElementById('leaderboard-table')!;
  seasonsElement.innerHTML = '';
  seasonsElement.appendChild(createTable(seasons));
  leaderboardElement.innerHTML = '';
  leaderboardElement.appendChild(createLeaderboard(seasons));
}

function createTable(seasons: JetLagSeason[]): Node {
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

function createLeaderboard(seasons: JetLagSeason[]): Node {
  return html`
	  <table>
		  <thead>
		  <tr>
			  <th>Rank</th>
			  <th>Name</th>
			  <th>Wins</th>
		  </tr>
		  </thead>
		  <tbody>
	  ${mapToLeaderboard(seasons).map((season, index) => leaderboardTableRow(index + 1, season))}
		  </tbody>
	  </table>
  `.toDOM();
}

function mapToLeaderboard(seasons: JetLagSeason[]): { name: string, winCount: number }[] {
  const winners = seasons.flatMap(season => season.winners);

  return entries(countBy(winners))
    .map(([name, winCount]) => ({
      name,
      winCount,
    }))
    .sort((a, b) => b.winCount - a.winCount);
}

function leaderboardTableRow(rank: number, winner: { name: string, winCount: number }): Hole {
  return html`
	  <tr>
		  <td>${mapRankToEmoji(rank)}</td>
		  <td>${winner.name}</td>
		  <td>${winner.winCount}</td>
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
