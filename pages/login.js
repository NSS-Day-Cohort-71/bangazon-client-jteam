import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Input } from "../components/form-elements";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { login } from "../data/auth";
import { useUserQuery } from "../context/userQueries";
import { useMutation } from "@tanstack/react-query";


export default function Login() {
  const { setUserToken } = useUserQuery();
  const username = useRef("");
  const password = useRef("");
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.token) {
        setUserToken(data.token); // update the query state
        router.push("/");
      }
    },
  });

  const submit = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    loginMutation.mutate(user);
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box">
          <h1 className="title">Welcome Back!</h1>
          <Input id="username" refEl={username} type="text" label="Username" />
          <Input
            id="password"
            refEl={password}
            type="password"
            label="Password"
          />
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={submit}>
                Login
              </button>
            </div>
            <div className="control">
              <Link href="/register">
                <button className="button is-link is-light">Register</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: "4rem" }}>{page}</section>
    </Layout>
  );
};
