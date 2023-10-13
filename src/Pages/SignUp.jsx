
import supabase from "../client"
import { Link, useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"

function SignUp() {

  let navigate = useNavigate()

  const [formError, setFormError] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',email: '',password: ''
  })

  const [passwordVisible, setPasswordVisible] = useState(false)

  useEffect(() => {
    let timer
    if(formError) {
      timer = setTimeout(() => {
        setFormError(null)
      }, 3000)
    }
    return() => {
      clearTimeout(timer)
    }
  }, [formError])

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
  } else {
    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              user_name: formData.userName,
              rating: 0
            }
          }
        }
      )
      if (error) throw error
      navigate('/verify-email', {replace: true})
  
    } catch(error) {
      setFormError("Password is too short")
    }
  }

}

function handlePasswordVisibility() {
  setPasswordVisible(!passwordVisible)
}
  
  return (
    <div className="auth-form-container">
      <Form>
        {formError && <p className="error">{formError}</p>}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full Name</Form.Label>
            <Form.Control className="input" type="text" name="fullName" size="lg" placeholder="John Doe" onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Username (optional)</Form.Label>
            <Form.Control className="input" type="text" name="userName" size="lg" placeholder="John Doe" onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control className="input" type="email" name="email" size="lg" placeholder="name@example.com" onChange={handleChange} required/>
        </Form.Group>

        <Form.Label htmlFor="pass">Password (at least 6 characters)</Form.Label>
        <InputGroup className="mb-3" size="lg">
            <Form.Control id="pass" className="pass-input" type={passwordVisible ? "text" : "password"} name="password" size="lg" onChange={handleChange} required/>
            <InputGroup.Text>
              <FontAwesomeIcon className="password-icon" onClick={handlePasswordVisibility} icon={passwordVisible ? faEyeSlash : faEye} />
        </InputGroup.Text>
        </InputGroup>

        <div className="d-grid">
            <Button onClick={handleSubmit} className="contact-btn">Create Account</Button>
          </div>
        <p className="helper-text">Already have an account? <Link to="/login" className="helper-link">Log in</Link></p>
      </Form>
    </div>
  )
}

export default SignUp