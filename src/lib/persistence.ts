import { z, type ZodType } from "zod";

export function validateAndLoad<T>(key: string, schema: ZodType<T>): T | null {
  const raw = localStorage.getItem(key);
  if (raw === null) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.warn("invalid JSON, the localStorage is Reset");
    localStorage.removeItem(key);
    return null;
  }

  const result = schema.safeParse(parsed);
  if (result.success) {
    return result.data;
  } else {
    console.warn(z.prettifyError(result.error));
    localStorage.removeItem(key);
    return null;
  }
}
