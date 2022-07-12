import Joi from "joi";
import { useFormik } from "formik";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";

import Input from "./common/Input";
import PageHeader from "./common/pageHeader";
import { createUser } from "../services/usersService";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";

const SignUp = ({ redirect }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      password: Joi.string().min(6).required().label("Password"),
      name: Joi.string().min(2).required().label("Name"),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: false });

        toast("Your account is ready 👏");

        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response?.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader
        title="Sign Up with Real App"
        description="Open a new account, it is free you yammani!!"
      />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="email"
          label="Email"
          error={form.touched.email && form.errors.email}
          {...form.getFieldProps("email")}
        />
        <Input
          type="password"
          label="Password"
          error={form.touched.password && form.errors.password}
          {...form.getFieldProps("password")}
        />
        <Input
          type="text"
          label="Name"
          error={form.touched.name && form.errors.name}
          {...form.getFieldProps("name")}
          // onChange={form.handleChange}
          // onBlur={form.handleBlur}
          // value={form.values.name}
          // name="name"
        />

        <div className="my-2">
          <button disabled={!form.isValid} className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
