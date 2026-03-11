const { promises: fs } = require('fs');
const path = require('path');

const LOGS_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOGS_DIR, 'log.txt');

let initialized = false;
let originalConsole = null;

async function ensureInitialized() {
  if (initialized) return;
  try {
    await fs.mkdir(LOGS_DIR, { recursive: true });
    initialized = true;
  } catch (error) {
    console.error('Erro ao criar diretório de logs:', error);
  }
}

async function appendLog(level, message) {
  try {
    await ensureInitialized();
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    await fs.appendFile(LOG_FILE, logLine, 'utf-8');
  } catch (error) {
    // Silenciosamente falha para evitar loop
  }
}

function formatArgs(args) {
  return args
    .map((arg) => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    })
    .join(' ');
}

function captureServerConsole() {
  if (originalConsole) return;

  originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  };

  console.log = (...args) => {
    const message = formatArgs(args);
    void appendLog('log', message);
    originalConsole.log(...args);
  };

  console.error = (...args) => {
    const message = formatArgs(args);
    void appendLog('error', message);
    originalConsole.error(...args);
  };

  console.warn = (...args) => {
    const message = formatArgs(args);
    void appendLog('warn', message);
    originalConsole.warn(...args);
  };

  console.info = (...args) => {
    const message = formatArgs(args);
    void appendLog('info', message);
    originalConsole.info(...args);
  };
}

async function clearLogs() {
  try {
    await ensureInitialized();
    await fs.writeFile(LOG_FILE, '', 'utf-8');
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
  }
}

module.exports = {
  captureServerConsole,
  clearLogs,
  appendLog,
};
