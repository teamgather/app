'use client';

import cogoToast from '@dsdeepak17/cogo-toast';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constants/message.constant';
import { axios, AxiosError } from '@/services/axios.service';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nl2br } from 'react-js-nl2br';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

/**
 * ANCHOR Props
 * @date 08/05/2025 - 11:13:10
 *
 * @typedef {Props}
 */
type Props = {
  pagePath: string;
  apiPath: string;
};

/**
 * ANCHOR Input
 * @date 08/05/2025 - 11:23:32
 *
 * @typedef {Input}
 */
type Input = {
  name: string;
  description?: string | null;
};

/**
 * ANCHOR Form
 * @date 08/05/2025 - 11:13:06
 *
 * @param {Props} props
 * @returns {*}
 */
const Form = (props: Props) => {
  const { pagePath, apiPath } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      name: 'Project 1',
    },
  });

  const [doing, setDoing] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const router = useRouter();

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
      const description: string | null =
        input.description && input.description.trim()
          ? input.description.trim()
          : null;

      const { data } = await axios.post(`${apiPath}/create`, {
        name,
        description,
      });

      setDone(true);

      cogoToast.success('A new project has been created.');

      router.push(`/${pagePath}/${data.id}`);
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
      className="flex flex-col space-y-3 items-start">
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
        size="small"
        autoFocus={true}
        error={!!errors.name}
      />
      <TextField
        {...register('description', {
          maxLength: 500,
        })}
        slotProps={{
          htmlInput: {
            maxLength: 500,
          },
        }}
        type="text"
        label="Project description"
        placeholder="Specify project description"
        size="small"
        multiline={true}
        minRows={3}
        error={!!errors.description}
      />
      <Button
        type="submit"
        variant="contained"
        disableElevation={true}
        loading={doing}
        disabled={doing || done}>
        Create
      </Button>
    </form>
  );
};

export default Form;
