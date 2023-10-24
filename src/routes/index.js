// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/management/Dashboard'))
const Page404 = lazy(() => import('../pages/management/404'))
const Blank = lazy(() => import('../pages/management/Blank'))
const Customers = lazy(() => import('../pages/management/Customers'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/customers',
    component: Customers,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
