import { Hole, html } from 'uhtml';
import { JetLagSeason } from '../shared.ts';

export function renderSeasonsTable(seasons: JetLagSeason[]) {
	const seasonsElement = document.getElementById('seasons-table')!;
	seasonsElement.innerHTML = '';
	seasonsElement.appendChild(createSeasonsTable(seasons));
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
