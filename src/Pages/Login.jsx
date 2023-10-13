
import supabase from "../client"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function Login({setToken}) {

  let navigate = useNavigate()
  const [formError, setFormError] = useState(null)
  const [authError, setAuthError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',password: ''
  })

  const [passwordVisible, setPasswordVisible] = useState(false)

  useEffect(() => {
    let timer
    if(authError) {
      timer = setTimeout(() => {
        setAuthError(null)
      }, 3000)
    }
    return() => {
      clearTimeout(timer)
    }
  }, [authError])

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let isFormEmpty = false
    for(const field in formData) {
      if (!formData[field]) {
        isFormEmpty = true
        break;
      }
    }
    if (isFormEmpty) {
      setFormError('Please fill in all fields')
      setTimeout(() => {
        setFormError(null)
      }, 3000)
    } else {
      try {

        setIsLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        setIsLoading(false)
        if (error) throw error
        console.log(data)
        setToken(data)
        navigate('/dashboard')
    
      } catch(error) {
        setAuthError("Invalid login details")
        setIsLoading(false)
      }
    }
  
  }

  function handlePasswordVisibility() {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className="auth-form-container">
      <Form>
      <h3 className="form-heading">Welcome back!</h3>
      {authError && <p className="error">{authError}</p>}
        {formError && <p className="error">{formError}</p>}
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label className="label">Email Address</Form.Label>
            <Form.Control className="input" type="email" name="email" size="lg" placeholder="name@example.com" onChange={handleChange} required/>
        </Form.Group>

      <Form.Label className="label" htmlFor="pass">Password</Form.Label>
        <InputGroup className="mb-4" size="lg">
            <Form.Control id="pass" className="pass-input" type={passwordVisible ? "text" : "password"} name="password" size="lg" onChange={handleChange} required/>
            <InputGroup.Text>
              <FontAwesomeIcon className="password-icon" onClick={handlePasswordVisibility} icon={passwordVisible ? faEye : faEyeSlash} />
        </InputGroup.Text>
        </InputGroup>
        
        <div className="d-grid">
            <button className="auth-btn" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Loading..." : "Log in"}
            </button>
          </div>
        <p className="helper-text">Don&apos;t have an account? <Link to="/register" className="helper-link">Register</Link></p>
      </Form>
    </div>
  )
}

export default Login