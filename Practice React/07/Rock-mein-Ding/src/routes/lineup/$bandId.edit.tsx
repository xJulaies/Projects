import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lineup/$bandId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/lineup/$bandId/edit"!</div>
}
