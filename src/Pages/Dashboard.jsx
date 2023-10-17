
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import BioForm from "./Forms/BioForm";

function Dashboard({ token }) {
  let navigate = useNavigate()

  const [showBioForm, setShowBioForm] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  // Initialize local storage key
  const localStorageKey = "selectedFileName";

    // Load the selectedFileName from local storage on component load
    useEffect(() => {
      const storedFileName = localStorage.getItem(localStorageKey);
      if (storedFileName) {
        setSelectedFileName(storedFileName);
      } else {
        // Set a default file name if local storage is empty
        const defaultFileName = "default-pfp.jpg";
        setSelectedFileName(defaultFileName);
        // Store the default file name in local storage
        localStorage.setItem(localStorageKey, defaultFileName);
      }
    }, []);


  const handleShowBioForm = () => {
    setShowBioForm(true);
  };

  const handleCloseBioForm = () => {
    setShowBioForm(false);
  };

  const handleFileSelect = (fileName) => {
    setSelectedFileName(fileName);

    // Store the selectedFileName in local storage
    localStorage.setItem(localStorageKey, fileName);
  };


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
            <img src={`https://wnybnmsuusczkipaaorn.supabase.co/storage/v1/object/public/image-uploads/dps/${selectedFileName}`} alt="profile photo" className="profile-photo"/>
              <div className="user-info">
                <p className="username">{token.user.user_metadata.full_name}</p>
                <p className="nickname">@{token.user.user_metadata.user_name}</p>
                <div>
                <button onClick={handleShowBioForm} className="book-btn">Edit details</button>
                <BioForm show={showBioForm} onHide={handleCloseBioForm} onFileSelect={handleFileSelect} />
                </div>
              </div>
          </div>
            <h5 className="about-header">About me</h5>
            <p>I am a photographer who likes to have fun ya know? I've been taking pictures for forever now and I hope to keep taking more!!!</p>
          </div>

          <div className="info-card">
            <h5 className="featured-header">Featured Content</h5>
            <p>Upgrade your account in order to upload content for potential customers to see what thee can do</p>
            <button>Upgrade account to unlock</button>
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