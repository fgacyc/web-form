/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";
import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import { AiFillCloseCircle } from "react-icons/ai";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import * as Yup from "yup";
import { useFirestore } from "reactfire";
import { addDoc, collection } from "firebase/firestore";

const handleSubmit = (col, data, then) => {
  return addDoc(col, data).then(then);
};

const DateField = ({
  name,
  notRequired = false,
  errors,
  setFieldValue,
  values,
}) => {
  const [date, setDate] = useState(values.dob);
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

const DetailsField = ({ name, value, allValues }) => {
  const inputValue = Array.isArray(value)
    ? value.map((item) => `${item.name}, ${item.age}`).join("\n")
    : name === "dob"
    ? new Date(value).toLocaleDateString()
    : value;
  return (
    <div className="field">
      <label className="capitalize">{name.replaceAll("_", " ")}</label>
      {name === "family_members" ? (
        <textarea
          style={{
            resize: "none",
            background: "#fff",
          }}
          className={`register-field`}
          name={name}
          rows={value.length}
          disabled
          value={
            allValues.additional_joining === "false" || inputValue === ""
              ? "N/A"
              : inputValue === "false"
              ? "No"
              : inputValue === "true"
              ? "Yes"
              : inputValue
          }
        />
      ) : (
        <input
          type="text"
          className={`register-field`}
          name={name}
          disabled
          value={
            inputValue === ""
              ? "N/A"
              : inputValue === "false"
              ? "No"
              : inputValue === "true"
              ? "Yes"
              : inputValue
          }
        />
      )}
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
const KidsField = ({ setFieldValue, kids, setKids }) => {
  useEffect(() => {
    setFieldValue("family_members", kids);
  }, [kids, setFieldValue]);
  return (
    <>
      <button
        className="btn-kids mt-0"
        type="button"
        onClick={() =>
          setKids((prev) => [
            ...prev,
            { name: "", age: "", relationship: "Spouse", gender: "male" },
          ])
        }
      >
        Add family members
      </button>
      {kids.map((item, i) => (
        <div className="kids-container" key={i}>
          <AiFillCloseCircle
            color="#303030"
            className="close-btn"
            onClick={() => {
              const copy = [...kids];

              copy.splice(i, 1);
              setKids(copy);
            }}
          />
          <div>
            <div className="field">
              <label className="capitalize" htmlFor={"relationship"}>
                Relationship <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="register-field"
                onChange={(e) => {
                  const newArray = [...kids];
                  const newItem = {
                    name: kids[i].name,
                    age: kids[i].age,
                    relationship: e.currentTarget.value,
                    gender: kids[i].gender,
                  };

                  newArray[i] = newItem;
                  setKids(newArray);
                }}
              >
                {[
                  { value: "Spouse", label: "Spouse" },
                  { value: "Child", label: "Child" },
                  { value: "Helper", label: "Helper" },
                ].map((o) => (
                  <option value={o.value} key={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="capitalize" htmlFor={"relationship"}>
                Gender <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="register-field"
                onChange={(e) => {
                  const newArray = [...kids];
                  const newItem = {
                    name: kids[i].name,
                    age: kids[i].age,
                    relationship: kids[i].relationship,
                    gender: e.currentTarget.value,
                  };

                  newArray[i] = newItem;
                  setKids(newArray);
                }}
              >
                {[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ].map((o) => (
                  <option value={o.value} key={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="capitalize" htmlFor={`name-${i + 1}`}>
                Name {i + 1}
              </label>
              <input
                type="text"
                className={`register-field`}
                onChange={(e) => {
                  const newArray = [...kids];
                  const newItem = {
                    name: e.currentTarget.value,
                    age: kids[i].age,
                    relationship: kids[i].relationship,
                    gender: kids[i].gender,
                  };

                  newArray[i] = newItem;
                  setKids(newArray);
                }}
              />
            </div>

            <div className="field">
              <label className="capitalize" htmlFor={`name-${i + 1}`}>
                Age
              </label>
              <input
                type="number"
                min="1"
                max="99"
                maxLength="2"
                onInput={(event) =>
                  (event.target.value = event.target.value.slice(
                    0,
                    event.target.maxLength
                  ))
                }
                className={`register-field`}
                onChange={(e) => {
                  const newArray = [...kids];
                  const newItem = {
                    age: e.currentTarget.value,
                    name: kids[i].name,
                    relationship: kids[i].relationship,
                    gender: kids[i].gender,
                  };

                  newArray[i] = newItem;
                  setKids(newArray);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
const Register = () => {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  const firestore = useFirestore();
  const col = collection(firestore, "registrations");
  const [kids, setKids] = useState([
    { name: "", age: "", relationship: "Spouse", gender: "male" },
  ]);

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
            nickname: "",
            gender: "male",
            nric_passport: "",
            dob: "",
            contact_no: "",
            marital_status: "single",
            service_location: "Kuchai",
            pastoral_team: "Wonderkids",
            invited_by: "pastoral",
            ministry_team: "",
            additional_joining: "false",
            additional_bed: "false",
            family_members: [],
          }}
          validationSchema={Yup.object().shape({
            nickname: Yup.string().required("Required."),
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
            additional_joining: Yup.string().when("marital_status", {
              is: "married",
              then: (schema) => schema.required("Required."),
            }),
            family_members: Yup.array().of(
              Yup.object({
                name: Yup.string().required(),
                age: Yup.number().required(),
                gender: Yup.string().required(),
                relationship: Yup.string().required(),
              })
            ),
            additional_bed: Yup.string().when("additional_joining", {
              is: "true",
              then: (schema) => schema.required("Required."),
            }),
          })}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleSubmit(
              col,
              {
                ...values,
                family_members: values.additional_joining
                  ? values.family_members
                  : [],
                user_id: user.sub,
              },
              () => {
                actions.setSubmitting(false);
                actions.resetForm();
                setPage(1);
                alert("Submitted Successfully! 🚀 See you there!");
              }
            );
            // console.log({ ...values, userId: user.sub });
            // alert(JSON.stringify({ ...values, userId: user.sub }, null, 2));
          }}
        >
          {({ errors, values, setFieldValue, validateForm, isSubmitting }) => (
            <Form className="form">
              {page === 1 ? (
                <>
                  <h2>Personal Info</h2>
                  <FormField name={"full_name_(en)"} errors={errors} />
                  <FormField name={"full_name_(chi)"} errors={errors} />
                  <FormField name={"nickname"} errors={errors} />
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
                    values={values}
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
                        value: "recommendation",
                        label: "Recommendation - Next CGL by Dec 2023",
                      },
                      {
                        value: "invitation",
                        label: "Invitation: Family Members / Helpers etc.",
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
                          if (values.marital_status === "married") {
                            return prev + 1;
                          } else return 4;
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

                  {values.additional_joining === "true" && (
                    <div>
                      <KidsField
                        kids={kids}
                        setKids={setKids}
                        errors={errors}
                        name={"family_members"}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  )}

                  {values.additional_joining === "true" && (
                    <SelectField
                      name={"additional_bed"}
                      label="Do you need an additional bed? (+RM50)"
                      options={[
                        { value: false, label: "No" },
                        { value: 1, label: "1" },
                        { value: 2, label: "2" },
                      ]}
                    />
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
                <>
                  <h2>Your info</h2>
                  {Object.entries(values).map(([key, value]) => (
                    <DetailsField
                      key={key}
                      name={key}
                      value={value}
                      allValues={values}
                    />
                  ))}
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
                      onClick={() =>
                        setPage((prev) => {
                          if (values.marital_status === "married") {
                            return prev - 1;
                          } else return 2;
                        })
                      }
                      className="btn-retreat secondary mt-0"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-retreat mt-0"
                      disabled={isSubmitting}
                      style={{ width: "100%" }}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Register;
