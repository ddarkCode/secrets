import App from './App';
import Home from './pages/Home';
import Secrets from './pages/Secrets';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Submit from './pages/Submit';
import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    component: App,
    routes: [
      {
        component: Home,
        path: '/',
        exact: true,
      },
      {
        component: Signup,
        path: '/pages/signup',
      },
      {
        component: Signin,
        path: '/pages/signin',
      },
      {
        ...Secrets,
        path: '/pages/secrets',
      },
      {
        ...Submit,
        path: '/pages/submit',
      },
      {
        component: NotFoundPage,
      },
    ],
  },
];
