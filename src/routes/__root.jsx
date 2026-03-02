import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RooutLayout = () => (
    <div className="app-shell">
        <header className="top-nav">
            <div className="nav-brand">Anime Explorer</div>
            <nav className="nav-links">
                <Link
                    to="/"
                    className="nav-link"
                    activeProps={{ className: 'nav-link active' }}
                >
                    Главная
                </Link>
                <Link
                    to="/search"
                    className="nav-link"
                    activeProps={{ className: 'nav-link active' }}
                >
                    Поиск
                </Link>
                <Link
                    to="/profile"
                    className="nav-link"
                    activeProps={{ className: 'nav-link active' }}
                >
                    Профиль
                </Link>
            </nav>
        </header>

        <main className="route-content">
            <Outlet />
        </main>

        <TanStackRouterDevtools />
    </div>
)

export const Route = createRootRoute({component: RooutLayout})
