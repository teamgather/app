'use client';

import cogoToast from '@dsdeepak17/cogo-toast';
import {
  COMMON_ERROR_MESSAGE_CONSTANT,
  COMMON_SUCCESS_SAVE_MESSAGE_CONSTANT,
} from '@/constants/message.constant';
import { axios, AxiosError } from '@/services/axios.service';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { nl2br } from 'react-js-nl2br';
import { Button, TextField } from '@mui/material';
import { ProjectModel } from '@teamgather/common';

/**
 * ANCHOR Props
 * @date 08/05/2025 - 11:13:10
 *
 * @typedef {Props}
 */
type Props = {
  project: ProjectModel;
  apiPath: string;
  doing: boolean;
  setDoing: Dispatch<SetStateAction<boolean>>;
  onDone: () => void;
  refetch: () => Promise<void>;
};

/**
 * ANCHOR Input
 * @date 08/05/2025 - 11:23:32
 *
 * @typedef {Input}
 */
type Input = {
  name: string;
};

/**
 * ANCHOR Form
 * @date 08/05/2025 - 11:13:06
 *
 * @param {Props} props
 * @returns {*}
 */
const Form = (props: Props) => {
  const { project, apiPath, doing, setDoing, onDone, refetch } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      name: project.name,
    },
  });

  const [done, setDone] = useState<boolean>(false);

  /**
   * ANCHOR Submit
   * @date 08/05/2025 - 11:23:59
   *
   * @async
   * @param {Input} input
   * @returns {*}
   */
  const _submit = async (input: Input) => {
    setDoing(true);

    try {
      const name: string = input.name.trim();

      await axios.put(`${apiPath}/${project.id}/name`, {
        name,
      });

      await refetch();

      setDone(true);
      onDone();

      cogoToast.success(COMMON_SUCCESS_SAVE_MESSAGE_CONSTANT);
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

  // ANCHOR Render
  return (
    <form
      onSubmit={handleSubmit(_submit)}
      className="flex flex-row items-start space-x-2">
      <div>
        <TextField
          {...register('name', {
            required: true,
            maxLength: 100,
            validate: (v) => !!v.trim(),
          })}
          slotProps={{
            htmlInput: {
              maxLength: 100,
            },
          }}
          type="text"
          label="Project Name"
          placeholder="Specify project name"
          helperText="Press ESC to cancel"
          size="small"
          autoFocus={true}
          error={!!errors.name}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        disableElevation={true}
        loading={doing}
        disabled={doing || done}>
        Save
      </Button>
    </form>
  );
};

export default Form;
