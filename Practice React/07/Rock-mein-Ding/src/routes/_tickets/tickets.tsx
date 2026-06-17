import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_tickets/tickets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_tickets/tickets"!</div>
}
