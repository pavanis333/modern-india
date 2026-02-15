# Adding New Subtopics - Guide

## Current Structure

```
Topic: Advent of Europeans and Consolidation of British Power
  └── Subtopic 1: Europeans in India - Details at a Glance (✅ Complete)
      - 105 flashcards (5 categories)
      - 10 MCQs
      - 10 Comprehensive questions
```

## How to Add a New Subtopic

### Step 1: Create Data File

Create a new JSON file in `src/data/` (e.g., `portuguese-in-india.json`):

```json
{
  "topic": "Advent of Europeans and Consolidation of British Power",
  "subtopic": "Portuguese in India",
  "flashcards": [
    {
      "id": "fc001",
      "category": "Key Facts & Dates",
      "front": "Question here",
      "back": "Answer here"
    }
  ],
  "quizzes": {
    "mcq": [
      {
        "id": "mcq001",
        "question": "Question text",
        "options": ["A", "B", "C", "D"],
        "correct": 1,
        "explanation": "Explanation text"
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

### Step 2: Import in App.js

Add import at the top:
```javascript
import portugueseData from './data/portuguese-in-india.json';
```

### Step 3: Add to Subtopics Array

In `App.js`, add to the topic's subtopics array:

```javascript
subtopics: [
  {
    id: 'europeans-overview',
    title: 'Europeans in India - Details at a Glance',
    description: 'Comparative overview of European trading companies',
    data: europeansData
  },
  {
    id: 'portuguese',
    title: 'Portuguese in India',
    description: 'Portuguese exploration, trade, and colonial activities',
    data: portugueseData
  }
]
```

### Categories to Use

Organize flashcards into these categories:
1. **Key Facts & Dates** - Essential timeline, events, people
2. **Concepts & Reasons** - Why things happened, causes & effects
3. **Comparisons** - Between powers, policies, or periods
4. **Strategic Analysis** - Geopolitical understanding
5. **UPSC Focus Areas** - Exam-specific insights

## Planned Subtopics for This Topic

Based on the chapter "Advent of Europeans and Consolidation of British Power":

1. ✅ **Europeans in India - Details at a Glance** (Complete)
2. ⏳ **Portuguese in India** (1498-1961)
   - Vasco da Gama, Cartaz system, Estado da India
3. ⏳ **Dutch in India** (1602-1825)
   - VOC, spice trade focus, limited territorial ambitions
4. ⏳ **English East India Company - Early Phase** (1600-1757)
   - Formation, early factories, trade focus
5. ⏳ **French in India & Carnatic Wars** (1664-1763)
   - Compagnie, Anglo-French rivalry, Dupleix
6. ⏳ **Battle of Plassey & Bengal** (1757-1765)
   - Siraj-ud-Daulah, conspiracy, Diwani rights
7. ⏳ **Expansion & Consolidation** (1765-1857)
   - Subsidiary alliances, annexations, resistance
8. ⏳ **Governor-Generals & Policies** (1773-1857)
   - Warren Hastings to Canning, major reforms
9. ⏳ **1857 Revolt & Crown Rule** (1857-1947)
   - Causes, course, consequences, transition

## Data Quality Guidelines

✅ **DO:**
- Focus on conceptual understanding over rote facts
- Write exam-ready answers (UPSC prelims level)
- Include context and connections
- Use multiple categories for comprehensive coverage
- Cross-reference with UPSC previous year questions

❌ **DON'T:**
- Just list dates without context
- Make answers too brief or too verbose
- Ignore the "why" behind facts
- Skip comparisons and analysis
- Neglect UPSC exam patterns

## Using the Helper Script

Run `generate_subtopic.py` to create a template:

```bash
python3 generate_subtopic.py --name "Portuguese in India" --id "portuguese"
```

This will create:
- Template JSON file
- 20 starter flashcards across categories
- Boilerplate for quizzes
- Ready to fill with content
