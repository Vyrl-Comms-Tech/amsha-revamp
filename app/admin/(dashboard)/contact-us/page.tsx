import { Suspense } from 'react'
import ContactTable from '../../components/ContactTable'

export default function ContactUsPage() {
  return (
    <Suspense>
      <ContactTable />
    </Suspense>
  )
}
