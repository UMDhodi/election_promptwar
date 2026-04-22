# How India Votes

<picture align="center">
  <source media="(prefers-color-scheme: light)" srcset="YOUR-LIGHTMODE-IMAGE-URL">
  <img src="https://github.com/UMDhodi/election_promptwar/blob/main/public/images/emblem-of-india.svg" width="120" />
</picture>

<p align="center">
  <strong>An Immersive Civic Education Platform for Understanding India's Democratic Electoral System</strong>
</p>

<p align="center">
  <a href="https://india-votes.vercel.app">Live Demo</a>
  ·
  <a href="#features">Features</a>
  ·
  <a href="#tech-stack">Tech Stack</a>
  ·
  <a href="#installation">Installation</a>
  ·
  <a href="#project-structure">Structure</a>
</p>

---

## About The Project

**How India Votes** is an interactive civic education web application that teaches Indian citizens about the complete electoral process in the world's largest democracy. From understanding how EVMs work to learning about the 10 stages of an election, this platform provides comprehensive, accessible, and engaging educational content.

### Why This Project?

With over **968 million registered voters** and **543 Lok Sabha seats**, India's electoral process is complex yet fundamental to democracy. This platform aims to:
- Increase voter awareness and participation
- Demystify the election process
- Explain EVM technology and voting procedures
- Provide accurate, non-partisan electoral information
- Test knowledge through interactive quizzes

---

## Features

### 1. Interactive Election Journey
A 10-stage stepper covering the complete election process:
1. **Electoral Roll Preparation** - Updating and maintaining voter lists
2. **Announcement of Elections** - Official declaration by ECI
3. **Nomination Process** - Candidate filing and scrutiny
4. **Campaigning Period** - Electioneering and political campaigns
5. **Voting Day** - The actual polling process
6. **VVPAT Verification** - Paper trail verification
7. **Counting of Votes** - Tabulation process
8. **Result Declaration** - Announcement of winners
9. **Election Petition** - Disputing results
10. **Government Formation** - Formation of new government

### 2. 2024 Lok Sabha Election Timeline
Interactive timeline featuring key dates from the 2024 general elections:
- March 16, 2024 - Election Announcement
- March 20, 2024 - Publication of Gazette Notification
- March 27, 2024 - Last Date for Nominations
- April 18, 2024 - First Phase Voting
- June 1, 2024 - Last Phase Voting
- June 4, 2024 - Result Declaration
- June 7, 2024 - Swearing-in Ceremony

Filter events by category: **Announcement**, **Nominations**, **Voting**, **Results**.

### 3. EVM & Voting Process
Educational section explaining:
- **Electronic Voting Machine (EVM)** components and specifications
- **VVPAT** (Voter Verifiable Paper Audit Trail) system
- Step-by-step voting procedure
- Security measures and integrity checks

### 4. Interactive Quiz
8-question knowledge quiz covering:
- Voting age in India
- Electoral majority requirements
- VVPAT functionality
- Election security deposits
- Model Code of Conduct (MCC)
- First-Past-The-Post (FPTP) system
- Election Commission of India (ECI) role
- Multi-phase voting process

Each question includes detailed explanations for correct answers.

### 5. Comprehensive Glossary
Searchable dictionary of 14+ essential election terms:
- **ECI** - Election Commission of India
- **EVM** - Electronic Voting Machine
- **VVPAT** - Voter Verifiable Paper Audit Trail
- **MCC** - Model Code of Conduct
- **RPA** - Representation of the People Act
- **RO** - Returning Officer
- **NOTA** - None of the Above
- **EPIC** - Electors Photo Identity Card
- **FPTP** - First Past The Post
- **BLO** - Booth Level Officer
- And more...

### 6. AI Assistant
Powered by **Google Gemini API**, an intelligent chat assistant that:
- Answers election-related questions
- Provides non-partisan, factual information
- Explains complex electoral concepts
- Available as a floating widget throughout the app

### 7. Animated Hero Section
Engaging landing page with:
- Animated statistics counters (968M+ voters, 543 seats, 7 phases, 65% turnout)
- Particle background animation
- Progress tracker showing quiz completion
- Call-to-action buttons for engagement

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.2.4 |
| **Language** | TypeScript 5 |
| **UI Library** | React 19.2.4 |
| **Styling** | Custom CSS with CSS Variables |
| **AI Integration** | Google Gemini API (@google/generative-ai v0.24.1) |
| **Icons** | lucide-react v1.8.0 |
| **Fonts** | Inter, Playfair Display, JetBrains Mono |
| **Build Tool** | Turbopack |
| **Linting** | ESLint 9 |

