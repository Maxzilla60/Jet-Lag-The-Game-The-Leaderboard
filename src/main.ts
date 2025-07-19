import { Hole, html } from 'uhtml';
import { hardcodedJetLagSeasons } from './data/hardcoded.ts';
import { fetchSeasonsData } from './data/via-api.ts';
import { renderLeaderBoardTable } from './render/leaderboard-table.ts';
import { renderSeasonsTable } from './render/seasons-table.ts';
import { renderSimpleLeaderBoardTable } from './render/simple-leaderboard-table.ts';
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
			⚠️ Fetching data from the
			<a href="https://en.wikipedia.org/wiki/Jet_Lag:_The_Game#Seasons" target="_blank" rel="noreferrer noopener">Wikipedia page</a>
			failed, fallback on hardcoded (possibly outdated) data
		`);
	}
})();

// ---

function renderTables(seasons: JetLagSeason[]) {
	renderLeaderBoardTable(seasons);
	renderSimpleLeaderBoardTable(seasons);
	renderSeasonsTable(seasons);
}

function setDataInfo(content: Hole): void {
	const dataInfoElement = document.getElementById('data-info')!;
	dataInfoElement.innerHTML = '';
	dataInfoElement.appendChild(content.toDOM());
}
