import Inventory from '@/components/inventory/list'
import OrganizationHome from '@/components/pages/organization/Home'
import UserList from '@/components/user/list'
import UserDetail from '@/components/user/detail'
import ActivityLog from '@/components/organization/activity-log'

import VenueRoutes from './venues'
import MonitoringRoutes from './monitoring'
import MarketingRoutes from './marketing'
import SettingsRoutes from './settings'
import WifiSettingsRoutes from './wifi'

export default [
  ...VenueRoutes,
  ...MonitoringRoutes,
  ...MarketingRoutes,
  ...SettingsRoutes,
  ...WifiSettingsRoutes,
  {
    path: '/',
    name: 'OrganizationHome',
    component: OrganizationHome
  },
  {
    path: 'inventory',
    name: 'OrganizationInventory',
    component: Inventory
  },
  {
    path: 'users',
    name: 'OrganizationUsers',
    component: UserList
  },
  {
    path: 'users/:userId',
    name: 'UserDetail',
    component: UserDetail,
    props: true
  },
  {
    path: 'activity-log',
    name: 'OrganizationActivityLog',
    component: ActivityLog
  }
]
