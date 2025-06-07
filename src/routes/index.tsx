import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  Dashboard,
  LoginPage,
 NewJob,
 Jobs,
  UserList,
  NewUser,
  CompanyList,
  NewCompany,
  JobEdit,
  JobView,
  CompanyEdit,
  CompanyView,
  RoleList,
  NewRole,
  NewCategory,
  IndustryList,
  NewIndustry,
  CategoryList,
  Blog,
  CreateBlog,
  ViewCandidate,
  PartnerList,
  NewPartner
} from './elements';
import { PATH_AUTH } from './paths';
import CandidateList from 'src/pages/candidate/CandidateList';
import BlogView from 'src/pages/blog/BlogView';
import BlogEdit from 'src/pages/blog/BlogEdit';
import Settings from 'src/pages/Settings';
import Forget from 'src/pages/Forget';
import ForgetPassword from 'src/pages/ForgetPassword';
import Review from 'src/pages/Review';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AUTH.login} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'forget',
          element: (
            <GuestGuard>
              <Forget />
            </GuestGuard>
          ),
        },
        {
          path: 'forgetpassword',
          element: (
            <GuestGuard>
              <ForgetPassword />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <Dashboard /> },
        {
          path: 'jobs',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <Jobs /> },
            { path: 'new', element: <NewJob /> },
            { path: 'edit/:id', element: <JobEdit /> },
            { path: 'view/:id', element: <JobView /> },
          ],
        },
        {
          path: 'company',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <CompanyList /> },
            { path: 'new', element: <NewCompany /> },
            { path: 'edit/:id', element: <CompanyEdit /> },
            { path: 'view/:id', element: <CompanyView /> },
          ],
        },
        {
          path: 'candidates',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <CandidateList /> },
            { path: 'view/:id', element: <ViewCandidate /> },
          ],
        },
        {
          path: 'role',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <RoleList /> },
            { path: 'new', element: <NewRole /> },

          ],
        },
        {
          path: 'partner',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <PartnerList /> },
            { path: 'new', element: <NewPartner /> },

          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <NewUser /> },

          ],
        },
        {
          path: 'category',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <CategoryList /> },
            { path: 'new', element: <NewCategory /> },

          ],
        },
        {
          path: 'industry',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <IndustryList /> },
            { path: 'new', element: <NewIndustry /> },

          ],
        },
        {
          path: 'settings',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <Settings /> },
           

          ],
        },
        {
          path: 'review',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <Review /> },
           

          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/list" replace />, index: true },
            { path: 'list', element: <Blog /> },
            { path: 'new', element: <CreateBlog /> },
            { path: 'view/:id', element: <BlogView /> },
            { path: 'edit/:id', element: <BlogEdit /> },

          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
