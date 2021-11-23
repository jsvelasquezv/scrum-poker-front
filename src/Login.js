import React, { useState } from 'react';
import { nanoid } from 'nanoid';

function Login({ setLoggedUser }) {
  const [userName, setUserName] = useState();

  async function handleLogIn() {
    const user = { userName, userId: nanoid() };
    await localStorage.setItem('loggedUser', JSON.stringify(user));

    setLoggedUser(user);
  }

  return (
    <div>
      <label>User name</label>
      <input
        name="name"
        onChange={e => {
          setUserName(e.target.value);
        }}
      />
      <button onClick={handleLogIn}>Log in</button>
    </div>
  );
}

export default Login;
