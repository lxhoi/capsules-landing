import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(DrawSVGPlugin)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
