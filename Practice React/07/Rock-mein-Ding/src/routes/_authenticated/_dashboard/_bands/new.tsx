import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/_bands/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/lineup/new"!</div>
}
