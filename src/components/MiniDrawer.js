import React, { useEffect} from 'react';
import clsx from 'clsx';
import {
  Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import RateReview from '@material-ui/icons/RateReview';
import History  from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Contacts from '@material-ui/icons/Contacts';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LeaveForm from './LeaveForm.js';
import Statistic from './Statistic.js';
import history from '../history.js';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import {ExitToApp, Description, Announcement, PieChart} from '@material-ui/icons';
import { asyncTryCatchReq, API } from '../util/customAxios';
import { getItemFromStorage, getRole } from '../util/localStorage';
import LeaveBalance from './LeaveBalance.js';
import PerformanceReview from './PerformanceReview/index';
import PerformanceApproval from './PerformanceApproval/index';
import PerformanceHistory from './PerformanceHistory/index';
import EmployeeManagement from './EmployeeManagement/index';
import ProfilePage from './ProfilePage/index';

const drawerWidth = 240;

const baseURL = '/lobby/';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));
function getCustomTag(key, optionList)
{
  let CustomTag = optionList[key];
  return <CustomTag />;
}

async function checkIfManager(userId) {
  const [err, data] = await asyncTryCatchReq({
    url: API().isManager(userId),
    method: 'get',
  }, true);
  if (err) {
    return false;
  }
  if (data) {
    return data.isManager;
  }
}

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isManager, setIsManager] = React.useState(false);

  useEffect(() => {
    const user = getItemFromStorage('userInfo');
    if (!user) {
      return;
    }
    const {
      id,
    } = user;
    checkIfManager(id).then(rs => {
        setIsManager(rs);
    });
  }, []);

  let optionList = {}

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  switch (props.userInfo.role)
  {
    case 'hr':
      optionList =  {
        'Thống kê' : PieChart
      };
      break;
    default:
      if (props.remainingPaidLeave !== undefined)
      {
        optionList =  {
          'Tra cứu' : Description,
          'Đơn xin nghỉ phép' : Announcement
        };
      }
      else
      {
        optionList = {
          'Duyệt đơn' : Description
        }
      }
      break;
  };
  const optionList2 = [
    {
      title: 'Lịch sử đánh giá',
      icon: <History />,
      nav: 'pr/history',
    },
    {
      title: 'Hồ sơ cá nhân',
      icon: <AccountBoxIcon />,
      nav: 'profile',
    }
  ];
  if (isManager) {
    optionList2.push({
      title: 'Đánh giá năng lực',
      icon: <RateReview />,
      nav: 'pr',
    })
  }

  if (getRole() === 'hr') {
    optionList2.push({
      title: 'Quản lý nhân sự',
      icon: <Contacts />,
      nav: 'hr/management',
    });
    optionList2.push({
      title: 'Duyệt phiếu đánh giá',
      icon: <ThumbUp />,
      nav: 'hr/pr',
    })
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            alt = 'Phat'
            src = ''
          >
              {props.userInfo.username ? props.userInfo.username.charAt(0) : ''}
          </Avatar>
          <Typography variant="h6" noWrap className={classes.title}>
            <div className = 'row'>
            Xin chào {props.userInfo.username}
            </div>
            <div className = 'row'>
              Phòng ban
            </div>
          </Typography>
          <IconButton type = "button" color="inherit" onClick = {props.logOut}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            Object.keys(optionList).map((key, index) => (
              <ListItem button key = {index} component={NavLink} to={baseURL + ((index - 1) >= 0 ? (index - 1) : '')}>
                <ListItemIcon>
                  {getCustomTag(key, optionList)}
                </ListItemIcon>
                <ListItemText>
                  {key}
                </ListItemText>
              </ListItem>
            ))
          }
          {
            optionList2.length !== 0 && optionList2.map((option) => (
              <ListItem button key={option.title} component={NavLink} to={baseURL + option.nav}>
                <ListItemIcon>
                  {option.icon}
                </ListItemIcon>
                <ListItemText>
                  {option.title}
                </ListItemText>
              </ListItem>
            )) 
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router history = {history} >
          <Switch >
            <Route exact path = '/lobby/'>
              <LeaveBalance 
              remainingPaidLeave = {props.remainingPaidLeave}
              totalAnnual = {props.totalAnnual}
              leaveRequests = {props.leaveRequests}
              baseURL = {props.baseURL}
              managerURL = {props.managerURL}
              accessToken = {props.accessToken}
              updateLeaveRequests = {() => props.updateLeaveRequests()}
              title = {props.title}
              />
            </Route>
            <Route path = '/lobby/0'>
              <LeaveForm 
              baseURL = {props.baseURL}
              accessToken = {props.accessToken}
              leaveURL = {props.leaveURL}
              remainingPaidLeave = {props.remainingPaidLeave}
              updateLeaveBalance = {() => props.updateLeaveBalance()}
              />
            </Route>
            <Route path = '/lobby/1' >
              <Statistic />
            </Route>
            <Route path ='/lobby/pr/history'>
              <PerformanceHistory />
            </Route>
            <Route path ='/lobby/hr/pr'>
              <PerformanceApproval />
            </Route>
            <Route path = '/lobby/pr'>
              <PerformanceReview />
            </Route>
            <Route path = '/lobby/hr/management'>
              <EmployeeManagement />
            </Route>
            <Route path = '/lobby/profile'>
              <ProfilePage />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}
