
import supabase from "../client"
import { Link, useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import InputGroup from 'react-bootstrap/InputGroup';
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
  const [isLoading, setIsLoading] = useState(false)


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
        setIsLoading(true)
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              user_name: formData.userName,
              photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              bio: "e.g I am a makeup artist with experience in...makeup",
              rating: 0
            }
          }
        }
      )
      setIsLoading(false)
      if (error) throw error
      navigate('/verify-email', {replace: true})
  
    } catch(error) {
      setFormError("Password is too short")
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
        <h3 className="form-heading">Create a Bookd account</h3>
        {formError && <p className="error">{formError}</p>}
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label className="label">Full Name</Form.Label>
            <Form.Control className="input" type="text" name="fullName" size="lg" placeholder="John Doe" onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-4" controlId="exampleForm.ControlInput3">
            <Form.Label className="label">Username (optional)</Form.Label>
            <Form.Control className="input" type="text" name="userName" size="lg" placeholder="johnnysnaps" onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
            <Form.Label className="label">Email Address</Form.Label>
            <Form.Control className="input" type="email" name="email" size="lg" placeholder="name@example.com" onChange={handleChange} required/>
        </Form.Group>

        <Form.Label className="label" htmlFor="pass">Password</Form.Label>
        <InputGroup className="pass-container mb-2" size="lg">
            <Form.Control id="pass" className="pass-input" type={passwordVisible ? "text" : "password"} name="password" size="lg" onChange={handleChange} required/>
            <InputGroup.Text>
              <FontAwesomeIcon className="password-icon" onClick={handlePasswordVisibility} icon={passwordVisible ? faEye : faEyeSlash} />
        </InputGroup.Text>
        </InputGroup>
        <Form.Text id="passwordHelpBlock" muted>
            Your password should be a minimum of 6 characters long and must not contain spaces, special characters, or emojis.
        </Form.Text>

        <div className="d-grid">
            <button onClick={handleSubmit} className="auth-btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Create Account"}
            </button>
          </div>
        <p className="helper-text">Already have an account? <Link to="/login" className="helper-link">Log in</Link></p>
      </Form>
    </div>
  )
}

export default SignUp