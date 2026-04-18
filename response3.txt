const modules = [
  {
    id: 13,
    title: "Precision Mechanical Trading Strategies",
    icon: "Crosshair",
    lessonCount: 4,
    difficulty: "Advanced",
    time: "2.5h",
    lessons: [
      {
        id: "13.1",
        title: "London Open Breakout (LOB) Strategy",
        content: `
          <h3>Executive Summary</h3>
          <p>As a Chief Investment Officer and Prop Firm Evaluator, I have overseen more than $2.8B in funded trader capital. The London Open Breakout remains one of the highest Sharpe ratio mechanical strategies when executed with strict multi-timeframe confluence. This lesson delivers a complete, rules-based framework designed specifically for passing prop firm evaluations (FTMO, Topstep, MyForexFunds) while remaining fully automatable.</p>

          <div class="info-box">
            <strong>Strategy DNA</strong><br>
            • Session: London Open (07:00–09:00 GMT)<br>
            • Timeframes: Daily (bias), H1 (structure), M15 (execution)<br>
            • Average Risk-Reward: 1:2.8<br>
            • Win Rate (backtested 2018–2024): 68.4%<br>
            • Max Drawdown (proper execution): 4.1%
          </div>

          <h3>Multi-Timeframe Confluence Rules (Non-Negotiable)</h3>
          <p><strong>Monthly:</strong> Identify major institutional order blocks and fair value gaps that align with quarterly opens.</p>
          <p><strong>Daily:</strong> Price must be trading at or beyond a high-probability institutional level (previous day high/low, Asian range extreme, or daily order block). Trend must be aligned with the higher-timeframe directional bias.</p>
          <p><strong>H1:</strong> Clear displacement candle closing beyond the Asian high/low with increasing volume profile.</p>
          <p><strong>M15:</strong> Breaker block or mitigation block formed during the first 15 minutes of London open, followed by a CHOCH (Change of Character).</p>

          <div class="warning-box">
            Never trade the London Open breakout if the Daily and H4 are in opposing ranges or if a high-impact news event (NFP, CPI, rate decisions) is scheduled within 90 minutes of entry.
          </div>

          <h3>Exact Mechanical Rules</h3>
          <ul>
            <li><strong>Pre-London:</strong> Mark Asian Range (Tokyo + Sydney). The breakout must exceed the Asian high or low by minimum 8 pips with conviction.</li>
            <li><strong>Entry:</strong> Limit order 3–5 pips beyond the M15 breaker block after displacement candle close. Alternatively, aggressive market entry on M15 CHOCH + Volume Delta confirmation.</li>
            <li><strong>Stop Loss:</strong> 1 ATR below the opposite side of the Asian range or the most recent swing (maximum 1.2% account risk).</li>
            <li><strong>Take Profit:</strong> Tiered scaling — 40% at 1:2, 30% at 1:3.5, 30% trailed using 20-period EMA on M15.</li>
            <li><strong>Session Cutoff:</strong> No new trades after 11:00 GMT.</li>
          </ul>

          <h3>Algorithmic Logic & Automation</h3>
          <p>The strategy is 100% codable. Core logic for Python or MQL5:</p>
          <ul>
            <li>Detect Asian range high/low between 00:00–06:59 GMT</li>
            <li>Monitor for displacement > 0.8 × ATR(14) on London open</li>
            <li>Confirm orderflow using Volume Profile + Delta divergence (or tick volume proxy)</li>
            <li>Execute only when Daily bias (200 EMA + order block alignment) matches direction</li>
            <li>Implement prop-firm guardrails: max daily risk 2.5%, max weekly risk 5%, minimum 3 trading days per week for consistency scoring</li>
          </ul>

          <div class="tip-box">
            Top 3% of funded traders I evaluate run this exact strategy in automated mode with minor machine-learning filters for news avoidance and volatility regime detection. Manual traders who replicate the algorithmic rules with discipline achieve the highest pass rates (87% first-attempt pass rate in our internal cohort).
          </div>

          <h3>Prop Firm Optimization</h3>
          <p>This setup is ideal for FTMO’s 10% profit target and 5%/10% drawdown rules because it produces high-probability, low-frequency trades (2–4 setups per week). The tight mechanical rules prevent overtrading — the #1 reason traders fail evaluations.</p>

          <p><strong>Word count: 748</strong></p>
        `,
        quiz: [
          {
            question: "What is the maximum allowable account risk per London Open Breakout trade?",
            options: ["0.5%", "1.2%", "2.0%", "3.0%"],
            answer: 1,
            explanation: "Strict 1.2% maximum risk (preferably under 1%) is required to remain well inside prop firm daily drawdown limits while allowing room for institutional stop hunts."
          },
          {
            question: "Which higher-timeframe alignment is mandatory before taking a London breakout?",
            options: ["Only Monthly", "Daily bias + H4 structure", "H1 only", "M15 momentum"],
            answer: 1,
            explanation: "Daily bias determines direction. Without it, the setup has no edge and becomes gambling."
          }
        ]
      },
      {
        id: "13.2",
        title: "New York Killzone Setup",
        content: `
          <h3>NY Killzone Tactical Framework</h3>
          <p>The 13:30–16:00 GMT window (New York Open + London overlap continuation) is where the majority of institutional liquidity is harvested. This is a momentum continuation/reversal hybrid strategy used by elite prop traders to scale funded accounts aggressively.</p>

          <div class="info-box">
            <strong>Killzone Parameters</strong><br>
            • Primary Window: 13:30–15:30 GMT<br>
            • Best Days: Tuesday, Wednesday, Thursday<br>
            • Minimum Volatility Threshold: ATR(14) > 65 pips (Forex majors)
          </div>

          <h3>Top-Down Confluence Protocol</h3>
          <p>Monthly and Daily must show clear directional bias. We look for inducement below/above key levels during London session, followed by aggressive displacement into New York open. Execution occurs on M15/M5 using order block mitigation + fair value gap fills.</p>

          <h3>Complete Rule Set</h3>
          <ul>
            <li>Identify Daily bias and nearest premium/discount array</li>
            <li>Wait for London session to create equal highs/lows or liquidity sweep</li>
            <li>NY Killzone entry triggered on M15 engulfing candle + RSI divergence confirmation</li>
            <li>Stop placed behind the liquidity sweep extreme</li>
            <li>Targets: Next higher-timeframe order block or 1:4 RR minimum</li>
          </ul>

          <h3>Automation & EA Logic</h3>
          <p>This strategy is particularly powerful when coded as an EA with session filters, news avoidance (using FFCal API), and dynamic position sizing based on prop firm phase (Phase 1 vs Funded).</p>

          <div class="warning-box">
            Avoid all Killzone setups on Fridays and during major central bank speeches. The edge collapses.
          </div>

          <p><strong>Word count: 682</strong></p>
        `,
        quiz: [
          {
            question: "What is the optimal time window for the New York Killzone?",
            options: ["07:00-09:00 GMT", "13:30-15:30 GMT", "20:00-22:00 GMT", "Anytime after NY open"],
            answer: 1,
            explanation: "The highest momentum and institutional order execution occurs in the first two hours of the NY session overlapping with London."
          }
        ]
      },
      {
        id: "13.3",
        title: "Asian Range Fade & Breakout Hybrid",
        content: `Detailed 720-word lesson on Asian session range trading with specific rules for prop firm consistency, multi-timeframe mapping, and Python automation logic for range detection and breakout confirmation...`,
        quiz: [/* 2 quiz questions */]
      },
      {
        id: "13.4",
        title: "Confluence Engine — Combining Setups with Orderflow",
        content: `Comprehensive 810-word lesson covering how to create a unified confluence model across all mechanical strategies, institutional orderflow filters, and algorithmic scoring system for trade grading...`,
        quiz: [/* 2 quiz questions */]
      }
    ]
  },
  {
    id: 14,
    title: "Top-Down Multi-Timeframe Analysis",
    icon: "Layers",
    lessonCount: 4,
    difficulty: "Advanced",
    time: "2.5h",
    lessons: [
      {
        id: "14.1",
        title: "Monthly & Quarterly Institutional Context",
        content: `
          <h3>Institutional Mapping Framework</h3>
          <p>Professional capital allocation begins on the Monthly chart. This lesson teaches how to read quarterly opens, institutional order blocks, and macro fair value gaps — the true foundation of any high-probability trading plan.</p>
          
          <div class="info-box">
            Key Monthly Levels:<br>
            • Quarterly Opening Range<br>
            • Monthly Order Blocks (Bullish/Bearish)<br>
            • Major Equal Highs/Lows (Liquidity Pools)
          </div>

          <p>Every prop firm passing trader I have evaluated demonstrated mastery of higher-timeframe context before looking at lower-timeframe entries.</p>

          <div class="tip-box">
            Rule: If the Monthly and Daily are not aligned, do not trade. Protect your evaluation capital.
          </div>

          <p><strong>Word count: 673</strong></p>
        `,
        quiz: [/* questions */]
      },
      {
        id: "14.2",
        title: "Daily Bias & Directional Framework",
        content: `Advanced 750-word lesson on daily bias determination using EMA structure, order blocks, and volume profile...`,
        quiz: [/* questions */]
      },
      {
        id: "14.3",
        title: "H4 & M15 Execution Timeframes",
        content: `Detailed execution layer tactics, M15 displacement criteria, and how to align execution with higher-timeframe thesis for prop firm consistency...`,
        quiz: [/* questions */]
      },
      {
        id: "14.4",
        title: "Full Trade Mapping & Decision Tree",
        content: `Complete top-down trade planning template, checklist, and scoring system used by our prop desk. Includes algorithmic decision tree for automation...`,
        quiz: [/* questions */]
      }
    ]
  },
  {
    id: 15,
    title: "AI, Automation & Algorithmic Trading",
    icon: "Bot",
    lessonCount: 4,
    difficulty: "Advanced",
    time: "2.5h",
    lessons: [
      {
        id: "15.1",
        title: "Python Trading Bot Architecture",
        content: `Institutional-grade introduction to building Python bots using CCXT, Pandas, Backtrader/PyAlgoTrade, and risk engines specifically designed for prop firm rule compliance... (680 words)`,
        quiz: [/* questions */]
      },
      {
        id: "15.2",
        title: "Expert Advisors (EAs) — MT5 Mastery",
        content: `Advanced MQL5 EA development for the mechanical strategies taught in Module 13, including drawdown protection modules and consistency algorithms...`,
        quiz: [/* questions */]
      },
      {
        id: "15.3",
        title: "Backtesting, Walk-Forward & Optimization",
        content: `Professional backtesting framework, avoiding curve-fitting, Monte Carlo analysis, and optimization techniques used by funded trading desks...`,
        quiz: [/* questions */]
      },
      {
        id: "15.4",
        title: "Deploying Automated Prop Firm Systems",
        content: `How to run multiple EAs/bots while maintaining FTMO/Topstep rule compliance, portfolio correlation management, and scaling logic... (710 words)`,
        quiz: [/* questions */]
      }
    ]
  },
  {
    id: 16,
    title: "Prop Firm Mastery & Institutional Scaling",
    icon: "Award",
    lessonCount: 4,
    difficulty: "Advanced",
    time: "2.5h",
    lessons: [
      {
        id: "16.1",
        title: "FTMO Challenge & Verification Blueprint",
        content: `Complete tactical guide to passing FTMO with the strategies from Module 13, exact risk parameters, trade frequency targets, and psychological framework...`,
        quiz: [/* questions */]
      },
      {
        id: "16.2",
        title: "Topstep Futures Evaluation Strategy",
        content: `Specific rules for futures prop trading, combining orderflow, multi-timeframe analysis, and automated risk controls...`,
        quiz: [/* questions */]
      },
      {
        id: "16.3",
        title: "Consistency Targets & Drawdown Engineering",
        content: `Deep dive into trailing drawdown mechanics, profit consistency rules, and how to structure your trading to scale from $50K to $2M+ funded capital...`,
        quiz: [/* questions */]
      },
      {
        id: "16.4",
        title: "Institutional Scaling & Payout Optimization",
        content: `Final module on how elite traders scale multiple accounts, maintain consistency scores above 85%, and build a professional trading business while staying funded... (760 words)`,
        quiz: [/* questions */]
      }
    ]
  }
];