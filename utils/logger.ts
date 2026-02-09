/**
 * Logger — used by tests (association); tests "use" it, don't own its lifecycle.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private readonly prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private format(level: LogLevel, message: string, ...args: unknown[]): string {
    const ts = new Date().toISOString();
    const base = `[${ts}] [${level.toUpperCase()}] ${this.prefix ? `[${this.prefix}] ` : ''}${message}`;
    return args.length ? `${base} ${args.map((a) => JSON.stringify(a)).join(' ')}` : base;
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug(this.format('debug', message, ...args));
  }

  info(message: string, ...args: unknown[]): void {
    console.info(this.format('info', message, ...args));
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(this.format('warn', message, ...args));
  }

  error(message: string, ...args: unknown[]): void {
    console.error(this.format('error', message, ...args));
  }

  child(name: string): Logger {
    const subPrefix = this.prefix ? `${this.prefix}.${name}` : name;
    return new Logger(subPrefix);
  }
}

let defaultLogger: Logger | null = null;

export function getLogger(prefix?: string): Logger {
  if (!defaultLogger) defaultLogger = new Logger(prefix ?? 'App');
  return prefix ? defaultLogger.child(prefix) : defaultLogger;
}
