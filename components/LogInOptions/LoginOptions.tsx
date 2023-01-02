import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setIsLoading, setUser } from "../../store/slices/appSlice";
import { TextInput } from "../Form/common/TextInput";
import PrimaryButton from "../_common/PrimaryButton";

const LoginOptions = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginClick;
  };

  const handleLoginClick = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, pass }),
    };
    try {
      dispatch(setIsLoading(true));
      const response = await fetch("/login", options);
      if (response.ok) {
        const user = await response.json();
        document.cookie = `user=${String(JSON.stringify(user))}`;
        dispatch(setUser({ ...user }));
      } else {
        dispatch(setError({ message: "User not found" }));
      }
    } catch (error) {
      dispatch(setError({ message: "Server error" }));
    }
    dispatch(setIsLoading(false));
  };

  return (
    <form
      className="flex flex-col justify-center gap-4 w-full max-w-xs "
      onSubmit={handleSubmit}
    >
      <hr />
      <TextInput
        value={email}
        placeholder="Email"
        type="email"
        id="email"
        title=""
        onChange={handleEmailChange}
        autoComplete={"on"}
      />
      <TextInput
        value={pass}
        placeholder="Password"
        type="password"
        id="password"
        title=""
        onChange={handlePassChange}
        autoComplete={"on"}
      />
      <PrimaryButton label="Login" onClick={handleLoginClick} />
    </form>
  );
};

export default LoginOptions;
