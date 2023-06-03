import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/auth-context';

const ProfileForm = () => {

  const authCtx = useContext(AuthContext);

  const idToken = authCtx.token;

  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordInputRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC3m7TaFH0g6HfvWkll_-1VYNuNo1t5sV4", {
      method: 'POST',
      body: JSON.stringify({
        idToken: idToken,
        password: newPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if(res.ok){
        return res.json();
      }
      else {
        return res.json().then((data) => {
          let errorMessage = 'Authentication Failed!';

          throw new Error(errorMessage)
        })
      }
      
    }).then((data) => {
      console.log(data)
    }).catch((err) => {
      alert(err.message)
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
