import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RooutLayout = () => (
    <>
        <div>
            <Link to="/">Главная</Link>{" "}
            <Link to="/search">Поиск</Link>
            <Link to="/profile">Профиль</Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({component: RooutLayout})
