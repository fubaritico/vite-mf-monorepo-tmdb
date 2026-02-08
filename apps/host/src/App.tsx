import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="mx-auto max-w-[1200px] p-8">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-4xl text-foreground">Movie Explorer</h1>
        <nav className="mb-4 flex justify-center">
          <Link
            to="/"
            className="mx-2 rounded bg-secondary px-4 py-2 font-medium text-secondary-foreground transition-colors hover:bg-red"
          >
            Home
          </Link>
        </nav>
      </header>
      <main className="rounded-lg bg-card p-6 shadow-md">
        <Outlet />
      </main>
    </div>
  )
}

export default App
