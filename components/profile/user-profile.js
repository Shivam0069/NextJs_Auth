import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
// { getSession } from "next-auth/client";
function UserProfile() {
  // Redirect away if NOT auth
  //It takes miliSec to figure it out whether it is auth or not
  // const [isLoading, setIsLoaing] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth"; //Redirecting if not authenticated..
  //     } else {
  //       setIsLoaing(false);
  //     }
  //   });
  // }, []);
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading..</p>;
  // }

  async function changePasswordHandler(passwordData) {
    const res = await fetch("/api/user/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword = {changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
