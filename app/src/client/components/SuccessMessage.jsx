import { FaCheckCircle } from "react-icons/fa";

function SuccessMessage({ message }) {
  const notifStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4edda',
    border: '3px solid #a0d8ad',
    color: '#155724',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '20px',
    width: '500px',
    height: '40px',
    padding: '15px',
  }

  return (
    <>
      {message ? 
        (<div style={notifStyle}>
          <FaCheckCircle data-testid="success-icon" style={{marginRight: '10px'}}/>
          {message}
        </div>) : null
      }
    </>
  )
}

export default SuccessMessage