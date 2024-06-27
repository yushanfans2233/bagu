import { createPinia } from 'pinia'
import { useExerciseStore } from "./modules/exercise"

const pinia = createPinia()

export { useExerciseStore }

export default pinia
