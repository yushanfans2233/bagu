import { ref } from "vue"
import { defineStore } from "pinia"
import localforage from "localforage"
import { Exercise } from "./types"

const name = 'exercise'

export const useExerciseStore = defineStore(name, () => {
  const storage = localforage.createInstance({ storeName: name })

  const exercises = ref<Exercise[]>([])

  storage.iterate((exercise: Exercise, _) => {
    exercises.value.push(new Exercise(exercise.id, exercise.title, exercise.content))
  })

  function addExercise(exercise: Exercise) {
    if (exercises.value.find((x) => x.id === exercise.id)) {
      throw new Error('id conflict')
    }

    exercises.value.push(exercise)
    storage.setItem(exercise.id, exercise)
  }

  function updateExercise(exercise: Exercise) {
    exercises.value = exercises.value.map((x) => x.id === exercise.id ? exercise : x)
    storage.setItem(exercise.id, exercise)
  }

  function deleteExercise(id: string) {
    exercises.value = exercises.value.filter((x) => x.id !== id)
    storage.removeItem(id)
  }

  return { exercises, addExercise, updateExercise, deleteExercise }
})
