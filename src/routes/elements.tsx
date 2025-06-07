import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const Jobs = Loadable(lazy(() => import('../pages/jobs/JobList')));
export const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
export const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
export const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
export const NewJob = Loadable(lazy(() => import('../pages/jobs/NewJob')));
export const JobView = Loadable(lazy(() => import('../pages/jobs/jobView')));
export const JobEdit = Loadable(lazy(() => import('../pages/jobs/jobEdit')));
export const ViewCandidate = Loadable(lazy(() => import('../pages/candidate/ViewCanididate')));
export const NewCompany = Loadable(lazy(() => import('../pages/company/NewCompany')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const UserList = Loadable(lazy(() => import('../pages/User/userList')));
export const NewUser = Loadable(lazy(() => import('../pages/User/NewUser')));
export const CompanyList = Loadable(lazy(() => import('../pages/company/CompanyLsit')));
export const Candidatelist = Loadable(lazy(() => import('../pages/candidate/CandidateList')));
export const CompanyView = Loadable(lazy(() => import('../pages/company/CompanyView')));
export const CompanyEdit = Loadable(lazy(() => import('../pages/company/CompanyEdit')));
export const RoleList = Loadable(lazy(() => import('../pages/role/RoleList')));
export const NewRole = Loadable(lazy(() => import('../pages/role/NewRole')));
export const IndustryList = Loadable(lazy(() => import('../pages/industry/IndustryList')));
export const NewIndustry = Loadable(lazy(() => import('../pages/industry/NewIndustry')));
export const NewCategory = Loadable(lazy(() => import('../pages/category/NewCategory')));
export const CategoryList = Loadable(lazy(() => import('../pages/category/CategoryList')));
export const Blog = Loadable(lazy(() => import('../pages/blog/index')));
export const CreateBlog = Loadable(lazy(()=> import('../pages/blog/createBlog')));
export const PartnerList = Loadable(lazy(()=> import('../pages/partner/PartnerList')));
export const NewPartner = Loadable(lazy(()=> import('../pages/partner/NewPartner')));
















