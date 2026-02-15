# 🇮🇳 Modern India - UPSC Prelims Preparation

A React-based web application designed to help UPSC aspirants prepare for the Prelims examination through interactive flashcards and quizzes.

## 🎯 Features

- **📚 Multi-Topic Structure**: Organized by UPSC syllabus topics
- **🃏 Flashcard Mode**: Interactive flip cards for quick revision
- **📝 Quiz Mode**: 
  - Multiple Choice Questions (MCQs)
  - Comprehensive analytical questions
- **📊 Progress Tracking**: Visual progress indicators
- **🎨 Clean UI**: Intuitive, distraction-free interface
- **📱 Responsive**: Works on desktop, tablet, and mobile

## 🚀 Current Topics

### 1. Advent of Europeans and Consolidation of British Power
- **Europeans in India - Details at a Glance**
- 30 flashcards covering key dates, locations, and facts
- 10 MCQs with detailed explanations
- 10 comprehensive questions for deep understanding

## 💻 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:pavanis333/modern-india.git
cd modern-india

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📖 How to Use

1. **Select a Topic**: Choose from available topics on the home screen
2. **Choose Mode**:
   - **Flashcards**: Click cards to flip and reveal answers. Navigate with Previous/Next buttons
   - **Quiz Mode**: 
     - Select MCQ or Comprehensive questions
     - Answer questions and get instant feedback
     - Review explanations after each question
     - See your final score at the end

## 🗂️ Project Structure

```
modern-india/
├── src/
│   ├── components/
│   │   ├── TopicSelector.js    # Topic selection screen
│   │   ├── FlashcardMode.js    # Flashcard interface
│   │   └── QuizMode.js         # Quiz interface
│   ├── data/
│   │   └── europeans-in-india.json  # Topic data
│   ├── App.js                  # Main app component
│   ├── App.css                 # Styling
│   └── index.js                # Entry point
└── README.md
```

## 📝 Data Format

Each topic follows this structure:

```json
{
  "topic": "Topic Name",
  "subtopic": "Subtopic Name",
  "flashcards": [
    {
      "id": "fc001",
      "front": "Question",
      "back": "Answer"
    }
  ],
  "quizzes": {
    "mcq": [
      {
        "id": "mcq001",
        "question": "Question text",
        "options": ["A", "B", "C", "D"],
        "correct": 1,
        "explanation": "Detailed explanation"
      }
    ],
    "comprehensive": [
      {
        "id": "comp001",
        "question": "Analytical question",
        "answer": "Detailed answer"
      }
    ]
  }
}
```

## 🎓 Study Tips

1. **Start with Flashcards**: Build foundational knowledge first
2. **Practice MCQs**: Test your understanding with instant feedback
3. **Review Comprehensive Questions**: Develop analytical thinking
4. **Track UPSC Patterns**: Questions marked with [UPSC YYYY] indicate previous year relevance
5. **Repeat**: Regular revision is key to retention

## 🔮 Upcoming Features

- [ ] More topics from Modern India syllabus
- [ ] Bookmark difficult questions
- [ ] Performance analytics
- [ ] Timed quiz mode
- [ ] Notes section for each topic
- [ ] Dark mode

## 🤝 Contributing

Want to add more topics or improve the app? Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-topic`)
3. Add your topic data in `src/data/`
4. Update the topics array in `App.js`
5. Commit your changes (`git commit -m 'Add new topic'`)
6. Push to the branch (`git push origin feature/new-topic`)
7. Open a Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Content based on UPSC syllabus and previous year questions
- Built with React
- Designed for UPSC aspirants, by UPSC aspirants

---

**Good luck with your UPSC preparation! 🎯📚**
