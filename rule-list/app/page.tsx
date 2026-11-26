import Link from "next/link";
import { getGames } from "@/libs/microcms";
import styles from "./page.module.css";

export default async function Page() {
  const games = await getGames();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Rule List</h1>
      <p className={styles.lead}>
        トランプゲームのルールをざっくりまとめて載せたサイトです。
        <br />
        目安時間はあくまで<strong>目安</strong>のため、プレイ人数やプレイヤーの技量次第で変わります。
      </p>

      <ul className={styles.list}>
        {games.map((game) => (
          <li key={game.id}>
            <Link href={`/games/${game.id}`} className={styles.card}>
              <h2 className={styles.name}>{game.name}</h2>
              <p className={styles.summary}>{game.summary}</p>
              <p className={styles.meta}>
                最小: {game.players}人<br></br>
                最大: {game.players2}人<br></br>
                約{game.time}分<br></br>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}