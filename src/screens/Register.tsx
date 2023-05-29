import React, { useContext, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Page } from "../types/types";
import { useNavigate } from "react-router-dom";
import { fetcher } from "@/usefetcher";

const RegisterPage: Page = () => {
  const navigate = useNavigate();

  const { postData, isLoading } = fetcher.usePOST("/admin/register", {
    onSuccess: () => {
      navigate("/");
    },
  });

  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { layoutConfig } = useContext(LayoutContext);

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  const [errors, setErrors] = useState({ email: false, password: false, userName: false });

  const submit = () => {
    const errs = { email: false, password: false, userName: false };

    if (!emailId) errs.email = true;
    if (!password) errs.password = true;
    if (!userName) errs.userName = true;

    if (Object.values(errs).includes(true)) {
      setErrors(errs);
      return;
    }

    postData({ userName, emailId, password });
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background: "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: "53px" }}>
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
              <span className="text-600 font-medium">Sign up to continue</span>
            </div>

            <div className="mb-5">
              <label htmlFor="username1" className="block text-900 text-xl font-medium mb-2">
                Username
              </label>
              <InputText
                id="username1"
                type="text"
                placeholder="Username"
                className={"w-full md:w-30rem mb-5 " + (errors.userName ? "p-invalid" : "")}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ padding: "1rem" }}
              />

              <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <InputText
                id="email1"
                type="text"
                placeholder="Email address"
                className={"w-full md:w-30rem mb-5 " + (errors.email ? "p-invalid" : "")}
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                style={{ padding: "1rem" }}
              />

              <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                Password
              </label>
              <Password
                inputId="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                toggleMask
                className={"w-full mb-5 " + (errors.password ? "p-invalid" : "")}
                inputClassName="w-full p-3 md:w-30rem"
              ></Password>
            </div>
            <Button
              disabled={isLoading}
              label="Sign Up"
              className="w-full p-3 text-xl mb-5"
              onClick={submit}
            ></Button>
            <center>
              <a href="/" className="font-medium">
                Already have an account? Sign in here.
              </a>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
