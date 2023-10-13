
import { Link, useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function Dashboard({ token }) {
  let navigate = useNavigate()

    function handleLogOut() {
        sessionStorage.removeItem('token')
        navigate('/login')
      }
      
  return (
    <div className="main">
        <h1>Dashboard</h1>
        <Link to='/login' onClick={handleLogOut}>Log out</Link>

        <div className="info-cards-grid">
          <div className="info-card">
          <div className="user-details">
            <img src="https://previews.123rf.com/images/mimagephotography/mimagephotography1601/mimagephotography160100473/51497473-closeup-portrait-of-smiling-young-black-woman-against-white-background.jpg" alt="Hero image" className="profile-photo"/>
              <div className="user-info">
                <p className="username">{token.user.user_metadata.full_name}</p>
                <p className="nickname">@{token.user.user_metadata.user_name}</p>
                <button className="book-btn">Book now</button>
              </div>
          </div>
            <h5 className="about-header">About me</h5>
            <p>I am a photographer who likes to have fun ya know? I've been taking pictures for forever now and I hope to keep taking more!!!</p>
          </div>

          <div className="info-card">
            <h5 className="featured-header">Featured Content</h5>
            <p>Upgrade your account in order to upload content for potential customers to see what thee can do</p>
            <button>Uprade account</button>
          </div>

          <div className="info-card">
            Pricing List
          </div>

          <div className="info-card">
            Social media links
          </div>
        </div>
    </div>
  )
}

export default Dashboard