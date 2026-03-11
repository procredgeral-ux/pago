interface LogEntry {
  timestamp: string;
  level: 'log' | 'error' | 'warn' | 'info';
  message: string;
}

let logs: LogEntry[] = [];
let originalConsole: {
  log: typeof console.log;
  error: typeof console.error;
  warn: typeof console.warn;
  info: typeof console.info;
} | null = null;
let flushInterval: NodeJS.Timeout | null = null;

async function sendLogsToServer(entries: LogEntry[]): Promise<void> {
  try {
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entries),
    });
  } catch (error) {
    originalConsole?.error('Erro ao enviar logs:', error);
  }
}

function formatArgs(args: unknown[]): string {
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

export async function initializeLogs(): Promise<void> {
  try {
    await fetch('/api/logs', { method: 'DELETE' });
    logs = [];
  } catch (error) {
    console.error('Erro ao inicializar logs:', error);
  }
}

export function captureConsole(): void {
  if (originalConsole) return;

  originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  };

  const queue: LogEntry[] = [];

  const flush = async (): Promise<void> => {
    if (queue.length === 0) return;
    const batch = queue.splice(0, queue.length);
    await sendLogsToServer(batch);
  };

  flushInterval = setInterval(flush, 1000);

  const createLogEntry = (level: LogEntry['level'], args: unknown[]): LogEntry => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: formatArgs(args),
    };
    queue.push(entry);
    logs.push(entry);
    return entry;
  };

  console.log = (...args: unknown[]) => {
    createLogEntry('log', args);
    originalConsole!.log(...args);
  };

  console.error = (...args: unknown[]) => {
    createLogEntry('error', args);
    originalConsole!.error(...args);
  };

  console.warn = (...args: unknown[]) => {
    createLogEntry('warn', args);
    originalConsole!.warn(...args);
  };

  console.info = (...args: unknown[]) => {
    createLogEntry('info', args);
    originalConsole!.info(...args);
  };

  window.addEventListener('beforeunload', () => {
    if (flushInterval) clearInterval(flushInterval);
    void flush();
  });
}

export function restoreConsole(): void {
  if (!originalConsole) return;

  if (flushInterval) {
    clearInterval(flushInterval);
    flushInterval = null;
  }

  console.log = originalConsole.log;
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
  console.info = originalConsole.info;

  originalConsole = null;
}

export function getLogs(): LogEntry[] {
  return [...logs];
}

export async function fetchLogs(): Promise<string[]> {
  try {
    const response = await fetch('/api/logs');
    const data = await response.json() as { logs: string[] };
    return data.logs;
  } catch {
    return [];
  }
}
