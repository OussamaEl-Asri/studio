import {SubmitHandler } from "react-hook-form";
import { loginFomatOut, signupFormatout } from "../definitions"; 

export const onSubmitLogin: SubmitHandler<loginFomatOut> = (data) => console.log(data);
export const onSubmitSignup: SubmitHandler<signupFormatout> = (data) => console.log(data);