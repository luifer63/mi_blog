import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Rutas } from './routing/rutas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="layout">
      <Rutas />
    </div>
  )
}

export default App
