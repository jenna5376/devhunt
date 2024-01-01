import React, { useState } from 'react'
import gradient from '../../assets/gradient.png'
import dIcon from '../../assets/devfolio-icon-black.svg'
import Button from '../../components/Button'
import InputField from '../../components/InputField'

const SignUp = () => {

    const [email, setEmail] = useState('');

  return (
    <div className='signup'>
        <div className='signup__block'>
            <img className='signup__logo' src={dIcon} alt="" />
            <h1>Sign Up On Devhunt</h1>
            <p>Join our community of talented developers and find inspirations for your next project</p>
            <form className='signup__form'>
            <Button
                color='secondary'
                text='Sign up with Google'
            />
            <Button
                color='secondary'
                text='Sign up with GitHub'
            />
            <p>or</p>
            <InputField
                title='Email Address'
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
