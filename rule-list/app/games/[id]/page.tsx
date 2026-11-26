import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGame, type Game } from "@/libs/microcms";
import styles from "./page.module.css";

async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let game: Game;
  try {
    game = await getGame(id);
  } catch {
    notFound();
  }

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.back}>
        ← 一覧へ戻る
      </Link>

      <h1 className={styles.title}>{game.name}</h1>

      <ul className={styles.info}>
        <li className={styles.badge}>
          人数: {game.players}〜{game.players2}人
        </li>
        <li className={styles.badge}>目安時間: 約{game.time}分</li>
      </ul>

      {game.rules && (
        <div
          className={styles.rules}
          dangerouslySetInnerHTML={{ __html: game.rules }}
        />
      )}
    </main>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className={styles.loading}>読み込み中...</p>}>
      <Detail params={params} />
    </Suspense>
  );
}