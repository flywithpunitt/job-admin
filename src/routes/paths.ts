// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: '/',
  login: '/login',
  forget: '/forget',
  forgetpassword: '/forgetpassword'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/app'),
  three: path(ROOTS_DASHBOARD, '/three'),
  jobs: {
    root: path(ROOTS_DASHBOARD, '/jobs/list'),
    list: path(ROOTS_DASHBOARD, '/jobs/list'),
    new: path(ROOTS_DASHBOARD, '/jobs/new'),
    edit:(id: string) => path(ROOTS_DASHBOARD,`/jobs/edit/${id}`),
    view:(id: string) => path(ROOTS_DASHBOARD,`/jobs/view/${id}`),
  },
  company: {
    root: path(ROOTS_DASHBOARD, '/company/list'),
    list: path(ROOTS_DASHBOARD, '/company/list'),
    new: path(ROOTS_DASHBOARD, '/company/new'),
    edit:(id: string) => path(ROOTS_DASHBOARD,`/company/edit/${id}`),
    view:(id: string) => path(ROOTS_DASHBOARD,`/company/view/${id}`),
    // view: (id: string) => path(ROOTS_DASHBOARD, `/category/${id}`),

  },
  candidates: {
    root: path(ROOTS_DASHBOARD, '/candidates/list'),
    list: path(ROOTS_DASHBOARD, '/candidates/list'),
    new: path(ROOTS_DASHBOARD, '/candidates/new'),
     view: (id: string) => path(ROOTS_DASHBOARD, `/candidates/view/${id}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user/list'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
  },
  customer: {
    root: path(ROOTS_DASHBOARD, '/customer/list'),
    list: path(ROOTS_DASHBOARD, '/customer/list'),
    new: path(ROOTS_DASHBOARD, '/customer/new'),
  },
  role: {
    root: path(ROOTS_DASHBOARD, '/role/list'),
    list: path(ROOTS_DASHBOARD, '/role/list'),
    new: path(ROOTS_DASHBOARD, '/role/new'),
  },
  partner: {
    root: path(ROOTS_DASHBOARD, '/partner/list'),
    list: path(ROOTS_DASHBOARD, '/partner/list'),
    new: path(ROOTS_DASHBOARD, '/partner/new'),
  },
  industry: {
    root: path(ROOTS_DASHBOARD, '/industry/list'),
    list: path(ROOTS_DASHBOARD, '/industry/list'),
    new: path(ROOTS_DASHBOARD, '/industry/new'),
  },
  category: {
    root: path(ROOTS_DASHBOARD, '/category/list'),
    list: path(ROOTS_DASHBOARD, '/category/list'),
    new: path(ROOTS_DASHBOARD, '/category/new'),
  },
  settings: {
    root: path(ROOTS_DASHBOARD, '/settings/list'),
    list: path(ROOTS_DASHBOARD, '/settings/list'),
    
  },
  review: {
    root: path(ROOTS_DASHBOARD, '/review/list'),
    list: path(ROOTS_DASHBOARD, '/review/list'),
    
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog/list'),
    list: path(ROOTS_DASHBOARD, '/blog/list'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view:(id: string) => path(ROOTS_DASHBOARD,`/blog/view/${id}`),
    edit:(id: string) => path(ROOTS_DASHBOARD,`/blog/edit/${id}`),
  },
};
