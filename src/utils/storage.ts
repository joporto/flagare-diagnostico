import type { DiagnosticSession } from '../types';

const STORAGE_KEY = 'flagare_diagnostics';

export function saveDiagnostic(session: DiagnosticSession): void {
  const existing = loadDiagnostics();
  existing.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function loadDiagnostics(): DiagnosticSession[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function exportDiagnosticsJSON(): string {
  return JSON.stringify(loadDiagnostics(), null, 2);
}

export function generateId(): string {
  return `diag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
