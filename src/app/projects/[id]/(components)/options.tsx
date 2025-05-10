'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import cogoToast from '@dsdeepak17/cogo-toast';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';
import { axios, AxiosError } from '@/services/axios.service';
import { ProjectModel } from '@teamgather/common';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constants/message.constant';
import { nl2br } from 'react-js-nl2br';
import { useRouter } from '@bprogress/next';

/**
 * ANCHOR Props
 * @date 10/05/2025 - 18:51:17
 *
 * @typedef {Props}
 */
type Props = {
  project: ProjectModel;
  pagePath: string;
  apiPath: string;
};

/**
 * ANCHOR Options
 * @date 10/05/2025 - 18:51:27
 *
 * @param {Props} props
 * @returns {*}
 */
const Options = (props: Props) => {
  const { project, pagePath, apiPath } = props;

  const [doing, setDoing] = useState<boolean>(false);
  const [removed, setRemoved] = useState<boolean>(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState<boolean>(false);

  const router = useRouter();

  /**
   * ANCHOR Remove
   * @date 10/05/2025 - 18:43:40
   *
   * @async
   * @returns {*}
   */
  const _remove = async () => {
    _closeRemoveDialog();
    setDoing(true);

    try {
      await axios.delete(`${apiPath}/${project.id}/remove`);

      setRemoved(true);

      cogoToast.success('Project was successfully deleted.');

      router.push(`/${pagePath}`);
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response &&
        e.response.data &&
        e.response.data.eMessage
      ) {
        cogoToast.error(nl2br(e.response.data.eMessage));
      } else {
        cogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
      }
    } finally {
      setDoing(false);
    }
  };

  /**
   * ANCHOR Remove Confirm
   * @date 10/05/2025 - 18:37:02
   */
  const _removeConfirm = () => {
    setShowRemoveDialog(true);
  };

  /**
   * ANCHOR Close Remove Dialog
   * @date 10/05/2025 - 18:41:56
   */
  const _closeRemoveDialog = () => {
    setShowRemoveDialog(false);
  };

  // ANCHOR Render
  return (
    <>
      <PopupState variant="popover">
        {(popupState) => (
          <Fragment>
            <Button
              {...bindTrigger(popupState)}
              variant="outlined"
              disableElevation={true}
              endIcon={<KeyboardArrowDownIcon />}
              loading={doing || removed}>
              Options
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem
                disableRipple={true}
                onClick={() => {
                  popupState.close();
                  _removeConfirm();
                }}>
                <ListItemIcon>
                  <FiTrash2 className="text-red-600" />
                </ListItemIcon>
                <span className="text-sm text-red-600">Delete</span>
              </MenuItem>
            </Menu>
          </Fragment>
        )}
      </PopupState>
      <Dialog open={showRemoveDialog} onClose={_closeRemoveDialog}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={_closeRemoveDialog}>Cancel</Button>
          <Button color="error" autoFocus={true} onClick={_remove}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Options;
