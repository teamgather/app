'use client';

import cogoToast from '@dsdeepak17/cogo-toast';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { isEmail, isStrongPassword } from 'class-validator';
import { useState } from 'react';
import { axios, AxiosError } from '@/services/axios.service';
import { nl2br } from 'react-js-nl2br';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constants/message.constant';

/**
 * ANCHOR Props
 * @date 07/05/2025 - 19:07:26
 *
 * @typedef {Props}
 */
type Props = {
  apiPath: string;
  subPath: string;
};

/**
 * ANCHOR Input
 * @date 07/05/2025 - 18:44:04
 *
 * @typedef {Input}
 */
type Input = {
  email: string;
  password: string;
};

/**
 * ANCHOR Form
 * @date 07/05/2025 - 19:07:39
 *
 * @param {Props} props
 * @returns {*}
 */
const Form = (props: Props) => {
  const { apiPath, subPath } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      email: 'tnitsiri@gmail.com',
      password: 'f6P@8+G2',
    },
  });

  const [doing, setDoing] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  /**
   * ANCHOR Submit
   * @date 07/05/2025 - 18:44:23
   *
   * @async
   * @param {Input} input
   * @returns {*}
   */
  const _submit = async (input: Input) => {
    setDoing(true);

    try {
      const email: string = input.email.trim();

      await axios.post(`${apiPath}/${subPath}`, {
        email,
        password: input.password,
      });
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
    <div className="">
      <form
        onSubmit={handleSubmit(_submit)}
        className="flex flex-col space-y-3 items-start">
        <TextField
          {...register('email', {
            required: true,
            maxLength: 300,
            validate: (v) => !!v.trim() && isEmail(v.trim()),
          })}
          slotProps={{
            htmlInput: {
              maxLength: 300,
            },
          }}
          type="email"
          placeholder="Specify your email address"
          autoFocus={true}
          error={!!errors.email}
        />
        <TextField
          {...register('password', {
            required: true,
            maxLength: 1000,
            validate: (v) => {
              return (
                !!v &&
                isStrongPassword(v, {
                  minLength: 8,
                  minLowercase: 1,
                  minUppercase: 1,
                  minNumbers: 1,
                  minSymbols: 1,
                })
              );
            },
          })}
          slotProps={{
            htmlInput: {
              maxLength: 1000,
            },
          }}
          type="password"
          placeholder="Specify your password"
          error={!!errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation={true}
          loading={doing}
          disabled={doing || done}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Form;
