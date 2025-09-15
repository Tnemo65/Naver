# Student Time Manager – NAVER Vietnam AI Hackathon 2025 Submission

**Preliminary Assignment Submission**

Please check `ASSIGNMENT.md` file in this repository for assignment requirements.

## Project Setup & Usage

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running
```bash
git clone <repository-url>
cd web-track-naver-vietnam-ai-hackathon-Tnemo65-main

npm install

npm run dev

npm run build

npm run preview
```

The application will be available at `http://localhost:5173/`

## Deployed Web URL or APK file
[Paste your deployment link here]

## Demo Video
Demo video link (2 minutes maximum):
**Video Upload Guideline:** When uploading your demo video to YouTube, please set the visibility to **Unlisted**.
- "Unlisted" videos can only be viewed by users who have the link
- The video will not appear in search results or on your channel
- Share the link in your README so mentors can access it

[Paste your video link here]

## Project Introduction

### a. Overview
**Student Time Manager** is a comprehensive task management application designed specifically for students to organize their academic and personal responsibilities. The app provides an intuitive interface for managing tasks with features like calendar view, analytics dashboard, and smart filtering capabilities.

The application helps students stay organized by providing multiple views of their tasks - from a simple list format to visual calendar representation and detailed analytics about their productivity patterns.

### b. Key Features & Function Manual

**Core Features:**
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Calendar View**: Visualize tasks by date with an interactive calendar interface
- **Analytics Dashboard**: Track productivity with charts and statistics
- **Smart Filtering**: Filter tasks by status (All, Pending, Done, Overdue)
- **Local Storage**: Persistent data storage without requiring server connection
- **Responsive Design**: Works seamlessly on desktop and mobile devices

**How to Use:**
1. **Adding Tasks**: Click the task form, enter title, description, and due date
2. **Managing Tasks**: Use checkboxes to mark complete, edit inline, or delete tasks
3. **Calendar View**: Switch to calendar tab to see tasks organized by date
4. **Analytics**: View statistics about task completion rates and productivity trends
5. **Filtering**: Use the filter dropdown to focus on specific task categories

### c. Unique Features (What's special about this app?)

1. **Three-View System**: Unlike typical to-do apps, this provides list, calendar, and analytics views for comprehensive task management
2. **Student-Focused Design**: UI/UX specifically designed with student workflows in mind
3. **Visual Analytics**: Interactive pie charts and bar graphs for productivity insights
4. **Smart Empty States**: Engaging empty state with demo data seeding for new users
5. **Compact Mode**: Adaptive UI that adjusts based on content availability
6. **Glass Morphism Design**: Modern UI with glassmorphism effects and smooth animations
7. **Overdue Detection**: Automatic identification and highlighting of overdue tasks

### d. Technology Stack and Implementation Methods

**Frontend:**
- **React 19.1.1**: Latest React with modern features and hooks
- **TypeScript**: Type-safe development for better code quality
- **Vite**: Fast build tool and development server
- **CSS3**: Modern CSS with custom properties, flexbox, and grid
- **HTML5**: Semantic markup for accessibility

**Development Tools:**
- **ESLint**: Code linting and formatting
- **VS Code**: Development environment with configured tasks

**Architecture Patterns:**
- **Custom Hooks**: `useTasks` hook for state management
- **Component-Based Architecture**: Modular, reusable React components
- **TypeScript Interfaces**: Strong typing with custom type definitions
- **Local Storage API**: Client-side data persistence

**Key Implementation Highlights:**
- Responsive design with mobile-first approach
- Accessible keyboard navigation and screen reader support
- Performance optimized with React best practices
- Modern CSS animations and transitions

### e. Service Architecture & Database Structure

**Client-Side Architecture:**
```
src/
├── components/         
│   ├── TaskForm.tsx   
│   ├── TaskList.tsx   
│   ├── CalendarView.tsx 
│   ├── AnalyticsView.tsx 
│   └── EmptyState.tsx  
├── types.ts           
├── useTasks.ts     
├── storage.ts    
├── App.tsx        
└── App.css          
```

**Data Structure:**
```typescript
interface Task {
  id: string;           
  title: string;       
  description?: string; 
  dueDate?: string;   
  completedAt?: string; 
  createdAt: string;   
}
```

**Storage Strategy:**
- **Local Storage**: Tasks persisted in browser's localStorage
- **JSON Serialization**: Data stored as JSON strings
- **Automatic Sync**: Changes immediately saved to localStorage
- **Recovery**: Data persists across browser sessions

## Reflection

### a. If you had more time, what would you expand?

**Enhanced Features:**
1. **Cloud Synchronization**: Implement user accounts and cloud storage for multi-device sync
2. **Collaboration**: Add task sharing and team collaboration features
3. **Smart Notifications**: Browser notifications for due dates and reminders
4. **Time Tracking**: Built-in pomodoro timer and time logging capabilities
5. **Themes & Customization**: Multiple themes and user customization options

**Technical Improvements:**
- Implement proper state management (Redux/Zustand)
- Add comprehensive testing (Jest, React Testing Library)
- Progressive Web App (PWA) capabilities
- Performance optimizations and lazy loading

### b. If you integrate AI APIs more for your app, what would you do?

**AI-Powered Enhancements:**

1. **Smart Task Categorization**: Use NLP APIs to automatically categorize and tag tasks based on content
2. **Intelligent Scheduling**: AI-powered suggestions for optimal task scheduling based on user patterns
3. **Productivity Insights**: AI analysis of user behavior to provide personalized productivity recommendations
4. **Content Summarization**: Automatically generate task descriptions from longer text inputs
5. **Habit Recognition**: ML algorithms to identify and suggest recurring tasks and habits

**Potential AI APIs to Integrate:**
- OpenAI GPT API for natural language processing
- Google Cloud Natural Language API for content analysis
- Azure Cognitive Services for speech recognition
- Custom ML models for user behavior analysis

## Checklist

- Code runs without errors
- All required features implemented (add/edit/delete/complete tasks)
- Responsive design for mobile and desktop
- Local storage for data persistence
- Multiple view modes (List, Calendar, Analytics)
- Task filtering capabilities
- TypeScript for type safety
- Modern React patterns and hooks
- Clean, maintainable code structure
- All sections are filled (pending deployment URL and demo video)

---

**Developed for NAVER Vietnam AI Hackathon 2025**