import { JetLagSeason, mapRankToEmoji } from '../shared.ts';
import { Hole, html } from 'uhtml';
import { uniq } from 'lodash';

type LeaderBoardPlayer = {
  name: string,
  seasonsWon: number,
  soloSeasonsWon: number,
  seasonsPlayed: number
};

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
			  <th>Wins / Played</th>
			  <th>Solo Wins</th>
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

  return players
    .map(name => ({
      name,
      seasonsWon: seasons
        .filter(season => season.winners.includes(name))
        .length,
      seasonsPlayed: seasons
        .filter(season => season.players.includes(name))
        .length,
      soloSeasonsWon: seasons
        .filter(season => season.winners.includes(name) && season.winners.length === 1)
        .length,
    }))
    .sort((a, b) => {
      // Sort by seasonsWon / seasonsPlayed
      const ratioSort = (b.seasonsWon / b.seasonsPlayed) - (a.seasonsWon / a.seasonsPlayed);
      if (ratioSort !== 0) {
        return ratioSort;
      }

      // If tied, sort by seasonsWon
      if (b.seasonsWon !== a.seasonsWon) {
        return b.seasonsWon - a.seasonsWon;
      }

      // If still tied, sort by soloSeasonsWon
      return b.soloSeasonsWon - a.soloSeasonsWon;
    });
}

function leaderboardTableRow(rank: number, winner: LeaderBoardPlayer): Hole {
  return html`
	  <tr>
		  <td>${mapRankToEmoji(rank)}</td>
		  <td>${winner.name}</td>
		  <td>${winner.seasonsWon} / ${winner.seasonsPlayed}</td>
		  <td>${winner.soloSeasonsWon}</td>
	  </tr>
  `;
}
