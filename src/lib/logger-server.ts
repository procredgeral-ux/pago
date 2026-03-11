import { promises as fs } from 'fs';
import path from 'path';

const LOGS_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOGS_DIR, 'log.txt');

let initialized = false;

async function ensureInitialized(): Promise<void> {
  if (initialized) return;
  await fs.mkdir(LOGS_DIR, { recursive: true });
  initialized = true;
}

export interface LogEntry {
  timestamp: string;
  level: 'log' | 'error' | 'warn' | 'info';
  message: string;
}

export async function initializeLogs(): Promise<void> {
  try {
    await ensureInitialized();
    await fs.writeFile(LOG_FILE, '', 'utf-8');
  } catch (error) {
    console.error('Erro ao inicializar logs:', error);
  }
}

export async function clearLogs(): Promise<void> {
  try {
    await ensureInitialized();
    await fs.writeFile(LOG_FILE, '', 'utf-8');
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
  }
}

export async function appendLog(entry: LogEntry): Promise<void> {
  try {
    await ensureInitialized();
    const logLine = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}\n`;
    await fs.appendFile(LOG_FILE, logLine, 'utf-8');
  } catch (error) {
    console.error('Erro ao escrever log no arquivo:', error);
  }
}

export async function getLogFileContent(): Promise<string> {
  try {
    await ensureInitialized();
    return await fs.readFile(LOG_FILE, 'utf-8');
  } catch {
    return '';
  }
}

export async function getAllLogs(): Promise<string[]> {
  try {
    const content = await getLogFileContent();
    return content.split('\n').filter(line => line.trim() !== '');
  } catch {
    return [];
  }
}
