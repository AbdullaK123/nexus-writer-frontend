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
            YOUR NOVEL IS COMPLEX.
            <br />
            <span className={styles.heroTitleGlow}>YOUR TOOLS SHOULD BE TOO.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Nexus Writer reads every chapter as you write. It tracks your characters,
            catches your contradictions, maps your plot threads, and edits your prose&mdash;so
            you can focus on the story.
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
              <span className={styles.statNumber}>Characters</span>
              <span className={styles.statLabel}>TRACKED</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Contradictions</span>
              <span className={styles.statLabel}>CAUGHT</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Threads</span>
              <span className={styles.statLabel}>MAPPED</span>
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
            <h3 className={styles.problemTitle}>Your characters drift.</h3>
            <p className={styles.problemDesc}>
              Eye color changes in chapter 9. A dead side character shows up in chapter 14.
              Their motivations quietly contradict what you established in book one.
              You won&apos;t catch it. Your readers will.
            </p>
          </div>

          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>💥</div>
            <h3 className={styles.problemTitle}>Your plot threads vanish.</h3>
            <p className={styles.problemDesc}>
              That mystery you set up in chapter 3&mdash;did you ever resolve it?
              The foreshadowing in chapter 7&mdash;does it pay off?
              You&apos;re holding a hundred threads in your head. Some are slipping.
            </p>
          </div>

          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>📉</div>
            <h3 className={styles.problemTitle}>Your structure is invisible.</h3>
            <p className={styles.problemDesc}>
              Pacing, POV balance, scene types, emotional beats&mdash;every craft book
              talks about them, but no tool actually shows you yours. You&apos;re flying
              blind on the things that matter most.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>[HOW NEXUS WORKS]</span>
          <h2 className={styles.sectionTitle}>
            WRITE CHAPTERS. <span className={styles.successText}>NEXUS DOES THE REST.</span>
          </h2>
        </div>

        <div className={styles.featuresList}>
          {/* Feature 1: Editor + AI Line Edits */}
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>01</div>
            <div className={styles.featureContent}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>✍️</div>
                <h3 className={styles.featureTitle}>LINE EDITS, ON DEMAND</h3>
                <span className={styles.featureBadge}>PARAGRAPH-LEVEL</span>
              </div>
              <p className={styles.featureDesc}>
                Write in a clean editor with autosave. When you&apos;re ready, fire off a
                line-edit pass. Suggestions appear inline as highlights&mdash;accept or
                reject each one with a click. Like track changes from a developmental
                editor who works at machine speed.
              </p>
              <ul className={styles.featureList}>
                <li>✏️ Rich text editor with autosave</li>
                <li>🔮 Paragraph-level edit suggestions</li>
                <li>✓/✗ Accept or reject each edit inline</li>
                <li>📖 Seamless chapter-to-chapter navigation</li>
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
                <h3 className={styles.featureTitle}>FOUR LENSES ON YOUR STORY</h3>
                <span className={styles.featureBadge}>CHARACTERS · PLOT · STRUCTURE · WORLD</span>
              </div>
              <p className={styles.featureDesc}>
                Nexus reads every chapter and builds a living map of your story. Who knows
                what, and when. Which threads went dormant. Where your pacing sags. What your
                world says it is&mdash;and where it contradicts itself.
              </p>
              <ul className={styles.featureList}>
                <li>🎭 <strong>Characters</strong> &mdash; arcs, goals, knowledge, presence heatmaps</li>
                <li>📐 <strong>Plot</strong> &mdash; threads, setups &amp; payoffs, dormant arcs, contrivance detection</li>
                <li>🏗️ <strong>Structure</strong> &mdash; pacing curves, POV balance, scene types, emotional beats</li>
                <li>🌍 <strong>World</strong> &mdash; entity facts, contradiction tracking, consistency reports</li>
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
                <h3 className={styles.featureTitle}>BUILD THE HABIT, WITH DATA</h3>
                <span className={styles.featureBadge}>SESSION TRACKING</span>
              </div>
              <p className={styles.featureDesc}>
                Every writing session is tracked automatically&mdash;words written, time
                spent, words per minute. Set daily or weekly targets and watch your
                progress climb. Build the habit on evidence, not willpower.
              </p>
              <ul className={styles.featureList}>
                <li>📈 Word count over time (daily, weekly, monthly)</li>
                <li>⏱️ Total duration &amp; words per minute</li>
                <li>🎯 Custom writing targets with progress tracking</li>
                <li>🔄 Sessions detected automatically&mdash;start typing, tracking begins</li>
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
            Write chapters. Get insights. Track your progress. All in one place.
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