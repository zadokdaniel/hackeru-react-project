import { useState } from "react";
import Joi from "joi";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Input from "./common/Input";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/usersService";

import { toast } from "react-toastify";

const SignIn = ({ redirect }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      password: Joi.string().min(6).required().label("Password"),
    }),
    async onSubmit(values) {
      try {
        await loginUser(values);

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
        title="Sign In with Real App"
        description="Sign in to your account"
      />

      <form noValidate onSubmit={form.handleSubmit}>
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

        <div className="my-2">
          <button disabled={!form.isValid} className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
