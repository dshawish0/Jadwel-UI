import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: ['student'],
    },
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/chairmanhome')),
        authority: ['chairman'],
    },
    /** Example purpose only, please remove */
    {
        key: 'suggestedCourse',
        path: '/SuggestedCourse',
        component: React.lazy(() => import('views/demo/Student/SuggestedCourse')),
        authority: ['student'],
    },
    {
        key: 'CreateSchedule',
        path: '/CreateSchedule',
        component: React.lazy(() => import('views/demo/Student/CreateSchedule')),
        authority: [],
    },
    {
        key: 'ViewSchedule',
        path: '/ViewSchedule',
        component: React.lazy(() => import('views/demo/Student/ViewSchedule')),
        authority: [],
    },
    {
        key: 'UpoadRefrenceSchedule',
        path: '/UpoadRefrenceSchedule',
        component: React.lazy(() =>
            import('views/demo/Chairman/UpoadRefrenceSchedule')
        ),
        authority: [],
    },
    {
        key: 'CompareSchedule',
        path: '/CompareSchedule',
        component: React.lazy(() =>
            import('views/demo/Chairman/CompareSchedule')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/Chairman/UploadOfferCourses')
        ),
        authority: [],
    },
]
