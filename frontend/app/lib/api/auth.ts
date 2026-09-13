import {SubmitHandler } from "react-hook-form";
import { loginFomatOut } from "../definitions"; 

export const onSubmit: SubmitHandler<loginFomatOut> = (data) => console.log(data);