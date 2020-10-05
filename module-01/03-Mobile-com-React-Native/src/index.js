import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native'

import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data)


      setProjects(response.data)
    })
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159C1" />

      <SafeAreaView style={styles.container} >

        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159C1',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  project: {
    color: '#FFF',
    fontSize: 30
  }
}) 