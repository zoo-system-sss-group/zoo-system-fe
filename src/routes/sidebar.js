/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import TagIcon from '@heroicons/react/24/outline/TagIcon'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import BugAntIcon from '@heroicons/react/24/outline/BugAntIcon'
import MapIcon from '@heroicons/react/24/outline/MapIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/management/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/management/accounts',
    icon: <UserCircleIcon className={iconClasses}/>, 
    name: 'Accounts',
  },
  {
    path: '/management/orders', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Orders', // name that appear in Sidebar
  },
  {
    path: '/management/charts', // url
    icon: <ChartBarIcon className={iconClasses}/>, // icon component
    name: 'Analytics', // name that appear in Sidebar
  },

  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Zoo Management', // name that appear in Sidebar
    submenu : [
      {
        path: '/management/animals',
        icon: <BugAntIcon className={iconClasses}/>, 
        name: 'Animals',
      },
      {
        path: '/management/species',
        icon: <TagIcon className={iconClasses}/>, 
        name: 'Species',
      },
      {
        path: '/management/areas',
        icon: <MapIcon className={iconClasses}/>, 
        name: 'Areas',
      },
      {
        path: '/management/cages',
        icon: <MapIcon className={iconClasses}/>, 
        name: 'Cages',
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Documentation', // name that appear in Sidebar
    submenu : [
      {
        path: '/management/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
        name: 'Getting Started', // name that appear in Sidebar
      },
      {
        path: '/management/features',
        icon: <TableCellsIcon className={submenuIconClasses}/>, 
        name: 'Features',
      },
      {
        path: '/management/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
        name: 'Components',
      }
    ]
  },
  
]

export default routes


