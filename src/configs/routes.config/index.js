import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/',
        component: React.lazy(() => import('views/Home')),
        authority: ['student','chairman'],
    },
    // {
    //     key: 'home2',
    //     path: '/home2',
    //     component: React.lazy(() => import('views/chairmanhome')),
    //     authority: ['chairman'],
    // },
    /** Example purpose only, please remove */
    {
        key: 'suggestedCourse',
        path: '/suggested-course',
        component: React.lazy(() =>
            import('views/demo/Student/SuggestedCourse')
        ),
        authority: ['student'],
    },
    {
        key: 'ViewSchedule',
        path: '/ViewSchedule',
        component: React.lazy(() => import('views/demo/Student/ViewSchedule')),
        authority: ['student'],
    },

    //Chairman 
    {
        key: 'CompareSchedule',
        path: '/compare-schedule',
        component: React.lazy(() =>import('views/demo/Chairman/CompareSchedule')),
        authority: ['chairman'],
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
        key: 'UploadOfferCourses',
        path: '/UploadOfferCourses',
        component: React.lazy(() =>
            import('views/demo/Chairman/UploadOfferCourses')
        ),
        authority: [],
    },
   ,
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/Chairman/UploadOfferCourses')
        ),
        authority: [],
    },
]
