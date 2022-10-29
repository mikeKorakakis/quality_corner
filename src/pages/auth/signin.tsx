import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

const Signin: NextPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "bob@test.com",
    password: "1234",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
    //   redirect: false
    });
    console.log(res)
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Signin</h1>
        <input
          type="email"
          placeholder="bob@test.com"
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          value={userInfo.email}
        />
        <input
          type="password"
          placeholder="******"
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          value={userInfo.password}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Signin;
