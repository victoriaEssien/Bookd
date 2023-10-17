
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { HeroSection, SignUp, VerifyEmail, Login, Dashboard, BioForm } from './index'

function LandingPage() {

    const [token, setToken] = useState(false)

    if(token) {
        sessionStorage.setItem('token', JSON.stringify(token))
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')) {
            let data = JSON.parse(sessionStorage.getItem('token'))
            setToken(data)
        }
    },[])

  return (
    <Router>
        <div>
            <Routes>
                <Route exact path="/" element={
                    <>
                        <HeroSection />
                    </>
                }>
                </Route>
                <Route path="/register" element={<SignUp />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                {token?<Route path="/dashboard" element={<Dashboard token={token}/>} />:""}
                <Route path="/edit-bio" element={<BioForm />} />
            </Routes>
        </div>
    </Router>
  )
}

export default LandingPage