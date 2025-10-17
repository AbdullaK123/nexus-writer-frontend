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
            YOUR UNIVERSE
            <span className={styles.heroTitleGlow}> DEMANDS</span>
            <br />
            MORE THAN A TEXT EDITOR
          </h1>
          
          <p className={styles.heroSubtitle}>
            The AI-powered writing platform built for sci-fi authors who craft worlds, not just words.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.ctaPrimary}>
              <span className={styles.ctaText}>INITIALIZE NEXUS</span>
              <span className={styles.ctaIcon}>→</span>
            </Link>
            <Link href="/login" className={styles.ctaSecondary}>
              <span className={styles.ctaText}>EXISTING USER</span>
            </Link>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>WORLDS CREATED</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>AI ASSISTANCE</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>CONTINUITY</span>
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
          <span className={styles.sectionTag}>[SYSTEM DIAGNOSTIC]</span>
          <h2 className={styles.sectionTitle}>
            YOUR CURRENT WORKFLOW IS <span className={styles.errorText}>CORRUPTED</span>
          </h2>
        </div>
        
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>⚠️</div>
            <h3 className={styles.problemTitle}>Timeline Paradoxes</h3>
            <p className={styles.problemDesc}>
              Character ages don&apos;t add up. Events contradict previous chapters. Your readers notice before you do.
            </p>
          </div>
          
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>💥</div>
            <h3 className={styles.problemTitle}>Fragmented Lore</h3>
            <p className={styles.problemDesc}>
              Planet descriptions scattered across 47 notes. Technology specs lost in Google Docs chaos. World-building entropy.
            </p>
          </div>
          
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>📉</div>
            <h3 className={styles.problemTitle}>Invisible Progress</h3>
            <p className={styles.problemDesc}>
              No idea how many words this week. Goals vague. Motivation dying. Your writing habit is on life support.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>[NEXUS CAPABILITIES]</span>
          <h2 className={styles.sectionTitle}>
            THREE SYSTEMS. <span className={styles.successText}>INFINITE POSSIBILITIES.</span>
          </h2>
        </div>

        <div className={styles.featuresList}>
          {/* Feature 1: Story Bible */}
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>01</div>
            <div className={styles.featureContent}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>📚</div>
                <h3 className={styles.featureTitle}>AUTOMATED STORY BIBLE</h3>
                <span className={styles.featureBadge}>NEURAL MAPPING</span>
              </div>
              <p className={styles.featureDesc}>
                Your universe, automatically documented. Characters, locations, technologies, factions—all tracked, 
                cross-referenced, and instantly searchable. No more hunting through notes.
              </p>
              <ul className={styles.featureList}>
                <li>🔗 Automatic relationship mapping</li>
                <li>⏱️ Timeline validation</li>
                <li>🌍 Location hierarchies</li>
                <li>🔬 Technology evolution tracking</li>
                <li>🎭 Character arc analysis</li>
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

          {/* Feature 2: Analytics */}
          <div className={`${styles.featureCard} ${styles.featureReverse}`}>
            <div className={styles.featureNumber}>02</div>
            <div className={styles.featureContent}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>📊</div>
                <h3 className={styles.featureTitle}>ANALYTICS & GOAL TRACKING</h3>
                <span className={styles.featureBadge}>PROGRESS METRICS</span>
              </div>
              <p className={styles.featureDesc}>
                Know exactly where you stand. Daily word counts, writing velocity, goal achievement—visualized in real-time. 
                Build consistency. Measure momentum. Hit your deadlines.
              </p>
              <ul className={styles.featureList}>
                <li>📈 Daily/weekly/monthly dashboards</li>
                <li>🎯 Custom writing goals</li>
                <li>⚡ Productivity streaks</li>
                <li>📅 Chapter progress tracking</li>
                <li>🏆 Milestone celebrations</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualPlaceholder}>
                <div className={styles.visualChart}>
                  <div className={styles.chartBar} style={{height: '60%'}}></div>
                  <div className={styles.chartBar} style={{height: '80%'}}></div>
                  <div className={styles.chartBar} style={{height: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: AI Editor */}
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>03</div>
            <div className={styles.featureContent}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>🤖</div>
                <h3 className={styles.featureTitle}>AI DEVELOPMENTAL EDITOR</h3>
                <span className={styles.featureBadge}>CONTINUITY ENGINE</span>
              </div>
              <p className={styles.featureDesc}>
                Your 24/7 editor that never sleeps. Catches contradictions, flags weak prose, ensures world-building 
                consistency. Like having a developmental editor watching every word.
              </p>
              <ul className={styles.featureList}>
                <li>🔍 Real-time continuity checking</li>
                <li>✍️ Prose quality analysis</li>
                <li>🎨 Style consistency tracking</li>
                <li>🚨 Contradiction detection</li>
                <li>💡 Improvement suggestions</li>
              </ul>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualPlaceholder}>
                <div className={styles.visualCode}>
                  <div className={styles.codeLine}>
                    <span className={styles.codeGood}>✓</span> Continuity verified
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.codeWarning}>⚠</span> Weak prose detected
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.codeError}>✗</span> Contradiction found
                  </div>
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
            STOP FIGHTING YOUR TOOLS.
            <br />
            START BUILDING YOUR EMPIRE.
          </h2>
          <p className={styles.ctaSubtitle}>
            Join sci-fi authors who chose to write at the speed of thought.
          </p>
          <Link href="/register" className={styles.ctaFinalButton}>
            <span className={styles.ctaText}>INITIALIZE YOUR NEXUS</span>
            <span className={styles.ctaIcon}>→</span>
          </Link>
          <p className={styles.ctaNote}>
            Free to start. No credit card required. Your universe awaits.
          </p>
        </div>
      </section>
    </div>
  );
}
