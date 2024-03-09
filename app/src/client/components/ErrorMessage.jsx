import { MdError } from "react-icons/md";

function ErrorMessage({ message }) {
  const style = {
    display: 'flex',
    backgroundColor: '#ff000024',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #cf5c5c',
    color: '#f81e1e',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '15px',
    width: '400px',
    height: '50px',
    padding: '15px',
  }

  return (
    <>
      {message ? 
        (<div style={style}>
          <MdError data-testid="error-icon" style={{marginRight: '5px'}}/>
          Error: {message}
        </div>) : null
      }
    </>
  )
}

export default ErrorMessage