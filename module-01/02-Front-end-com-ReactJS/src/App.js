import React, { useState } from 'react'

import './App.css'
import backgroundImage from './assets/karsten.jpg'

import Header from './components/Header'

/**
 * Componente
 * Propiedade
 * Estado & Imutabilidade
*/

function App() {
  const [projects, setProjects] = useState(['Desenvolvimento do app', 'Back-end web'])

  function handleAddProject() {
    setProjects([...projects, `Novo projeto ${Date.now()}`])
    
    console.log(projects)
  }
  return (
    <>
      <Header title="Projects" />

      <img height={500} src={backgroundImage} alt="karsten"/> 

      <ul>
        {projects.map(project => <li key={project} >{project}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App