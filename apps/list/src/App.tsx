import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="mx-auto max-w-[1200px] p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl text-foreground">Movie List</h1>
      </header>
      <main className="rounded-lg bg-card p-6 shadow-md">
        <Outlet />
      </main>
    </div>
  )
}

export default App
