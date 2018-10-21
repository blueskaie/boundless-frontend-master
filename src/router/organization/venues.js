import VenuesList from '@/components/venues/list'
import SiteGroupDetail from '@/components/venues/group-details'

export default [
  {
    path: 'venues',
    name: 'Venues',
    component: VenuesList
  },
  {
    path: 'venues/detail/:id',
    name: 'SiteGroupDetail',
    component: SiteGroupDetail
  }
]
