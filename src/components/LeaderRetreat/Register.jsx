/* eslint-disable react/prop-types */
import { Field, Formik, Form } from "formik";

const FormField = ({ name }) => {
  return (
    <div className="field">
      <label className="capitalize" htmlFor={name}>
        {name.replaceAll("_", " ")}
      </label>
      <Field type="text" className="register-field" name={name} />
    </div>
  );
};

const Register = () => {
  return (
    <section className="retreat-bg-3 full flex flex-col justify-center align-center">
      <div className="popup">
        <Formik>
          <Form className="form">
            <FormField name={"full_name_(en)"} />
            <FormField name={"name"} />
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Register;
