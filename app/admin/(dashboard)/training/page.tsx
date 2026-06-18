import { Suspense } from 'react'
import AddTrainingForm from '../../components/AddTrainingForm'

export default function TrainingPage() {
  return (
    <Suspense>
      <AddTrainingForm />
    </Suspense>
  )
}
