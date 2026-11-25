import { createClient } from "microcms-js-sdk";
import { cacheLife } from "next/cache";

export type Game = {
  id: string;
  name: string;
  summary: string;
  players: number;
  players2: number;
  time: number;
  rules?: string;
};

const ENDPOINT = "tramp_rule";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export async function getGames(): Promise<Game[]> {
  "use cache";
  cacheLife("minutes");
  const data = await client.getList<Game>({ endpoint: ENDPOINT });
  return data.contents;
}