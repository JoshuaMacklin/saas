import { LuFilePlus2 } from "react-icons/lu";
import '../components/css/Form.css'

function Form({ onChange, value, onSubmit }) {
  return (
    <div className = "formContainer" data-testid="form-element">
      <form id="noteForm" onSubmit={onSubmit}>
        <textarea
          value={value}
          required
          placeholder="Write A Note!"
          onChange={onChange}
        />
        <button
        className="noteButton" 
        type='submit'
        role="form-element"
        >
        <LuFilePlus2 className="customButton"></LuFilePlus2>
        </button>
      </form>
    </div>
  )
}

export default Form