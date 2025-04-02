import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToolsProvider } from './contexts/ToolsContext.tsx'
import { AlgorithmsProvider } from './contexts/AlgorithmsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlgorithmsProvider>
      <ToolsProvider>
        <App />
      </ToolsProvider>
    </AlgorithmsProvider>
  </StrictMode>,
)
