import React, { useEffect , useState } from "react";
import Login from "../LoginPage/LoginPage";
import { useNavigate } from "react-router-dom";

function Submit() {

  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
        const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, url, text }),
        credentials: 'include'
      });
      navigate('/');
    }
    catch (err) {
      alert('Error connecting to server');
    }

    
}

if (!token) {
  return (
    <>
    <Login/>
    </>
  );
}

return (
  <>
    <div>
      <div className="submit-container">
        <div className="header">Y Submit</div>

        <form className="submit-form" onSubmit={handleSubmit}>
          <label>title<br/>
            <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
          </label><br/>

          <label>url<br/>
            <input type="url" name="url" onChange={e => setUrl(e.target.value)} />
          </label><br/>

          <label>text<br/>
            <textarea name="text" rows="5" onChange={e => setText(e.target.value)}></textarea>
          </label><br/>

          <button type="submit">submit</button>
        </form>

        <p className="note">
          Leave url blank to submit a question for discussion. If there is no url, text will appear at the top of the thread. If there is a url, text is optional.
          <br />
          You can also submit via <a href="#">bookmarklet</a>.
        </p>
      </div>
    </div>
  </>
);
}
export default Submit;