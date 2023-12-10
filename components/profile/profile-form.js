import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    if (oldPassword.length < 7) {
      alert("Old password must be at least 6 characters long");
      return;
    }
    if (newPassword.length < 7) {
      alert("New password must be at least 6 characters long");
      return;
    }
    if (newPassword === oldPassword) {
      alert("New password must be different from old password");
      return;
    }
    props.onChangePassword({
      oldPassword,
      newPassword,
    });
    
    

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
