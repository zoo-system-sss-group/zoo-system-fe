// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/management/Dashboard'))
const Page404 = lazy(() => import('../pages/management/404'))
const Blank = lazy(() => import('../pages/management/Blank'))
const Accounts = lazy(() => import('../pages/management/Accounts'))
const Animals = lazy(() => import('../pages/management/Animals'))
const Areas = lazy(() => import('../pages/management/Areas'))
const Species = lazy(() => import('../pages/management/Species'))
const Cages = lazy(() => import('../pages/management/Cages'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/accounts', 
    component: Accounts, 
  },
  {
    path: '/animals', 
    component: Animals, 
  },
  {
    path: '/species', 
    component: Species, 
  },
  {
    path: '/areas', 
    component: Areas, 
  },
  {
    path: '/cages', 
    component: Cages, 
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
