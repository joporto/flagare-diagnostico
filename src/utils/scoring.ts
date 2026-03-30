import { CARDS } from '../data/cards';
import { FINDINGS_MAP, MATURITY_LEVELS } from '../data/constants';
import type { ScoredCard, Finding, MaturityLevel } from '../types';

export function calculateOverallScore(maturity: { dataQuality: number; teamReadiness: number; infrastructure: number; strategy: number }): number {
  const d = maturity.dataQuality * 20;
  const t = maturity.teamReadiness * 20;
  const i = maturity.infrastructure * 20;
  const s = maturity.strategy * 20;
  return Math.round((d + t + i + s) / 4);
}

export function getDimensions(maturity: { dataQuality: number; teamReadiness: number; infrastructure: number; strategy: number }) {
  return [
    { label: 'Datos', value: maturity.dataQuality * 20, color: 'var(--o)' },
    { label: 'Equipo', value: maturity.teamReadiness * 20, color: 'var(--cy)' },
    { label: 'Infraestructura', value: maturity.infrastructure * 20, color: 'var(--pu)' },
    { label: 'Estrategia', value: maturity.strategy * 20, color: 'var(--g)' },
  ];
}

export function getMaturityLevel(score: number): MaturityLevel {
  return MATURITY_LEVELS.find(l => score <= l.max) || MATURITY_LEVELS[4];
}

export function getFindings(challenges: string[]): Finding[] {
  const finds = challenges.slice(0, 5).map(p => FINDINGS_MAP[p]).filter(Boolean);
  if (finds.length === 0) {
    finds.push({ i: '🎯', t: 'Oportunidad de mejora', d: 'Tu empresa tiene múltiples áreas donde la IA puede generar valor. Recomendamos empezar por quick wins de alto impacto.' });
  }
  return finds;
}

export function getScoredCards(challenges: string[], priorities: string[], industry: string): ScoredCard[] {
  const allTags = [...challenges, ...priorities];
  return CARDS.map(card => {
    let rel = 0;
    card.tg.forEach(tag => { if (allTags.includes(tag)) rel += 2; });
    if (card.ind.includes(industry)) rel += 3;
    rel += 1;
    return { ...card, rel };
  }).filter(c => c.rel > 1).sort((a, b) => b.rel - a.rel).slice(0, 15);
}

export function groupCardsByCategory(cards: ScoredCard[]): Record<string, { cc: string; items: ScoredCard[] }> {
  const grp: Record<string, { cc: string; items: ScoredCard[] }> = {};
  cards.forEach(c => {
    if (!grp[c.cat]) grp[c.cat] = { cc: c.cc, items: [] };
    grp[c.cat].items.push(c);
  });
  return grp;
}
