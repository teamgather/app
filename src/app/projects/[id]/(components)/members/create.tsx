'use client';

import cogoToast from '@dsdeepak17/cogo-toast';
import {
  COMMON_ERROR_FETCH_MESSAGE_CONSTANT,
  COMMON_ERROR_MESSAGE_CONSTANT,
} from '@/constants/message.constant';
import { axios, AxiosError } from '@/services/axios.service';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ProjectModel, UserModel } from '@teamgather/common';
import { useState } from 'react';
import { nl2br } from 'react-js-nl2br';
import { FormSelectOptionInterface } from '@/interfaces/form.interface';

/**
 * ANCHOR Props
 * @date 10/05/2025 - 20:06:44
 *
 * @typedef {Props}
 */
type Props = {
  project: ProjectModel;
  apiPath: string;
  refetch: () => Promise<void>;
};

/**
 * ANCHOR Create
 * @date 10/05/2025 - 20:06:39
 *
 * @param {Props} props
 * @returns {*}
 */
const Create = (props: Props) => {
  const { project, apiPath, refetch } = props;

  const [doing, setDoing] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [user, setUser] = useState<FormSelectOptionInterface<UserModel> | null>(
    null,
  );

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<
    FormSelectOptionInterface<UserModel>[]
  >([]);

  /**
   * ANCHOR Save
   * @date 10/05/2025 - 21:53:57
   *
   * @async
   * @returns {*}
   */
  const _save = async () => {
    if (!user) {
      setHasError(true);

      return;
    }

    setHasError(false);
    setDoing(true);

    try {
      await axios.post(`${apiPath}/${project.id}/member/create`, {
        userId: user.value,
      });

      await refetch();

      cogoToast.success('New member added successfully.');

      _close(false);
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
   * ANCHOR Fetch Users
   * @date 10/05/2025 - 21:30:26
   *
   * @async
   * @returns {*}
   */
  const _fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${apiPath}/${project.id}/users`);

      const users: UserModel[] = data.users;
      const options: FormSelectOptionInterface<UserModel>[] = [];

      for (const user of users) {
        const option: FormSelectOptionInterface<UserModel> = {
          label: user.name,
          value: user.id,
          payload: user,
        };

        options.push(option);
      }

      setOptions(options);
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response &&
        e.response.data &&
        e.response.data.eMessage
      ) {
        cogoToast.error(nl2br(e.response.data.eMessage));
      } else {
        cogoToast.error(COMMON_ERROR_FETCH_MESSAGE_CONSTANT);
      }
    }
  };

  /**
   * ANCHOR Open
   * @date 10/05/2025 - 20:12:41
   */
  const _open = () => {
    _fetchUsers();

    setOpen(true);
  };

  /**
   * ANCHOR Close
   * @date 10/05/2025 - 22:04:50
   *
   * @param {?boolean} [ignoreDoing]
   */
  const _close = (ignoreDoing?: boolean) => {
    if (!ignoreDoing) {
      if (doing) {
        return;
      }
    }

    setOpen(false);
    setHasError(false);
    setUser(null);
  };

  // ANCHOR Render
  return (
    <>
      <Button
        variant="contained"
        size="small"
        disableElevation={true}
        onClick={_open}>
        Add Member
      </Button>
      <Dialog open={open} onClose={() => _close()}>
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent
          style={{
            minWidth: 500,
          }}>
          <DialogContentText>
            Search users by name or email address.
          </DialogContentText>
          <Autocomplete
            value={user}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select User"
                margin="normal"
                required={true}
                error={hasError}
              />
            )}
            onChange={(_, value) => {
              setUser(value);

              if (hasError && value) {
                setHasError(false);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={doing} onClick={() => _close()}>
            Cancel
          </Button>
          <Button loading={doing} onClick={_save}>
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Create;
