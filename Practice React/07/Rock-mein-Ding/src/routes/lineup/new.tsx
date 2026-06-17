import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lineup/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/lineup/new"!</div>
}
