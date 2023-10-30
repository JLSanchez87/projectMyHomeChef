import Menu from "@/component/menu";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userName = event.currentTarget.userName.value;
    const userPassword = event.currentTarget.userPassword.value;

    console.log(userName);
    if (!userName && !userPassword) {
      return;
    }
    console.log(userPassword);
    try {
      const response = await axios.post("http://localhost:3001/login", {
        name: userName,
        password: userPassword,
      });
      setError(null);

      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      setError("Something went wrong");
    }
  }
  return (
    <div className="bg-login">
      <Menu />

      <form onSubmit={handleSubmit} className="login-page">
        <h1>Login</h1>
        <label htmlFor="name">Username</label> <br></br>
        <input type="text" id="name" name="userName" /> <br></br>
        <label htmlFor="password">Password</label> <br></br>
        <input type="password" id="password" name="userPassword" /> <br></br>
        <button type="submit" className="button-login">
          Login
        </button>
        {error ? <p className="error-text">You made a mistake</p> : ""}
      </form>
    </div>
  );
}
