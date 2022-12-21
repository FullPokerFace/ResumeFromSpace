import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setIsLoading, setUser } from "../../store/slices/appSlice";
import { TextInput } from "../Form/common/TextInput";
import PrimaryButton from "../_common/PrimaryButton";

const LoginOptions = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const dispatch = useDispatch();

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
    <>
      <hr />
      <TextInput value={email} title="Email" onChange={handleEmailChange} />
      <TextInput value={pass} title="Password" onChange={handlePassChange} />
      <PrimaryButton label="Login" onClick={handleLoginClick} />
    </>
  );
};

export default LoginOptions;
