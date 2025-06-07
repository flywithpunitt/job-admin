import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, Container, MenuItem, Popover } from '@mui/material';
import CustomTable, { Column } from 'src/components/table';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify/Iconify';
import RoleList from './role/RoleList';
import CategoryList from './category/CategoryList';
import IndustryList from './industry/IndustryList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ApplicationDetails() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const row = [
    {
      id: '1', name: '5 Software engineer', category: 'Engineer', status: 'active', position: 'tech lead', reason: "23"
    },
    {
      id: '1', name: '3 Software engineer', category: 'Engineer', status: 'unreviewed', position: 'Hr lead', reason: "23-2023"
    },
    {
      id: '1', name: '8 Software engineer', category: 'Engineer', status: 'rejected', position: 'hr', reason: "43-2023"
    },
    {
      id: '1', name: '4 Software engineer', category: 'Engineer', status: 'shortlist', position: 'Engineer', reason: "23-43-"
    },
    {
      id: '1', name: '1 Software engineer', category: 'Engineer', status: 'reviewed', position: 'no  tech', reason: "23-2023"
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Role" {...a11yProps(0)} />
          <Tab label="Category" {...a11yProps(1)} />
          <Tab label="Industry" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RoleList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CategoryList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <IndustryList />
      </CustomTabPanel>
    </Box>
  );
}


const ApplicentDataTable = (data: any) => {


  const [open, setOpen] = React.useState(null);
  const { themeStretch } = useSettingsContext();

  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100, },
    { id: 'position', label: 'Position', minWidth: 100 },
    { id: 'reason', label: 'Reason', minWidth: 100, align: 'right', },
    { id: 'status', label: 'Current Status', minWidth: 100, align: 'right', type: "badge" },
    { id: 'action', label: 'Action', minWidth: 100, align: 'right', type: "action" },
  ];


  const handleOpenMenu = (event: any, row: any) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = (event: any, row: any) => {
    setOpen(null);
  };


  return (
    <div>
      <Card elevation={2}>
        <Container maxWidth={themeStretch ? false : 'xl'} sx={{ paddingTop: 5, paddingBottom: 5 }}>
          <CustomTable columns={columns} rows={data}
            onClick={(event, row) => {
              handleOpenMenu(event, row)
            }}
          />
          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            {/* <MenuItem sx={{ color: 'green' }} onClick={ProductViewModelOpen} >
            <Iconify icon={'ic:baseline-remove-red-eye'} sx={{ mr: 2 }} />
            View
          </MenuItem>
          <MenuItem sx={{ color: 'green' }} onClick={() => { editJobHandler() }} >
            <Iconify icon={'ic:baseline-remove-red-eye'} sx={{ mr: 2 }} />
            Edit
          </MenuItem> */}
            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </Container>
      </Card>
    </div>
  )
}

