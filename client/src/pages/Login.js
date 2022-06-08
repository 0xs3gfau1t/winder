import React,{useState, useEffect} from 'react';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo, FormRow, Alert } from '../components';


const initialState = {
  name: '',
  lastName:'',
  email: '',
  password: '',
  isMember: true,
  showAlert:false,
  isLoading: false
}

const Login = () => {
  const [values, setValues] = useState(initialState)

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const onSubmit = (e)=>{
    e.preventDefault(); 
    const {name, email, password, isMember} = values;
    if(!email|| !password || (!isMember && !name)){
      displayAlert();
      return
    }
    console.log(values);
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {values.showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <div className='form-col'>
          <FormRow
            type='text'
            name='name'
            labelText='First Name'
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='Last Name'
            value={values.lastName}
            handleChange={handleChange}
          />
          </div>
        )}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
      {values.isMember ? 'Not a member yet?' : 'Already a member?'}

      <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? 'Register' : 'Login'}
      </button>
    </p>
      </form>
    </Wrapper>
  )
}

export default Login;
