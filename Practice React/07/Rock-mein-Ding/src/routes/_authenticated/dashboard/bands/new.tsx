import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/bands/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/lineup/new"!</div>
}
