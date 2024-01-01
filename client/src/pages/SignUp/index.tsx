import React, { useState } from 'react'
import gradient from '../../assets/gradient.png'
import dIcon from '../../assets/devfolio-icon-black.svg'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import google from '../../assets/google.svg'
import github from '../../assets/github.svg'

const SignUp = () => {

    const [email, setEmail] = useState('');

  return (
    <div className='signup'>
        <div className='signup__block'>
          <div className="signup__top">
            <div className="signup__icon">
              <img src={dIcon} alt="" />
            </div>
            <h1>Sign Up On Devhunt</h1>
            <p>Join our community of talented developers and find inspirations for your next project</p>
          </div>
            <div className="signup__buttons">
              <Button
                  color='secondary'
                  icon={google}
                  text='Sign up with Google'
              />
              <Button
                  color='secondary'
                  icon={github}
                  text='Sign up with GitHub'
              />
              <p className='signup__or'>or</p>
            </div>
            <form className='signup__form'>
            <InputField
                state={email}
                placeholder="Email address"
                setState={setEmail}
            />
            <Button
                text='Sign up'
            />
        </form>
        </div>
        
      <img className='signup__gradient' src={gradient} />
    </div>
  )
}

export default SignUp
