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
  name: string;
  email: string;
  password: string;
  cpassword: string;
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
      name: 'Thanakorn Nitsiri',
      email: 'tnitsiri@gmail.com',
      password: 'f6P@8+G2',
      cpassword: 'f6P@8+G2',
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
      const name: string = input.name.trim();
      const email: string = input.email.trim();

      await axios.post(`${apiPath}/${subPath}`, {
        name,
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

  // password
  const password = watch('password');

  // ANCHOR Render
  return (
    <div className="">
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
          label="Name"
          placeholder="Specify your full name"
          size="small"
          autoFocus={true}
          error={!!errors.name}
        />
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
          placeholder="Please choose your password"
          helperText="Must contain at least one lowercase letter, one uppercase letter, one number, and one symbol. Must be at least 8 characters long."
          error={!!errors.password}
        />
        <TextField
          {...register('cpassword', {
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
                }) &&
                v == password
              );
            },
          })}
          slotProps={{
            htmlInput: {
              maxLength: 1000,
            },
          }}
          type="password"
          placeholder="Re-enter your password"
          error={!!errors.cpassword}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation={true}
          loading={doing}
          disabled={doing || done}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Form;
