import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import panelStore from '~/stores/panelStore';
import { observer } from 'mobx-react';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class UniversalModal extends React.Component {


  handleClose = () => {
    panelStore.closeModal();
  };

  render() {
    
    const {
        modalTitle,
        isModalOpen,
        renderModalContent,
    } = panelStore;


    return (
        <Dialog
          disableBackdropClick={true}
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={isModalOpen.get()}
        >
          {
            !!modalTitle &&  
            <DialogTitle
              onClose={panelStore.closeModal}
            >
              {modalTitle}
            </DialogTitle>
          }
          {
            renderModalContent()
          }
        </Dialog>
    );
  }
}

export default observer(UniversalModal);