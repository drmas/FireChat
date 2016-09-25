
import {
  createRouter
} from '@exponent/ex-navigation';

import Login from './Screens/Login'
import Signup from './Screens/Signup'

/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */
export default createRouter(() => ({
  login: () => Login,
  Signup: () => Signup,
}));