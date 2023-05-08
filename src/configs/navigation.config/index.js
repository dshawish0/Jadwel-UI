import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    /** Example purpose only, please remove */

    {
        key: 'Sceduales',
        path: '',
        title: 'Sceduales',
        translateKey: 'nav.Sceduales.Sceduales',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['student'],
        subMenu: [
            {
                key: 'ViewSchedule',
                path: '/ViewSchedule',
                title: 'View Suggested Sceduales',
                translateKey: 'nav.View',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'Suggest Course',
        path: '/SuggestedCourse',
        title: 'Suggest Course',

        icon: 'singleMenu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['student'],
        subMenu: [],
    },
    {
        key: 'groupMenu',
        path: '',
        title: 'Chairman Menu',
        //  translateKey: 'nav.groupMenu.groupMenu',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['chairman'],
        subMenu: [
            {
                key: 'CompareSchedule',
                path: '/CompareSchedule',
                title: 'Compare Schedule',
                //translateKey: 'nav.groupMenu.single',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['chairman'],
                subMenu: [],
            },
            {
                key: 'groupMenu.collapse',
                path: '',
                title: 'Group collapse menu',
                translateKey: 'nav.groupMenu.collapse.collapse',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: ['chairman'],
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item1',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item2',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default navigationConfig
