import { JetLagSeason, mapRankToEmoji } from '../shared.ts';
import { Hole, html } from 'uhtml';
import { uniq } from 'lodash';

type SimpleLeaderBoardPlayer = {
  name: string,
  seasonsWon: number,
};

export function renderSimpleLeaderBoardTable(seasons: JetLagSeason[]) {
  const leaderboardElement = document.getElementById('simple-leaderboard-table')!;
  leaderboardElement.innerHTML = '';
  leaderboardElement.appendChild(createLeaderboardTable(seasons));
}

function createLeaderboardTable(seasons: JetLagSeason[]): Node {
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

function mapToLeaderboard(seasons: JetLagSeason[]): SimpleLeaderBoardPlayer[] {
  const players = uniq(seasons.flatMap(season => season.players));

  return players
    .map(name => ({
      name,
      seasonsWon: seasons
        .filter(season => season.winners.includes(name))
        .length,
    }))
    .sort((a, b) => b.seasonsWon - a.seasonsWon);
}

function leaderboardTableRow(rank: number, winner: SimpleLeaderBoardPlayer): Hole {
  return html`
	  <tr>
		  <td>${mapRankToEmoji(rank)}</td>
		  <td>${winner.name}</td>
		  <td>${winner.seasonsWon}</td>
	  </tr>
  `;
}
