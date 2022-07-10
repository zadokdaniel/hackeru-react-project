import Joi from "joi";
import { useFormik } from "formik";

import Input from "./common/Input";
import PageHeader from "./common/pageHeader";

const SignUp = () => {
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate(values) {
      const { error } = Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .label("Email"),
        password: Joi.string().min(6).required().label("Password"),
        name: Joi.string().min(2).required().label("Name"),
      }).validate(values, {
        abortEarly: false,
      });

      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }

      return errors;
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <>
      <PageHeader
        title="Sign Up with Real App"
        description="Open a new account, it is free you yammani!!"
      />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
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
