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
    console.log(e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <Wrapper className='full-page'>
      <form className={`form ${values.isMember?'max-w-md':'max-w-2xl'}`} onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {values.showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <div className='grid grid-cols-2 gap-4'>
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
        {!values.isMember && 
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid grid-row-2'>
            <label htmlFor='gender' className='form-label'>Gender</label>
            <div onChange = {handleChange} className="flex">
              <div className="flex items-center mr-4">
                <input id="gender" type="radio" value="male" name="gender" defaultChecked className="radio"/>
                <label htmlFor="gender" className="ml-2">Male</label>
            </div>
              <div className="flex items-center mr-4">
                  <input id="gender" type="radio" value="female" name="gender" className="radio"/>
                  <label htmlFor="gender" className="ml-2">Female</label>
              </div>
              <div className="flex items-center mr-4">
                  <input id="gender" type="radio" value="other" name="gender"  className="radio"/>
                  <label htmlFor="gender" className="ml-2">Other</label>
              </div>
          </div>
        </div>
        <div className='grid grid-row-2'>
            <label htmlFor='age' className='form-label'>Age</label>
            <input type="number" name="age" size={2} min={18} max={100} className="w-0 form-input"/>
          </div>    
        </div>
        }
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
        {!values.isMember && (
          <FormRow
          type='password'
          labelText='Confirm Password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />)}
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
