import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { Home } from './pages/Home'
import { SectionPage } from './pages/SectionPage'
import { TopicPage } from './pages/TopicPage'
import { ProgramPage } from './pages/ProgramPage'
import { NotFound } from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'section/:sectionId', element: <SectionPage /> },
      { path: 'topic/:topicId', element: <TopicPage /> },
      { path: 'program/:programId', element: <ProgramPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
