interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: false }
  ): Record<string, () => Promise<{ default: T }>>;

  glob<T = unknown>(
    pattern: string,
    options: { eager: true }
  ): Record<string, { default: T }>;

  globEager<T = unknown>(
    pattern: string,
    options?: { eager?: boolean }
  ): Record<string, { default: T }>;

  readonly env: {
    DEV: boolean;
    PROD: boolean;
    [key: string]: string | boolean | undefined;
  };
}
