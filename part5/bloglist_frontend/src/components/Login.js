import React from "react";

const LoginForm = ({username, password,
  handleLogin, setUserName, setPassword}) => {
    console.log('passform', username)
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <p>username
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUserName(target.value)}/>
        </p>
        <p>login
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}/>
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm