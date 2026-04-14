import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section with Animated Background */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <Image
              src={'./logo.svg'}
              alt="Nexus Writer"
              height={80}
              width={80}
              className={styles.logo}
            />
            <span className={styles.logoText}>NEXUS</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            WRITE THE STORY.
            <br />
            <span className={styles.heroTitleGlow}>AI HANDLES THE REST.</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            A chapter editor with built-in AI that extracts your characters, tracks your plot threads,
            maps your world&mdash;and edits your prose. You write. Nexus understands.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.ctaPrimary}>
              <span className={styles.ctaText}>START WRITING</span>
              <span className={styles.ctaIcon}>→</span>
            </Link>
            <Link href="/login" className={styles.ctaSecondary}>
              <span className={styles.ctaText}>SIGN IN</span>
            </Link>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>ANALYSIS DIMENSIONS</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>AI DEV EDITOR</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Live</span>
              <span className={styles.statLabel}>SESSION TRACKING</span>
            </div>
          </div>
        </div>
        
        {/* Animated grid background */}
        <div className={styles.heroGrid}></div>
        <div className={styles.heroGradient}></div>
      </section>

      {/* Problem/Solution Section */}
      <section className={styles.problemSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>[THE PROBLEM]</span>
          <h2 className={styles.sectionTitle}>
            COMPLEX STORIES <span className={styles.errorText}>BREAK</span> SIMPLE TOOLS
          </h2>
        </div>
        
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>⚠️</div>
            <h3 className={styles.problemTitle}>Contradictions Slip Through</h3>
            <p className={styles.problemDesc}>
              A character&apos;s eye color changes in chapter 9. A resolved plot thread resurfaces
              with different details. Your world&apos;s rules quietly break. Readers notice.
            </p>
          </div>
          
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>💥</div>
            <h3 className={styles.problemTitle}>No Structural Visibility</h3>
            <p className={styles.problemDesc}>
              Is your pacing off? Are your POV scenes balanced? Which plot threads went dormant?
              You can&apos;t fix what you can&apos;t see. And you can&apos;t see any of it.
            </p>
          </div>
          
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>📉</div>
            <h3 className={styles.problemTitle}>Writing Without Feedback</h3>
            <p className={styles.problemDesc}>
              No word count trends. No session tracking. No way to know if you&apos;re building
              momentum or losing it. Your writing habit flies blind.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>[HOW NEXUS WORKS]</span>
          <h2 className={styles.sectionTitle}>
            WRITE CHAPTERS. <span className={styles.successText}>AI DOES THE ANALYSIS.</span>
          </h2>
        </div>

        <div className={styles.featuresList}>
          {/* Feature 1: Editor + AI Line Edits */}
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>01</div>
            <div className={styles.featureContent}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>✍️</div>
                <h3 className={styles.featureTitle}>WRITE WITH AN AI EDITOR</h3>
                <span className={styles.featureBadge}>LINE EDITS</span>
              </div>
              <p className={styles.featureDesc}>
                Write in a rich text editor with real-time autosave. When you&apos;re ready, trigger AI
                line edits&mdash;paragraph-level suggestions appear as highlights in your text. Accept or
                reject each one with a click. Like track changes, but from an AI developmental editor.
              </p>
              <ul className={styles.featureList}>
                <li>✏️ Rich text editor with autosave</li>
                <li>🔮 AI paragraph-level edit suggestions</li>
                <li>✓/✗ Accept or reject each edit inline</li>
                <li>📖 Chapter-to-chapter navigation</li>
                <li>📊 Live word count per chapter</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualPlaceholder}>
                <div className={styles.visualCode}>
                  <div className={styles.codeLine}>
                    <span className={styles.codeGood}>✓</span> Accept suggestion
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.codeWarning}>⚠</span> Paragraph rewrite proposed
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.codeError}>✗</span> Reject suggestion
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: AI Extraction & Insights */}
          <div className={`${styles.featureCard} ${styles.featureReverse}`}>
            <div className={styles.featureNumber}>02</div>
            <div className={styles.featureContent}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>🔍</div>
                <h3 className={styles.featureTitle}>AI STORY INSIGHTS</h3>
                <span className={styles.featureBadge}>4 DIMENSIONS</span>
              </div>
              <p className={styles.featureDesc}>
                AI reads your chapters and extracts everything&mdash;characters, plot threads, world
                facts, structural patterns. Then it surfaces insights: contradictions in your world,
                dormant plot threads, pacing imbalances, weak scenes, unresolved setups.
              </p>
              <ul className={styles.featureList}>
                <li>🎭 Characters &mdash; arcs, goals, knowledge, presence heatmaps</li>
                <li>📐 Plot &mdash; threads, setups &amp; payoffs, story questions, contrivance detection</li>
                <li>🏗️ Structure &mdash; pacing curves, POV balance, scene types, emotional beats</li>
                <li>🌍 World &mdash; entity facts, contradiction tracking, consistency reports</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualPlaceholder}>
                <div className={styles.visualGrid}>
                  <div className={styles.visualNode}></div>
                  <div className={styles.visualNode}></div>
                  <div className={styles.visualNode}></div>
                  <div className={styles.visualConnection}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Analytics & Session Tracking */}
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>03</div>
            <div className={styles.featureContent}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>📊</div>
                <h3 className={styles.featureTitle}>WRITING ANALYTICS</h3>
                <span className={styles.featureBadge}>SESSION TRACKING</span>
              </div>
              <p className={styles.featureDesc}>
                Every writing session is tracked automatically via WebSocket&mdash;words written,
                time spent, words per minute. Set daily or weekly targets and watch your
                progress on real-time charts. Build the habit with data, not willpower.
              </p>
              <ul className={styles.featureList}>
                <li>📈 Word count over time (daily/weekly/monthly)</li>
                <li>⏱️ Total duration &amp; words per minute</li>
                <li>🎯 Custom writing targets with progress tracking</li>
                <li>🔄 Automatic session detection (start typing → tracking begins)</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualPlaceholder}>
                <div className={styles.visualChart}>
                  <div className={`${styles.chartBar} ${styles.chartBarShort}`}></div>
                  <div className={`${styles.chartBar} ${styles.chartBarMedium}`}></div>
                  <div className={`${styles.chartBar} ${styles.chartBarTall}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>
            YOUR STORY IS COMPLEX.
            <br />
            YOUR TOOLS SHOULD KEEP UP.
          </h2>
          <p className={styles.ctaSubtitle}>
            Write chapters. Get AI insights. Track your progress. All in one place.
          </p>
          <Link href="/register" className={styles.ctaFinalButton}>
            <span className={styles.ctaText}>START WRITING</span>
            <span className={styles.ctaIcon}>→</span>
          </Link>
          <p className={styles.ctaNote}>
            Free to start. No credit card required.
          </p>
        </div>
      </section>
    </div>
  );
}
