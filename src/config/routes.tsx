import { LayoutDashboardIcon, ListIcon, UserCog } from "lucide-react"

export const routes = {
    home: '/',
    register: '/auth/register',
    login: '/auth/login',
    recoverPassword: '/auth/recover-password',
    dashboard: '/dashboard',
    logout: '/logout',
}

export const sidebarRoutes = [
    {
        title: 'home',
        href: routes.dashboard,
        icon: LayoutDashboardIcon
    },
    {
        title: 'myPosts',
        href: '/dashboard/posts',
        icon: ListIcon
    },
    {
        title: 'profile',
        href: '/dashboard/profile',
        icon: UserCog
    }
]