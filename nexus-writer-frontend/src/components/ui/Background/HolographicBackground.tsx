import React from 'react';
import styles from '@/components/ui/Background/HolographicBackground.module.css'

const HolographicBackground = () => {
  return (
    <div className={styles.holographicBackground}>
      <svg 
        viewBox="0 0 1920 1080" 
        className={styles.backgroundSvg}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients for the circuit lines */}
          <linearGradient id="primaryFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#004d66', stopOpacity: 0.4}} />
            <stop offset="30%" style={{stopColor: '#00d4ff', stopOpacity: 0.8}} />
            <stop offset="70%" style={{stopColor: '#00ffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#004d66', stopOpacity: 0.4}} />
          </linearGradient>
          
          <linearGradient id="secondaryFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#001a26', stopOpacity: 0.3}} />
            <stop offset="50%" style={{stopColor: '#00d4ff', stopOpacity: 0.6}} />
            <stop offset="100%" style={{stopColor: '#001a26', stopOpacity: 0.3}} />
          </linearGradient>
          
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor: '#00ffff', stopOpacity: 1}} />
            <stop offset="70%" style={{stopColor: '#00d4ff', stopOpacity: 0.8}} />
            <stop offset="100%" style={{stopColor: '#0080ff', stopOpacity: 0.4}} />
          </radialGradient>
          
          {/* Glow effects */}
          <filter id="dataGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Primary horizontal data streams */}
        <g className='data-streams'>
          {/* Top horizontal flows */}
          <path 
            d="M0 200 L500 200 L600 150 L1200 150 L1400 180 L1920 180" 
            stroke="url(#primaryFlow)" 
            strokeWidth="2" 
            fill="none"
            filter="url(#dataGlow)"
            className={styles.animatePulseFlow}
          />
          
          <path 
            d="M0 350 L300 350 L450 300 L800 300 L1000 330 L1920 330" 
            stroke="url(#secondaryFlow)" 
            strokeWidth="1.5" 
            fill="none"
            filter="url(#subtleGlow)"
            className={styles.animatePulseFlowDelayed}
          />
          
          {/* Bottom horizontal flows */}
          <path 
            d="M0 900 L400 900 L550 850 L900 850 L1100 880 L1920 880" 
            stroke="url(#primaryFlow)" 
            strokeWidth="2" 
            fill="none"
            filter="url(#dataGlow)"
            className={styles.animatePulseFlowSlow}
          />
          
          <path 
            d="M0 750 L350 750 L500 700 L850 700 L1050 730 L1920 730" 
            stroke="url(#secondaryFlow)" 
            strokeWidth="1.5" 
            fill="none"
            filter="url(#subtleGlow)"
            className={styles.animatePulseFlow}
          />
        </g>
        
        {/* Vertical connection streams */}
        <g className="vertical-streams">
          <path 
            d="M300 0 L300 300 L350 400 L350 700 L300 800 L300 1080" 
            stroke="#00d4ff" 
            strokeWidth="1" 
            fill="none"
            opacity="0.6"
            filter="url(#subtleGlow)"
          />
          
          <path 
            d="M1600 0 L1600 250 L1650 350 L1650 650 L1600 750 L1600 1080" 
            stroke="#00d4ff" 
            strokeWidth="1" 
            fill="none"
            opacity="0.6"
            filter="url(#subtleGlow)"
          />
        </g>
        
        {/* Circuit nodes and junctions */}
        <g className="circuit-nodes-left">
          {/* Primary nodes */}
          <circle cx="400" cy="150" r="4" fill="url(#nodeGradient)" filter="url(#dataGlow)" className={styles.animateNodePulse}/>
          <circle cx="380" cy="300" r="3" fill="url(#nodeGradient)" filter="url(#subtleGlow)" className={styles.animateNodePulseDelayed}/>
          <circle cx="420" cy="500" r="4" fill="url(#nodeGradient)" filter="url(#dataGlow)" className={styles.animateNodePulse}/>
          <circle cx="400" cy="700" r="3" fill="url(#nodeGradient)" filter="url(#subtleGlow)" className={styles.animateNodePulseSlow}/>
          
          {/* Secondary junction points */}
          <circle cx="300" cy="350" r="2" fill="#00ffff" opacity="0.8" className={styles.animateSubtlePulse}/>
          <circle cx="270" cy="650" r="2" fill="#00ffff" opacity="0.8" className={styles.animateSubtlePulseDelayed}/>
          <circle cx="300" cy="750" r="2" fill="#00ffff" opacity="0.8" className={styles.animateSubtlePulse}/>
        </g>

        <g className="circuit-nodes-right">
          {/* Primary nodes - PERFECT MIRRORS */}
          <circle cx="1520" cy="150" r="4" fill="url(#nodeGradient)" filter="url(#dataGlow)" className={styles.animateNodePulse}/>
          <circle cx="1540" cy="300" r="3" fill="url(#nodeGradient)" filter="url(#subtleGlow)" className={styles.animateNodePulseDelayed}/>
          <circle cx="1500" cy="500" r="4" fill="url(#nodeGradient)" filter="url(#dataGlow)" className={styles.animateNodePulse}/>
          <circle cx="1520" cy="700" r="3" fill="url(#nodeGradient)" filter="url(#subtleGlow)" className={styles.animateNodePulseSlow}/>
          
          {/* Secondary junction points - PERFECT MIRRORS */}
          <circle cx="1620" cy="350" r="2" fill="#00ffff" opacity="0.8" className={styles.animateSubtlePulse}/>
          <circle cx="1650" cy="650" r="2" fill="#00ffff" opacity="0.8" className={styles.animateSubtlePulseDelayed}/>
          <circle cx="1620" cy="750" r="2" fill="#00ffff" opacity="0.8" className={styles.animateSubtlePulse}/>
        </g>
        
        {/* Corner connection elements */}
        <g className="corner-elements" opacity="0.4">
          {/* Top left */}
          <path d="M0 0 L150 0 L200 50 L200 150" stroke="#00e6ff" strokeWidth="1" fill="none"/>
          <circle cx="200" cy="50" r="2" fill="#00e6ff" />
          
          {/* Top right */}
          <path d="M1920 0 L1770 0 L1720 50 L1720 150" stroke="#00e6ff" strokeWidth="1" fill="none"/>
          <circle cx="1720" cy="50" r="2" fill="#00e6ff"/>
          
          {/* Bottom left */}
          <path d="M0 1080 L150 1080 L200 1030 L200 930" stroke="#00e6ff" strokeWidth="1" fill="none"/>
          <circle cx="200" cy="1030" r="2" fill="#00e6ff"/>
          
          {/* Bottom right */}
          <path d="M1920 1080 L1770 1080 L1720 1030 L1720 930" stroke="#00e6ff" strokeWidth="1" fill="none"/>
          <circle cx="1720" cy="1030" r="2" fill="#00e6ff"/>
        </g>

        <g className="data-packets">
          <circle r="3" fill="#00ffff" 
                  className={styles.dataPacket1}/>
          <circle r="2" fill="#00d4ff" 
                  className={styles.dataPacket2}/>
          <circle r="2.5" fill="#0080ff" 
                  className={styles.dataPacket3}/>
        </g>
        
        {/* Subtle grid pattern */}
        <g className="grid-pattern" opacity="0.1">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </g>
      </svg>
    </div>
  );
};

export default HolographicBackground;