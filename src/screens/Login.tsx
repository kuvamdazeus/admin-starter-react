import React, { useContext, useRef, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Page } from "../types/types";
import { useNavigate } from "react-router-dom";
import { fetcher } from "@/usefetcher";
import { Toast } from "primereact/toast";

const LoginPage: Page = () => {
  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const { postData, isLoading } = fetcher.usePOST<any>("/admin/login", {
    onSuccess: (resData) => {
      localStorage.setItem("auth_token", resData.data.accessToken);
      navigate("/dashboard");
    },
    onError: async ({ fetchResponse }) => {
      const data = await fetchResponse.json();

      toast.current?.show({ severity: "error", summary: "Error", detail: data.message });
    },
  });

  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { layoutConfig } = useContext(LayoutContext);

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  const [errors, setErrors] = useState({ email: false, password: false });

  const submit = () => {
    const errs = { email: false, password: false, userName: false };

    if (!emailId) errs.email = true;
    if (!password) errs.password = true;

    if (Object.values(errs).includes(true)) {
      setErrors(errs);
      return;
    }

    postData({ emailId, password });
  };

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center">
        {/*<img*/}
        {/*  src={`/layout/images/logo-${layoutConfig.colorScheme === "light" ? "dark" : "white"}.svg`}*/}
        {/*  alt="Sakai logo"*/}
        {/*  className="mb-5 w-6rem flex-shrink-0"*/}
        {/*/>*/}
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
                value={emailId}
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
            </div>
            <Button
              disabled={isLoading}
              label="Sign In"
              className="w-full p-3 text-xl mb-5"
              onClick={submit}
            ></Button>
            <center>
              <a href="/register" className="font-medium">
                Don't have an account? Create one here.
              </a>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
