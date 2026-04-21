'use client';

const EVM_STATS = [
  { emoji: '🏭', value: '5.5 Million', label: 'EVMs deployed in 2024' },
  { emoji: '⚡', value: '7.5V', label: 'Battery voltage (no mains)' },
  { emoji: '📊', value: '2,000', label: 'Max votes per Control Unit' },
  { emoji: '🌡️', value: '−50°C–75°C', label: 'Operating temperature range' },
  { emoji: '🎯', value: '99.9997%', label: 'EVM accuracy rate' },
  { emoji: '🔒', value: 'One-time', label: 'Non-rewritable EPROM chip' },
];

const VOTING_STEPS = [
  {
    title: 'Voter Arrives at Booth',
    desc: "You present your EPIC (Voter ID) or any of 12 accepted alternate photo IDs. The polling officer verifies your name in the electoral roll.",
  },
  {
    title: 'Biometric / Roll Verification',
    desc: "Your name is located in the printed or electronic roll. The Presiding Officer marks your entry and cross-verifies against the photo.",
  },
  {
    title: 'Indelible Ink Applied',
    desc: "The left index finger is marked with silver nitrate-based indelible ink. This prevents double-voting and lasts 2–3 weeks.",
  },
  {
    title: 'Ballot Slip Issued',
    desc: "You receive a signed ballot slip (form 17A acknowledgment). This is your authorization to vote on the EVM in the cubicle.",
  },
  {
    title: 'Press the EVM Button',
    desc: "In the secrecy of the polling cubicle, you press the button next to your chosen candidate's name and symbol on the Ballot Unit.",
  },
  {
    title: 'VVPAT Slip Confirms Vote',
    desc: "A VVPAT paper slip appears in the transparent window for exactly 7 seconds — showing your candidate's name, party symbol, and serial number — before dropping into a sealed box.",
  },
];

export default function EVMPanel() {
  return (
    <section
      id="panel-evm"
      role="tabpanel"
      aria-labelledby="tab-evm"
      className="panel"
    >
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-title-icon" aria-hidden="true">🗳️</span>
          EVM Technology &amp; Voting Process
        </h2>
        <p className="panel-subtitle">
          How the Electronic Voting Machine works - from ballot to count -
          trusted by 968 million voters.
        </p>
      </div>

      {/* EVM Flow Diagram */}
      <div className="evm-flow" role="region" aria-label="EVM system components">
        {/* Control Unit */}
        <article className="evm-unit evm-unit-cu" id="evm-cu">
          <div className="evm-icon evm-icon-cu" aria-hidden="true">🖥️</div>
          <h3 className="evm-unit-title">Control Unit</h3>
          <p className="evm-unit-desc">
            Held by the Presiding Officer. Authorizes a single vote and records
            the total count in encrypted memory.
          </p>
          <ul className="evm-unit-specs" aria-label="Control Unit specifications">
            <li>Max 2,000 votes stored</li>
            <li>Non-rewritable EPROM</li>
            <li>Battery-powered</li>
            <li>Tamper-detect seal</li>
          </ul>
        </article>

        {/* Connector 1 */}
        <div className="evm-connector" aria-hidden="true">
          <div className="connector-line" />
          <span className="connector-label">5m cable</span>
          <span className="connector-arrow">→</span>
        </div>

        {/* Ballot Unit */}
        <article className="evm-unit evm-unit-bu" id="evm-bu">
          <div className="evm-icon evm-icon-bu" aria-hidden="true">🗳️</div>
          <h3 className="evm-unit-title">Ballot Unit</h3>
          <p className="evm-unit-desc">
            Voter-facing panel listing up to 16 candidates per unit, with
            name, symbol, and illuminated blue indicator light.
          </p>
          <ul className="evm-unit-specs" aria-label="Ballot Unit specifications">
            <li>16 candidates per unit</li>
            <li>Blue light confirms vote</li>
            <li>Long single-beep = voted</li>
            <li>Up to 4 units per CU</li>
          </ul>
        </article>

        {/* Connector 2 */}
        <div className="evm-connector" aria-hidden="true">
          <div className="connector-line" />
          <span className="connector-label">integrated</span>
          <span className="connector-arrow">→</span>
        </div>

        {/* VVPAT */}
        <article className="evm-unit evm-unit-vvpat" id="evm-vvpat">
          <div className="evm-icon evm-icon-vvpat" aria-hidden="true">🧾</div>
          <h3 className="evm-unit-title">VVPAT</h3>
          <p className="evm-unit-desc">
            Prints a paper slip visible for 7 seconds confirming the candidate
            voted for, then drops into a sealed bin for audit.
          </p>
          <ul className="evm-unit-specs" aria-label="VVPAT specifications">
            <li>Slip visible 7 seconds</li>
            <li>Name + symbol printed</li>
            <li>Sealed for 45 days</li>
            <li>Auditable in disputes</li>
          </ul>
        </article>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <h3 className="section-title">📊 EVM Quick Facts - 2024</h3>
        <div className="stats-cards" role="list">
          {EVM_STATS.map((s, i) => (
            <div key={i} className="stat-card" role="listitem">
              <span className="stat-card-emoji" aria-hidden="true">{s.emoji}</span>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-step voting */}
      <div>
        <h3 className="section-title">🚶 Step-by-Step: How You Vote</h3>
        <ol className="steps-list" aria-label="Step by step voting process">
          {VOTING_STEPS.map((step, i) => (
            <li key={i} className="step-item">
              <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="step-content">
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
