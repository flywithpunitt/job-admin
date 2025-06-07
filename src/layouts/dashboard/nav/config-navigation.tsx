// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { useGetMenuQuery } from 'src/services';


// ----------------------------------------------------------------------



const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_banking'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_booking'),
  ecom: icon('ic_ecommerce'),

  blog: icon('ic_blog'),

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Jobs', path: PATH_DASHBOARD.jobs.list, icon: ICONS.ecom },
      { title: 'Candidates', path: PATH_DASHBOARD.candidates.list, icon: ICONS.user },
      { title: 'Dashboard', path: PATH_DASHBOARD.app, icon: ICONS.dashboard },
      {title: 'comapanies', path: PATH_DASHBOARD.company.list, icon: ICONS.ecommerce },
      { title: 'Users', path: PATH_DASHBOARD.user.list, icon: ICONS.user },
      { title: 'Blog', path: PATH_DASHBOARD.blog.list, icon: ICONS.blog },
      { title: 'Partner', path: PATH_DASHBOARD.partner.list, icon: ICONS.user },
      { title: 'review', path: PATH_DASHBOARD.review.list, icon: ICONS.user },

      { title: 'settings', path: PATH_DASHBOARD.settings.list, icon: ICONS.user },
    ],
  },

 
];

export default navConfig;