---

## Installation

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- Google Gemini API Key (for AI Assistant)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/india-votes.git
   cd india-votes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
india-votes/
├── app/
│   ├── page.tsx                 # Main home page component
│   ├── layout.tsx               # Root layout with metadata & fonts
│   ├── globals.css              # Complete design system (CSS variables)
│   ├── page.module.css          # Page-specific styles
│   ├── favicon.ico              # Site favicon
│   └── api/
│       └── chat/
│           └── route.ts         # AI Chat API endpoint (Gemini)
├── components/
│   ├── Hero.tsx                 # Hero section with animated stats
│   ├── TabNav.tsx               # Tab navigation (Journey/Timeline/EVM/Quiz/Glossary)
│   ├── AIAssistant.tsx          # Floating AI chat widget
│   ├── JourneyPanel.tsx         # 10-election-stage stepper
│   ├── TimelinePanel.tsx        # 2024 election timeline with filters
│   ├── EVMPanel.tsx             # EVM technology & voting process
│   ├── QuizPanel.tsx             # Interactive knowledge quiz
│   ├── GlossaryPanel.tsx         # Searchable glossary grid
│   └── FluxCanvas.tsx            # Animated particle background
├── lib/
│   └── data.ts                  # Centralized content data
├── public/                      # Static assets
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── eslint.config.mjs           # ESLint configuration
└── .env.local                  # Environment variables
```

### Component Details

| Component | Description |
|-----------|-------------|
| `Hero.tsx` | Landing section with animated counter statistics, progress tracker, and CTAs |
| `TabNav.tsx` | Sticky navigation with 5 tabs for different content sections |
| `AIAssistant.tsx` | Floating chat widget powered by Google Gemini API |
| `JourneyPanel.tsx` | Interactive 10-stage election process stepper |
| `TimelinePanel.tsx` | Filterable 2024 election timeline with event categories |
| `EVMPanel.tsx` | EVM specifications, VVPAT explanation, voting flow diagram |
| `QuizPanel.tsx` | 8-question quiz with explanations and scoring system |
| `GlossaryPanel.tsx` | Searchable grid of 14+ election terms with category filters |
| `FluxCanvas.tsx` | Canvas-based animated particle background effect |

---

## Key Statistics (2024 Lok Sabha Elections)

| Metric | Value |
|--------|-------|
| Registered Voters | 968 million+ |
| Lok Sabha Seats | 543 |
| Phases of Voting | 7 |
| Voter Turnout | ~65% |
| National Parties | 8+ |
| State Parties | 40+ |

---

## API Endpoints

### AI Chat Endpoint
```
POST /api/chat
```

**Request Body:**
```json
{
  "message": "What is VVPAT?"
}
```

**Response:**
```json
{
  "response": "VVPAT (Voter Verifiable Paper Audit Trail) is..."
}
```

The API uses Google Gemini 2.5 Flash model with a system prompt that enforces non-partisan responses and keeps conversations focused on election-related topics.

---

## Design System

The project uses a custom CSS design system with India-inspired color palette:

### Color Variables
- `--color-saffron` - #FF9933 (India Saffron)
- `--color-white` - #FFFFFF
- `--color-green` - #138808 (India Green)
- `--color-navy` - #1a1a2e
- `--color-accent` - #e94560
- `--color-text` - #333333
- `--color-muted` - #666666
- `--color-bg` - #f8f9fa

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code/Technical**: JetBrains Mono (monospace)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Security

The application includes security headers configured in `next.config.ts`:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

---

## Accessibility

The platform includes accessibility features:
- Skip navigation links
- ARIA labels on interactive elements
- Reduced motion support
- Keyboard navigation
- Screen reader friendly
- Print stylesheet

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Acknowledgments

- [Election Commission of India](https://eci.gov.in) - For electoral information
- [Next.js](https://nextjs.org) - Framework
- [Google Gemini API](https://ai.google.dev) - AI Integration
- [Lucide Icons](https://lucide.dev) - Icon library

---

<p align="center">
  <strong>PromptWar Hackathon by Hack2Skills</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PromptWar-Hackathon-FF6B6B?style=for-the-badge&logo=lightning" alt="PromptWar Hackathon by Hack2Skills" />
</p>

<p align="center">
  Built by ❤️ Uday Mayank Dhodi
</p>
