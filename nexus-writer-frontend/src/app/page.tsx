import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles['main-container']}>
      <Image
        src={'./logo.svg'}
        alt="Nexus writer logo"
        height={60}
        width={60}
      />
      <h1 className={styles['cta-section']}>YOUR STORY SPANS GALAXIES, BUT YOUR TOOLS BARELY HANDLE A NOTEBOOK</h1>
      <h2 className={styles['hero-hook']}>Stop fighting fragmented data. Start building universes.</h2>
      <div className={styles['heroes-container']}>
        <div className={styles['problem-hero-container']}>
        <h3>THE CORRUPTION</h3>
        <ul>
          <li>✗ Character arcs desync across stellar distances</li>
          <li>✗ Timeline paradoxes cascade through your narrative matrix</li>
          <li>✗ Technology specs fragment into data noise</li>
          <li>✗ Political hierarchies collapse into entropy</li>
          <li>✗ Faction dynamics drift beyond recognition</li>
        </ul>
        <p><em>{"Your universe spans centuries and sectors, but your tools can't even handle a single planet."}</em></p>
      </div>
      <div className={styles['success-hero-container']}>
        <h3>THE NEXUS</h3>
        <ul>
          <li>✓ Neural networks map every entity relationship</li>
          <li>✓ Quantum consistency protocols prevent timeline corruption</li>
          <li>✓ Autonomous agents monitor narrative integrity</li>
          <li>✓ Deep-scan analysis tracks faction evolution</li>
          <li>✓ Real-time continuity validation across all sectors</li>
        </ul>
        <p><em>{"Deploy story intelligence that scales with your imagination."}</em></p>
      </div>
    </div>
  </div>
  );
}
