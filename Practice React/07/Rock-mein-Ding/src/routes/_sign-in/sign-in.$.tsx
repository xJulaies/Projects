import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_sign-in/sign-in/$')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_sign-in/sign-in/$"!</div>
}
