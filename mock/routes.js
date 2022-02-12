const routes = [
    {
        path: '/dashboard',
        title: 'Dashboard'
    },
    {
        path: '/permission',
        title: 'Permission',
        children: [
            {
                path: '/permission/page',
                title: 'Page Permission'
            },
            {
                path: '/permission/directive',
                title: 'Directive Permission'
            },
            {
                path: '/permission/role',
                title: 'Role Permission'
            }
        ]
    },
    {
        path: '/charts',
        title: 'Charts',
        children: [
            {
                path: '/charts/keyboard',
                title: 'Keyboard Chart'
            },
            {
                path: '/charts/line',
                title: 'Line Chart'
            }
        ]
    }
]

module.exports = routes
