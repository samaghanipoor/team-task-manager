import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Team Task Manager</h1>

        <nav className="flex gap-4">
          <Link to="/">Projects</Link>
          <Link to="/users">Users</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

