import React, { useState, useEffect } from 'react'

import './log.css'

export const LoginMain = (props) => {
  const [DriverID, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  // console.log(DriverID, Password)

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      // navigate("/dashboard");
    }
  }, [])
  // document.addEventListener('keydown', keyDownHandler);

  // return () => {
  //   document.removeEventListener('keydown',keyDownHandler)
  // }

  async function login() {
    let result = await fetch(
      'https://driverportalapi.adsdev.uk/1/Authentication',
      {
        method: 'Post',
        mode: 'cors',
        body: JSON.stringify({ DriverID, Password }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    result = await result.json()
    console.log(result)
    if (result.response) {
      localStorage.setItem('result', JSON.stringify(result))

      window.location.href = 'upcomingrides'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Login</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <label />
          <input
            type="text"
            placeholder="Enter Driver ID"
            id="dname"
            name="dname"
            autoFocus="autofocus"
            required
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <br />

          <label />
          <input
            type="password"
            placeholder="Enter PIN"
            id="piname"
            name="piname"
            required
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <br />
          <button type="submit" onClick={login}>
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginMain
