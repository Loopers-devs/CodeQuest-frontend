import { BookmarkPlus, LayoutDashboardIcon, ListIcon, UserCog, UserCog2Icon } from "lucide-react"

export const routes = {
    home: '/',
    register: '/auth/register',
    login: '/auth/login',
    recoverPassword: '/auth/recover-password',
    dashboard: '/dashboard',
    logout: '/logout',
    favorites: '/dashboard/favorites'
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
    },
    {
        title: 'favorites',
        href: routes.favorites,
        icon: BookmarkPlus
    }
]

export const adminSidebarRoutes = [
    {
        title: 'dashboard',
        href: '/admin',
        icon: LayoutDashboardIcon
    },
    {
        title: 'managePosts',
        href: '/admin/posts',
        icon: ListIcon
    },
    {
        title: 'manageUsers',
        href: '/admin/users',
        icon: UserCog2Icon
    },
    {
        title: 'categories',
        href: '/admin/categories',
        icon: BookmarkPlus
    }
]