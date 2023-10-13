
import { Link } from "react-router-dom"

function Dashboard({ token }) {

    function handleLogOut() {
        sessionStorage.removeItem('token')
        navigate('/login')
      }
      
  return (
    <div>
        <h1>Dashboard</h1>
        <h3>Welcome, {token.user.user_metadata.full_name}✨🎉</h3>
        <Link to='/login' onClick={handleLogOut}>Log out</Link>
    </div>
  )
}

export default Dashboard