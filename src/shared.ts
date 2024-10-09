import { Hole, html } from 'uhtml';

export const MAIN_PLAYERS: string[] = ['Sam Denby', 'Adam Chase', 'Ben Doyle'] as const;

export interface JetLagSeason {
  seasonNumber: number;
  seasonName: string;
  players: string[];
  winners: string[];
}

export function renderPlayerName(name: string): Hole {
  return MAIN_PLAYERS.includes(name) ? html`<span class="main-player">${name}</span>` : html`${name}`;
}

export function mapRankToEmoji(rank: number): Hole | string {
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
