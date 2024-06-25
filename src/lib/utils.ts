export type ServerFetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>;
