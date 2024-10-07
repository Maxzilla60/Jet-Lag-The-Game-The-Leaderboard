import { JetLagSeason, mapRankToEmoji } from '../shared.ts';
import { Hole, html } from 'uhtml';
import { uniq } from 'lodash';

type LeaderBoardPlayer = { name: string, seasonsWon: number, seasonsPlayed: number };

export function renderLeaderBoardTable(seasons: JetLagSeason[]) {
  const leaderboardElement = document.getElementById('leaderboard-table')!;
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
			  <th>Seasons Won / Seasons Played</th>
		  </tr>
		  </thead>
		  <tbody>
		  ${mapToLeaderboard(seasons).map((season, index) => leaderboardTableRow(index + 1, season))}
		  </tbody>
	  </table>
  `.toDOM();
}

function mapToLeaderboard(seasons: JetLagSeason[]): LeaderBoardPlayer[] {
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

function leaderboardTableRow(rank: number, winner: LeaderBoardPlayer): Hole {
  return html`
	  <tr>
		  <td>${mapRankToEmoji(rank)}</td>
		  <td>${winner.name}</td>
		  <td>${winner.seasonsWon} / ${winner.seasonsPlayed}</td>
	  </tr>
  `;
}
