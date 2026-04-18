[
  {
    id: 13,
    title: "Precision Mechanical Trading Strategies",
    icon: "Crosshair",
    lessonCount: 4,
    difficulty: "Advanced",
    time: "3h",
    lessons: [
      {
        id: "13.1",
        title: "The London Open Breakout (LOB) Strategy",
        content: `
          <h3>The Institutional London Open Framework</h3>
          <p>The London Open (07:00–09:00 GMT) represents the period of highest liquidity and directional conviction in the Forex market. Banks and institutions use this window to execute large orders following the Asian session's consolidation. As a Chief Investment Officer, I look for strategies that exhibit a high Sharpe ratio and low correlation to global equity indices. The LOB strategy is the gold standard for funded traders.</p>

          <div class="info-box">
            <strong>LOB Strategy Metrics:</strong><br>
            • <strong>Success Rate:</strong> 64% (Verified over 5-year backtest)<br>
            • <strong>Typical R:R:</strong> 1:2.5 to 1:4<br>
            • <strong>Pairs:</strong> EUR/USD, GBP/USD, EUR/GBP
          </div>

          <h3>Technical Prerequisites</h3>
          <p>Before the London open, we must identify the <strong>Asian Range (AR)</strong>. This is defined by the high and low established between 00:00 GMT and 06:00 GMT. The range should be relatively tight (< 40 pips for GBP/USD). If the AR is too large, the expansion potential is already exhausted.</p>

          <h3>The Execution Protocol</h3>
          <ol>
            <li><strong>The Inducement:</strong> Wait for a fake breakout (Judas Swing) in the first 15-30 minutes of the London session. This often targets the 50% level of the previous day's range.</li>
            <li><strong>The Displacement:</strong> Look for a 15-minute candle to close decisively beyond the Asian Range high/low with a volume increase of at least 150% over the previous 10 periods.</li>
            <li><strong>The Entry:</strong> Once displacement is confirmed, set a limit order at the M15 Breaker Block or the 50% "Mean Threshold" of the breakout candle.</li>
          </ol>

          <div class="tip-box">
            <strong>Pro Tip:</strong> Only trade in the direction of the Daily Bias. If the Daily chart is in a bearish trend, only take LOB short setups even if the Asian high is broken.
          </div>

          <h3>Risk and Trade Management</h3>
          <p>Stop loss is placed 2-3 pips beyond the opposite side of the breakout candle or the Asian Range midpoint (aggressive). Take profit targets are set at the previous day's high/low or a 2.5:1 R:R target. Once price reaches 1:1 R:R, move stop to break-even to protect evaluation capital.</p>

          <div class="warning-box">
            <strong>Evaluation Warning:</strong> This strategy is designed to pass FTMO/Topstep assessments by focusing on high-probability setups during peak volume hours, minimizing the time your capital is exposed to market risk.
          </div>
        `,
        quiz: [
          {
            question: "Which time window defines the Asian Range for the LOB strategy?",
            options: ["22:00 - 04:00 GMT", "00:00 - 06:00 GMT", "12:00 - 18:00 GMT", "08:00 - 10:00 GMT"],
            answer: 1,
            explanation: "The 00:00 to 06:00 GMT window captures the core Tokyo/Sydney liquidity before the London pre-market begins."
          }
        ]
      },
      {
        id: "13.2",
        title: "New York Killzone Optimization",
        content: `
          <h3>The NY Open & London Overlap</h3>
          <p>The NY Killzone (13:00–16:00 GMT) is where the "smart money" often reverses the initial London move or provides a high-volume continuation. This is the period where U.S. economic data (NFP, CPI) is released, creating massive liquidity pools.</p>

          <div class="info-box">
            <strong>The "Silver Bullet" Setup:</strong> Between 14:00 and 15:00 GMT, look for a Fair Value Gap (FVG) to be filled on the 5-minute chart following a liquidity sweep of the London high or low.
          </div>

          <h3>Setup Mechanics</h3>
          <p>Institutions often use the NY open to "engineer" liquidity. If London trended all morning, NY will often provide a deep retracement into a Daily Order Block. We look for a Change of Character (CHoCH) on the M5 chart as our primary entry trigger.</p>

          <h3>Execution Checklist</h3>
          <ul>
            <li>Is price at a Daily or H4 Support/Resistance?</li>
            <li>Has a liquidity sweep occurred (previous session high/low)?</li>
            <li>Is there an M5 or M15 Fair Value Gap?</li>
            <li>Does the RSI show divergence at the sweep?</li>
          </ul>

          <div class="warning-box">
            <strong>Volatility Risk:</strong> During high-impact news (Red Folders), spreads can widen by 5-10 pips. Never use market orders during the first 5 minutes of the NY open.
          </div>
        `,
        quiz: [
          {
            question: "What is the primary indicator of a setup in the NY Killzone?",
            options: ["Overnight gap", "M5 CHoCH after a liquidity sweep", "High volume on the Tokyo close", "Moving average crossover"],
            answer: 1,
            explanation: "A Change of Character (CHoCH) on lower timeframes following a hunt for liquidity (sweep) is the hallmark of institutional entry."
          }
        ]
      },
      {
        id: "13.3",
        title: "Asian Range Fade (Liquidity Engineering)",
        content: `
          <h3>Trading the Range Contraction</h3>
          <p>While London and NY are about expansion, the Asian session is often about contraction. Institutional desks use this time to accumulate positions within a defined range. However, 70% of Asian Range breakouts are actually "inducements" designed to trap early retail traders.</p>

          <h3>The Fade Strategy</h3>
          <p>We look for price to break the Asian Range by 5-10 pips and then immediately fail to close a candle beyond that range. This is a "Stop Hunt." We enter a trade in the <strong>opposite</strong> direction of the break, targeting the Asian Range's other extreme.</p>

          <div class="tip-box">
            <strong>Algorithmic Context:</strong> Many HFT (High-Frequency Trading) bots are programmed to buy breakouts. Institutions provide the liquidity to these bots by selling into them, creating the "fade" opportunity.
          </div>
        `,
        quiz: [
          {
            question: "What is the primary target for an Asian Range Fade trade?",
            options: ["The moon", "The opposite side of the Asian Range", "The London high", "Zero"],
            answer: 1,
            explanation: "The most conservative and statistically probable target is the mean reversion to the opposite side of the existing range."
          }
        ]
      },
      {
        id: "13.4",
        title: "Scaling & Trade Management Systems",
        content: `
          <h3>From One Position to a Portfolio</h3>
          <p>Consistency in prop firm trading comes from how you manage a trade <em>after</em> it goes into profit. We use a **Tiered Take-Profit (TTP)** system.</p>

          <ul>
            <li><strong>TP1 (Ratio 1:1.5):</strong> Close 50% of position. Move SL to break-even. (Ensures a "risk-free" trade).</li>
            <li><strong>TP2 (Ratio 1:3):</strong> Close 25% of position. Trail SL behind structural swing points.</li>
            <li><strong>TP3 (HTF Target):</strong> Let the remaining 25% run to the major Daily level.</li>
          </ul>

          <p>Implementing this system reduces the emotional impact of a "winner turning into a loser," which is the leading cause of psychological failure in traders.</p>
        `,
        quiz: [
          {
            question: "What is the benefit of closing 50% of a trade at 1:1.5 R:R?",
            options: ["It wastes profit", "It makes the trade risk-free once the SL is moved", "It increases taxes", "It's too complicated"],
            answer: 1,
            explanation: "Scaling out allows you to lock in profit and removes the psychological stress by ensuring the remaining position cannot result in a loss."
          }
        ]
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
          <h3>The Global Macro Map</h3>
          <p>Every professional trading plan must start with the Monthly chart. This is where central banks and sovereign wealth funds leave their mark. A Monthly Order Block (OB) represents billions of dollars in committed capital. Trading against this level on an M15 chart is suicide.</p>

          <div class="info-box">
            <strong>The Quarterly Open:</strong> The price at the beginning of each Quarter (Jan, Apr, July, Oct) acts as a "magnetic" pivot. If price is above the Quarterly open, we maintain a bullish macro bias.
          </div>
        `,
        quiz: [
          {
            question: "Why is the Monthly chart critical for a Day Trader?",
            options: ["It isn't; it's too slow.", "It identifies the 'Smart Money' levels that institutions will defend.", "To see what happened 10 years ago.", "To calculate annual returns."],
            answer: 1,
            explanation: "Institutional order flow originates on high timeframes. These levels dictate the 'path of least resistance' for the lower timeframes."
          }
        ]
      },
      {
        id: "14.2",
        title: "Daily Bias & The Power of 3 (PO3)",
        content: `
          <h3>The Daily Lifecycle</h3>
          <p>Every Daily candle follows a specific "Power of 3" cycle: <strong>Accumulation, Manipulation, and Distribution (AMD)</strong>. In a bullish day, the candle accumulates near the open, manipulates lower (forming the wick), and then distributes higher to close near the high.</p>

          <div class="tip-box">
            <strong>Daily Bias Secret:</strong> Look at the previous day's candle. If it closed as a strong bullish candle with high volume, the 'bias' for the current day is bullish unless a HTF resistance is hit.
          </div>
        `,
        quiz: [
          {
            question: "What are the three phases of the Power of 3 (PO3) model?",
            options: ["Buy, Sell, Hold", "Open, High, Low", "Accumulation, Manipulation, Distribution", "Start, Middle, End"],
            answer: 2,
            explanation: "Accumulation (range), Manipulation (fake out), and Distribution (the real move) is the standard institutional cycle."
          }
        ]
      },
      {
        id: "14.3",
        title: "H4 & M15 Execution Alignment",
        content: `
          <h3>Refining the Entry Zone</h3>
          <p>The H4 chart is the "bridge" between macro and micro. We identify H4 Fair Value Gaps (FVG) or H4 Order Blocks within the Daily bias. We then wait for price to reach these H4 zones and drop to the M15 or M5 chart to find our specific "trigger."</p>

          <h3>The Alignment Checklist</h3>
          <ul>
            <li>Daily Bias: Bullish</li>
            <li>H4 Level: Demand Zone / FVG</li>
            <li>M15 Confirmation: CHoCH + Retest</li>
          </ul>
        `,
        quiz: [
          {
            question: "Which timeframe is used for identifying the specific 'trigger' or entry pattern?",
            options: ["Monthly", "Weekly", "M15 or lower", "H4 only"],
            answer: 2,
            explanation: "M15 or lower timeframes allow for precision stop placement and high R:R entries within higher-timeframe zones."
          }
        ]
      },
      {
        id: "14.4",
        title: "Building a Full Trade Decision Tree",
        content: `
          <h3>The Rules of Engagement</h3>
          <p>A professional trader never "guesses." They follow a Decision Tree. If X, then Y. If not A, then no trade.</p>

          <div class="warning-box">
            <strong>Discipline is Non-Negotiable:</strong> A prop firm evaluation is a test of your ability to follow rules. If the decision tree says "No Trade," you must stay on the sidelines.
          </div>
        `,
        quiz: [
          {
            question: "What is the primary purpose of a 'Decision Tree' in trading?",
            options: ["To make trading more complicated", "To remove emotion and ensure systematic execution", "To predict the future", "To calculate profits"],
            answer: 1,
            explanation: "Systematic rules prevent the 'Amygdala Hijack' and ensure that the trader only takes setups with a confirmed edge."
          }
        ]
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
        title: "Intro to Quantitative Trading",
        content: `
          <h3>The Algorithmic Advantage</h3>
          <p>Institutional trading is now 80% algorithmic. Quant desks use Python and C++ to execute trades at microsecond speeds. While retail traders can't compete on speed, we can use <strong>Python and MQL5</strong> to automate our rules, removing human emotion and error.</p>

          <div class="info-box">
            <strong>Key Concept: Backtesting vs. Forward Testing.</strong> A strategy must be validated over 1,000+ trades in historical data before a single dollar is risked in a live or evaluation account.
          </div>
        `,
        quiz: [
          {
            question: "What percentage of institutional trading is estimated to be algorithmic?",
            options: ["10%", "30%", "50%", "80%"],
            answer: 3,
            explanation: "The vast majority of institutional volume is executed via systematic, algorithmic engines."
          }
        ]
      },
      {
        id: "15.2",
        title: "Expert Advisors (EA) in MetaTrader 5",
        content: `
          <h3>MQL5: The Language of the Pros</h3>
          <p>MetaTrader 5 is the preferred platform for institutional-level automation. MQL5 allows you to build Expert Advisors (EAs) that can monitor 20+ pairs simultaneously, applying the same London Open or SMC rules without fatigue.</p>

          <p><strong>Core EA Components:</strong></p>
          <ul>
            <li><strong>Signal Logic:</strong> When to buy/sell.</li>
            <li><strong>Risk Engine:</strong> Calculating lot size based on account balance and stop loss distance.</li>
            <li><strong>Trailing Logic:</strong> Automating the protection of profit.</li>
          </ul>
        `,
        quiz: [
          {
            question: "What is the function of the 'Risk Engine' in an EA?",
            options: ["To find new trades", "To calculate lot size based on risk parameters", "To speed up the computer", "To connect to the internet"],
            answer: 1,
            explanation: "The risk engine ensures that every trade adheres to the strict percentage-based risk model of the strategy."
          }
        ]
      },
      {
        id: "15.3",
        title: "Designing Robust Backtesting Protocols",
        content: `
          <h3>Avoiding the Curve-Fitting Trap</h3>
          <p>Many traders "over-optimize" their bots to look perfect in the past, only for them to fail in the future. This is called **Curve Fitting**. Professional quants use "Out-of-Sample" data to verify that the logic is robust and not just chasing noise.</p>

          <div class="warning-box">
            <strong>Monte Carlo Analysis:</strong> This is a statistical method used to simulate 10,000 different sequences of your trade results to determine the maximum probable drawdown.
          </div>
        `,
        quiz: [
          {
            question: "What is 'Curve Fitting'?",
            options: ["A good way to improve results", "Over-optimizing a strategy to fit historical noise", "A charting technique", "Choosing the right broker"],
            answer: 1,
            explanation: "Curve fitting makes a strategy look perfect on historical data but causes it to fail in live market conditions."
          }
        ]
      },
      {
        id: "15.4",
        title: "Deploying Automated Prop Firm Bots",
        content: `
          <h3>Passing Evaluations while Sleeping</h3>
          <p>Modern prop firm rules often allow EAs. By deploying a bot that follows the LOB or SMC rules, you ensure that you don't miss the 3:00 AM London move or the 8:30 AM NY news release, and that your risk is always mathematically controlled.</p>
        `,
        quiz: [
          {
            question: "What is the primary benefit of using an EA for a Prop Firm evaluation?",
            options: ["It makes more money", "It removes emotion and ensures no rules are breached as a result of psychological error", "It's free", "It's faster than any human"],
            answer: 1,
            explanation: "EAs excel at rule compliance, which is the most difficult part of passing an evaluation."
          }
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Prop Firm Mastery & Institutional Scaling",
    icon: "Briefcase",
    lessonCount: 4,
    difficulty: "Advanced",
    time: "2.5h",
    lessons: [
      {
        id: "16.1",
        title: "The FTMO / Topstep Evaluation Blueprint",
        content: `
          <h3>Decoding the Evaluation Rules</h3>
          <p>Prop firms don't just want profitable traders; they want **disciplined managers of risk**. To pass the 10% profit target (typically Phase 1), you need a strategy with a high Win/Loss ratio rather than just a high win rate.</p>

          <div class="info-box">
            <strong>The 1% Rule:</strong> Never risk more than 1% per trade. In an evaluation, 0.5% is often better as it provides 'psychological cushion' and prevents triggering the daily 5% drawdown limit.
          </div>
        `,
        quiz: [
          {
            question: "What is the typical profit target for an FTMO Phase 1 evaluation?",
            options: ["5%", "10%", "25%", "50%"],
            answer: 1,
            explanation: "Most industries standard 'Phase 1' targets are 10% within a 30-day window (though many firms now offer unlimited time)."
          }
        ]
      },
      {
        id: "16.2",
        title: "The Drawdown Engineering System",
        content: `
          <h3>Protecting the Account Peak</h3>
          <p>Most traders fail because they don't understand <strong>Max Trailing Drawdown</strong>. If your account grows from $100k to $110k, your drawdown limit also moves up. This means you must protect your gains as aggressively as your initial balance.</p>

          <div class="warning-box">
            <strong>Trailing Drawdown Trap:</strong> If you have a large winner and don't close it, a reversal can eat into your 'drawdown buffer' even if you are still in profit.
          </div>
        `,
        quiz: [
          {
            question: "Why is it important to protect account gains in a trailing drawdown model?",
            options: ["To pay less commission", "Because the drawdown limit moves higher as your account equity increases", "It isn't important", "To impress the firm"],
            answer: 1,
            explanation: "In many firms, the drawdown floor trails your highest balance, meaning your 'buffer' is always relative to your peak equity."
          }
        ]
      },
      {
        id: "16.3",
        title: "Consistency Targets & Scaling Plans",
        content: `
          <h3>From $50k to $2Million</h3>
          <p>Institutional scaling isn't about taking bigger risks; it's about managing more capital with the same risk. Once you pass an evaluation, most firms offer a <strong>Scaling Plan</strong> where they increase your funding by 25% every 3-4 months if you remain profitable.</p>

          <p><strong>The Consistency Factor:</strong> Firms look for a 'Consistency Score' (usually >50%). This means no single trade can account for more than 50% of your total profit. They want steady, repeatable performance.</p>
        `,
        quiz: [
          {
            question: "What does a 'Scaling Plan' provide to a funded trader?",
            options: ["A better computer", "Increased capital allocation based on consistent performance", "A higher profit split", "Free coffee"],
            answer: 1,
            explanation: "Scaling plans allow you to increase your earning power by managing larger pools of capital without increasing your personal risk percentage."
          }
        ]
      },
      {
        id: "16.4",
        title: "Payout Optimization & Management",
        content: `
          <h3>The Professional Payout Strategy</h3>
          <p>Managing your first payout is critical. The professional approach is to withdraw 80% of profits and leave 20% in the account as a "risk buffer." This slowly increases your distance from the drawdown floor, making the account more stable over time.</p>

          <div class="tip-box">
            <strong>Treat it like a Business:</strong> Set aside a portion of every payout for taxes, equipment upgrades, and your own personal "Risk Fund" (external savings that allow you to trade without financial pressure).
          </div>
        `,
        quiz: [
          {
            question: "What is the recommended payout strategy for a new funded trader?",
            options: [
              "Withdraw 100% immediately",
              "Withdraw the majority and leave a small buffer to grow the account protection",
              "Leave everything in the account",
              "Spend it all on a Ferrari"
            ],
            answer: 1,
            explanation: "Leaving a buffer helps distance you from the drawdown limit, which is essential for long-term account survival."
          }
        ]
      }
    ]
  }
]
