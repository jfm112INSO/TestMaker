# 📚 CSV Quiz App

A modern, interactive quiz application built with **Next.js** that generates customizable exams from CSV files. Perfect for educators, students, and anyone who wants to create engaging quiz experiences from structured data.

## ✨ Features

### 🎯 **Quiz Modes**
- **Normal Mode**: Questions in sequential order
- **Random Mode**: Questions in random order  
- **SuperRandom Mode**: Both questions AND answer options are randomized

### 🔧 **Customization Options**
- **Question Limit**: Set a specific number of questions or use all available
- **Real-time Feedback**: Immediate answer validation with visual indicators
- **Progress Tracking**: Live progress bar and score counter
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 📊 **Smart Features**
- **Answer Highlighting**: Correct answers highlighted in green, incorrect in red
- **Detailed Results**: Complete score breakdown and percentage calculation
- **Retry Functionality**: Restart quiz with same or different settings
- **Loading States**: Smooth loading animations and transitions

## 🚀 How It Works

1. **CSV Processing**: The app reads a specially formatted CSV file containing questions, options, and correct answers
2. **Dynamic Quiz Generation**: Questions are processed and presented based on selected mode and limits
3. **Interactive Experience**: Users select answers and receive immediate feedback
4. **Results Analysis**: Comprehensive results with scoring and performance metrics

## 📁 CSV File Format

The application expects a CSV file with the following structure:

\`\`\`csv
Question;Option1;Option2;Option3;Option4;CorrectAnswer
What is 2+2?;3;4;5;6;4
What is the capital of France?;London;Berlin;Paris;Madrid;Paris
\`\`\`

### CSV Structure Rules:
- **Semicolon (;) separated** values
- **Question** in the first column
- **4 answer options** in columns 2-5
- **Correct answer** in the last column (must match exactly one of the options)
- **No headers** required - the app processes data directly

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Quick Start

1. **Clone or download** the project
2. **Install dependencies**:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Add your CSV file**:
   - Place your CSV file in the project root
   - Name it \`test.csv\` (or update the API route accordingly)

4. **Run the development server**:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser** and navigate to \`http://localhost:3000\`

## 📖 Usage Guide

### Starting a Quiz
1. **Select Quiz Mode**:
   - **Normal**: Questions appear in the order they're written in the CSV
   - **Random**: Questions are shuffled randomly
   - **SuperRandom**: Questions AND answer options are both randomized

2. **Set Question Limit** (optional):
   - Leave empty to use all questions
   - Enter a number to limit the quiz length

3. **Click "Start Exam"** to begin

### Taking the Quiz
- **Read each question** carefully
- **Select your answer** by clicking on the radio button
- **Click "Continue"** to submit your answer
- **Review feedback** - correct answers are highlighted in green
- **Click "Next"** to proceed to the next question

### Viewing Results
- **Final Score**: See your total correct answers and percentage
- **Performance Metrics**: Detailed breakdown of your performance
- **Retry Options**: Start over with the same settings or return to configuration

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── api/questions/route.ts    # CSV processing API
│   ├── quiz/page.tsx            # Main quiz interface
│   └── page.tsx                 # Quiz configuration page
├── components/ui/               # Reusable UI components
├── test.csv                     # Your quiz questions (add this file)
└── README.md                    # This file
\`\`\`

## 🎨 UI Components

Built with modern, accessible components:
- **shadcn/ui** for consistent design system
- **Tailwind CSS** for responsive styling
- **Lucide React** for beautiful icons
- **Radix UI** for accessible form controls

## 🔧 Customization

### Adding New CSV Files
1. Update the file path in \`app/api/questions/route.ts\`
2. Ensure your CSV follows the required format
3. Test with a few sample questions first

### Modifying Quiz Behavior
- **Question limits**: Adjust in the configuration page
- **Scoring logic**: Modify in \`app/quiz/page.tsx\`
- **UI styling**: Update Tailwind classes throughout components

### Adding New Features
The modular structure makes it easy to add:
- **Timer functionality**
- **Question categories**
- **Export results**
- **Multiple CSV support**
- **User authentication**

## 📊 Example Use Cases

- **Educational Assessments**: Create exams for students
- **Training Programs**: Employee knowledge testing
- **Certification Prep**: Practice tests for certifications
- **Self-Assessment**: Personal knowledge evaluation
- **Competition Quizzes**: Interactive quiz competitions

## 🤝 Contributing

Feel free to contribute by:
- **Reporting bugs** or suggesting features
- **Improving documentation**
- **Adding new quiz modes**
- **Enhancing UI/UX**
- **Optimizing performance**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**CSV not loading?**
- Check file path and name (\`test.csv\` in project root)
- Verify CSV format (semicolon-separated)
- Ensure correct answer matches one of the options exactly

**Questions not randomizing?**
- Confirm you selected "Random" or "SuperRandom" mode
- Check browser console for any errors

**Answers marked incorrectly?**
- Verify correct answers in CSV match options exactly
- Check for extra spaces or special characters

---

**Built with ❤️ using Next.js, React, and modern web technologies.**
