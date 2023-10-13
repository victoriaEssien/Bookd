

import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';

function HeroSection() {
  return (
    <div>
        <h1>Streamline Your Service Booking Experience</h1>
        <p>Bookd is a powerful and user-friendly platform designed to simplify the process of booking and managing services provided by entrepreneurs like photographers, makeup artists, and many more.</p>
        <Link to='/register'>
            <Button>Get Started</Button>
        </Link>
    </div>
  )
}

export default HeroSection