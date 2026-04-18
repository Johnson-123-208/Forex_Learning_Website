export const modules = [
  {
    id: 1,
    title: "Introduction to Forex Trading",
    description: "Learn the fundamentals of the global currency market, its history, and how it differs from other financial markets.",
    icon: "BookOpen",
    estimatedTime: "2 hours",
    lessons: [
      {
        id: "1.1",
        title: "What is Forex Trading?",
        content: `
          <h3>What is Forex Trading?</h3>
          <p>Forex, also known as foreign exchange, FX, or currency trading, is a decentralized global market where all the world's currencies trade. The forex market is the largest, most liquid market in the world with a daily trading volume that exceeds $7.5 trillion.</p>
          
          <h3>Brief History</h3>
          <p>The modern forex market as we know it began after the Bretton Woods Accord in 1944. However, the most significant shift happened in 1971 when the Nixon Shock ended the gold standard, allowing currencies to float freely against each other. Today, technology has democratized access, allowing retail traders to participate alongside central banks and institutions.</p>
          
          <h3>Who Participates?</h3>
          <ul>
            <li>Central Banks (managing inflation/currency value)</li>
            <li>Commercial & Investment Banks (Interbank market)</li>
            <li>Hedge Funds & Institutional Investors</li>
            <li>Retail Traders (You!)</li>
          </ul>

          <div class="tip-box">
            <strong>Pro Tip:</strong> Unlike the stock market, the forex market is decentralized (OTC), meaning it's not traded on a central exchange like the NYSE.
          </div>
        `,
        quiz: [
          {
            question: "What is the daily trading volume of the Forex market?",
            options: ["$500 billion", "$1 trillion", "$7.5 trillion", "$10 trillion"],
            answer: 2,
            explanation: "The forex market is the largest financial market in the world, with over $7.5 trillion traded daily."
          }
        ]
      },
      // ... more lessons to be added
    ]
  },
  // ... more modules
];
