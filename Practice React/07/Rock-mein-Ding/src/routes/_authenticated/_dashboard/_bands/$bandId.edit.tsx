import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/_bands/$bandId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/lineup/$bandId/edit"!</div>
}
