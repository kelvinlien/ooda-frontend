import React from 'react';
import ChangePassword from './ChangePassword/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

function ProfilePage() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <h1>
                Hồ sơ cá nhân
            </h1>
            <div>
                <span>Thay đổi mật khẩu</span>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ChangePassword />
            </Collapse>
        </div>
    );
}

export default ProfilePage;
