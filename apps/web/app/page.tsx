import Link from "next/link";
import styles from "./page.module.css";

// Accueil provisoire (Sprint 1) : vérifie le thème et la navigation principale.
export default function HomePage() {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Sillon
        </Link>
        <nav aria-label="Navigation principale">
          <ul className={styles.nav}>
            <li>
              <Link href="/" className={styles.navLink}>
                Découvrir
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.navLink}>
                Partager
              </Link>
            </li>
            <li>
              <span className={styles.navSoon} aria-disabled="true">
                Créer · bientôt
              </span>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.badges}>
          <span className="badge badge--top">Top</span>
          <span className="badge badge--emergent">Émergent</span>
        </div>
        <h1>Sors de ta boucle de recommandations.</h1>
        <p className={styles.lead}>
          Des hits et des artistes émergents dans un même fil, pensé pour toi. Écoute sur ta
          plateforme, partage ce que tu découvres.
        </p>
      </main>
    </>
  );
}
