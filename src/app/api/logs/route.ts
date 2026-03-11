import { NextRequest, NextResponse } from 'next/server';
import { initializeLogs, appendLog, getLogFileContent, clearLogs, LogEntry } from '@/lib/logger-server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as LogEntry | LogEntry[];
    
    if (Array.isArray(body)) {
      for (const entry of body) {
        await appendLog(entry);
      }
    } else {
      await appendLog(body);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar log:', error);
    return NextResponse.json({ error: 'Erro ao processar log' }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const content = await getLogFileContent();
    const logs = content.split('\n').filter(line => line.trim() !== '');
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Erro ao ler logs:', error);
    return NextResponse.json({ error: 'Erro ao ler logs' }, { status: 500 });
  }
}

export async function DELETE(): Promise<NextResponse> {
  try {
    await clearLogs();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
    return NextResponse.json({ error: 'Erro ao limpar logs' }, { status: 500 });
  }
}
