import React, { useContext, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Page } from "../types/types";
import { useNavigate } from "react-router-dom";

const LoginPage: Page = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  const [errors, setErrors] = useState({ email: false, password: false });

  const submit = () => {
    if (!email) setErrors((errs) => ({ ...errs, email: true }));
    if (!password) setErrors((errs) => ({ ...errs, password: true }));

    if (email && password) {
      // make request
    }
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src={`/layout/images/logo-${layoutConfig.colorScheme === "light" ? "dark" : "white"}.svg`}
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        />
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background: "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: "53px" }}>
            <div className="text-center mb-5">
              <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
              <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
              <span className="text-600 font-medium">Sign in to continue</span>
            </div>

            <div>
              <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <InputText
                id="email1"
                type="text"
                placeholder="Email address"
                className={"w-full md:w-30rem mb-5 " + (errors.email ? "p-invalid" : "")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberme1"
                    checked={rememberMeChecked}
                    onChange={(e) => setRememberMeChecked(e.checked ?? false)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
                <a
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Forgot password?
                </a>
              </div>
              <Button label="Sign In" className="w-full p-3 text-xl" onClick={submit}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
