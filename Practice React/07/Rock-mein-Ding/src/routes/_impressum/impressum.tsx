import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_impressum/impressum')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_impressum/impressum"!</div>
}
