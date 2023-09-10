/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";
import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import * as Yup from "yup";

const DateField = ({ name, notRequired = false, errors, setFieldValue }) => {
  const [date, setDate] = useState("");
  return (
    <div>
      <div className="field">
        <label className="capitalize" htmlFor={name}>
          {name.replaceAll("_", " ")}{" "}
          {!notRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <DatePicker
          clearIcon={null}
          className={`register-field ${errors[name] ? "error" : ""}`}
          name={name}
          value={date}
          onChange={(e) => {
            setFieldValue("dob", new Date(e).getTime());
            setDate(e);
          }}
        />
      </div>
      {errors[name] && <div className="error-text">{errors[name]}</div>}
    </div>
  );
};

const FormField = ({ name, notRequired = false, errors, label }) => {
  return (
    <div>
      <div className="field">
        <label className="capitalize" htmlFor={name}>
          {label ? label : name.replaceAll("_", " ")}{" "}
          {!notRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <Field
          type="text"
          className={`register-field ${errors[name] ? "error" : ""}`}
          name={name}
        />
      </div>
      {errors[name] && <div className="error-text">{errors[name]}</div>}
    </div>
  );
};

const SelectField = ({ name, options, notRequired = false, label }) => {
  return (
    <div className="field">
      <label className="capitalize" htmlFor={name}>
        {label ? label : name.replaceAll("_", " ")}{" "}
        {!notRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      <Field as="select" className="register-field" name={name}>
        {options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        ))}
      </Field>
    </div>
  );
};
const KidsField = ({ name, notRequired = false, errors, label }) => {
  const [count, setCount] = useState(1);
  return (
    <>
      <button
        className="btn-kids mt-0"
        type="button"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Add Kid
      </button>
      <div className="kids-container"></div>
    </>
  );
};
const Register = () => {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!user) navigate("/", { replace: true });
  }, [navigate, isLoading, user]);

  const [page, setPage] = useState(1);
  return (
    <section className="retreat-bg-3 full flex flex-col justify-center align-center">
      <div className="popup">
        <Formik
          initialValues={{
            email: "",
            "full_name_(en)": "",
            "full_name_(chi)": "",
            gender: "male",
            nric_passport: "",
            dob: "",
            contact_no: "",
            marital_status: "single",
            service_location: "Kuchai",
            pastoral_team: "Wonderkids",
            invited_by: "pastoral",
            ministry_team: "",
            additional_joining: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Invalid Format.").required("Required"),
            "full_name_(en)": Yup.string().required("Required."),
            "full_name_(chi)": Yup.string().required("Required."),
            nric_passport: Yup.string().required("Required."),
            dob: Yup.string().required("Required."),
            contact_no: Yup.string()
              .required("Required.")
              .matches(
                /^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/,
                "Invalid format."
              ),
            invited_by: Yup.string().required("Required."),
            ministry_team: Yup.string().when("invited_by", {
              is: "ministry",
              then: (schema) => schema.required("Required."),
            }),
            marital_status: Yup.string().required("Required."),
            additional_joining: Yup.boolean().when("marital_status", {
              is: "married",
              then: (schema) => schema.required("Required."),
            }),
          })}
          onSubmit={(values) => {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ errors, values, setFieldValue, validateForm }) => (
            <Form className="form">
              {page === 1 ? (
                <>
                  <h2>Personal Info</h2>
                  <FormField name={"full_name_(en)"} errors={errors} />
                  <FormField name={"full_name_(chi)"} errors={errors} />
                  <FormField name={"email"} errors={errors} />
                  <SelectField
                    name={"gender"}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                  />
                  <FormField
                    name={"nric_passport"}
                    label={"NRIC no. / Passport no."}
                    errors={errors}
                  />
                  <DateField
                    name={"dob"}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                  <FormField
                    name={"contact_no"}
                    label={"Contact No."}
                    errors={errors}
                  />
                  <SelectField
                    errors={errors}
                    name={"marital_status"}
                    options={[
                      { value: "single", label: "Single" },
                      {
                        value: "in a relationship",
                        label: "In a relationship",
                      },
                      { value: "married", label: "Married" },
                      { value: "widowed", label: "Widowed" },
                    ]}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      validateForm().then((error) => {
                        if (
                          error["full_name_(chi)"] ||
                          error["full_name_(en)"] ||
                          error["email"] ||
                          error["nric_passport"] ||
                          error["contact_no"]
                        ) {
                          alert("Please fill up the fields properly.");
                        } else setPage((prev) => prev + 1);
                      });
                    }}
                    className="btn-retreat"
                    style={{ marginTop: "1rem", width: "100%" }}
                  >
                    Next
                  </button>
                </>
              ) : page === 2 ? (
                <>
                  <h2>Pastoral Info</h2>
                  <SelectField
                    errors={errors}
                    name="service_location"
                    options={[
                      {
                        value: "Kuchai",
                        label: "Kuchai",
                      },
                      {
                        value: "Serdang",
                        label: "Serdang",
                      },
                      {
                        value: "Kepong",
                        label: "Kepong",
                      },
                      {
                        value: "USJ",
                        label: "USJ",
                      },
                      {
                        value: "Setapak",
                        label: "Setapak",
                      },
                      {
                        value: "Sg Long",
                        label: "Sg Long",
                      },
                      {
                        value: "Seremban",
                        label: "Seremban",
                      },
                    ]}
                  />
                  <SelectField
                    errors={errors}
                    name="pastoral_team"
                    options={
                      values.service_location === "Kuchai"
                        ? [
                            {
                              value: "Wonderkids",
                              label: "Wonderkids",
                            },
                            {
                              value: "Young Warrior",
                              label: "Young Warrior",
                            },
                            {
                              value: "General - Ps. Joshua Team",
                              label: "Ps. Joshua Team",
                            },
                            {
                              value: "General - Ps. Melvin Team",
                              label: "Ps. Melvin Team",
                            },
                            {
                              value: "General - Ps. Jasmine Team",
                              label: "Ps. Jasmine Team",
                            },
                            {
                              value: "General - Daniel Yeo Team",
                              label: "Daniel Yeo Team",
                            },
                          ]
                        : [
                            {
                              value: "Wonderkids",
                              label: "Wonderkids",
                            },
                            {
                              value: "Young Warrior",
                              label: "Young Warrior",
                            },
                            {
                              value: "General Service",
                              label: "General Service",
                            },
                          ]
                    }
                  />
                  <SelectField
                    errors={errors}
                    name="invited_by"
                    options={[
                      {
                        value: "pastoral",
                        label: "Pastoral: CGL / Coach / Team Leader / Pastor",
                      },
                      {
                        value: "ministry",
                        label: "Ministry: Core Team / PIC / Head",
                      },
                      {
                        value: "invitation",
                        label: "Invitation: Spouse / Maid / etc.",
                      },
                    ]}
                  />
                  {values.invited_by === "ministry" && (
                    <FormField name={"ministry_team"} errors={errors} />
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "1rem",
                      gap: "1rem",
                    }}
                  >
                    <button
                      onClick={() => setPage((prev) => prev - 1)}
                      className="btn-retreat secondary mt-0"
                    >
                      Back
                    </button>
                    <button
                      onClick={() =>
                        setPage((prev) => {
                          if (values.marital_status === "married")
                            return prev + 1;
                        })
                      }
                      className="btn-retreat mt-0"
                      style={{ width: "100%" }}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : page === 3 ? (
                <>
                  <h2>Additional Info</h2>

                  <SelectField
                    name={"additional_joining"}
                    label="Are your spouse / kids joining?"
                    options={[
                      { value: true, label: "Yes" },
                      { value: false, label: "No" },
                    ]}
                  />

                  {values.additional_joining && (
                    <div>
                      <KidsField errors={errors} name={"kids"} />
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "1rem",
                      gap: "1rem",
                    }}
                  >
                    <button
                      onClick={() => setPage((prev) => prev - 1)}
                      className="btn-retreat secondary mt-0"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      className="btn-retreat mt-0"
                      style={{ width: "100%" }}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Register;
