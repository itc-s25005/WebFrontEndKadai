import Link from "next/link";
import { getGames } from "@/libs/microcms";
import styles from "./page.module.css";

export default async function Page() {
  const games = await getGames();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Rule List</h1>
      <p className={styles.lead}>
        トランプゲームのルールを載せたサイトです。
        <br />
        目安時間はあくまで目安のため、プレイ人数やプレイヤーの技量次第で変わります。
      </p>

      <ul className={styles.list}>
        {games.map((game) => (
          <li key={game.id}>
            <Link href={`/games/${game.id}`} className={styles.card}>
              <h2 className={styles.name}>{game.name}</h2>
              <p className={styles.summary}>{game.summary}</p>
              <p className={styles.meta}>
                目安人数: {game.players}<br></br>
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