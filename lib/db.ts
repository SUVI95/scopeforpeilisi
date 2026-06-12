import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import type { DiscoveryAnswerRow, DiscoverySessionRow } from "@/lib/discovery-format";

let sql: NeonQueryFunction<false, false> | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!sql) sql = neon(url);
  return sql;
}

export type { DiscoveryAnswerRow, DiscoverySessionRow };
