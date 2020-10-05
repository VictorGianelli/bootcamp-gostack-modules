import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'

import Header from './components/Header'

/**
 * Componente
 * Propiedade
 * Estado & Imutabilidade
*/

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response)
      setProjects(response.data)   
    })
  }, [])

  function handleAddProject() {
    setProjects([...projects, `Novo projeto ${Date.now()}`])

    console.log(projects)
  }
  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id} >{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App