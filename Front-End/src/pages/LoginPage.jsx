import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import useUser from '../useUser';
import Popup from '../../components/PopUp';

export default function LoginPage() {
  const nav = useNavigate();
  const [password, setPassStyle] = useState('password')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const {userInfo, setUserInfo} = useUser();
  const [color, setColor] = useState({
    color: 'rgba(117, 42, 116, 1)',
    borderColor: 'rgba(117, 42, 116, 1)',
    borderTopColor: 'rgba(117, 42, 116, 1)',
    borderRightColor: 'rgba(117, 42, 116, 1)',
    borderBottomColor: 'rgba(117, 42, 116, 1)',
  })

  const [popupMessage, setPopupMessage] = useState('');
  const [popupImage, setPopupImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async () => {
    const loginData = {
      user,
      pass
    }

    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      console.log('Response:', response);

      if (response.status === 200) {
        console.log(userInfo)
        if(response.data){
          setUserInfo(response.data);
          sessionStorage.setItem('userInfo', JSON.stringify(response.data));
          console.log(userInfo)
        }        
        // Redirect to home page
        nav("/menu")
      } else {
        setPopupImage("../src/assets/img/error.png");
        setPopupMessage('Login failed:' + response.data.message);
        setShowPopup(true);
      }
    } catch (error) {
      setPopupImage("../src/assets/img/error.png");
      setPopupMessage(error.response.data.message);   
      setShowPopup(true);
    }
  }
  

  function handleCheck(){
    if(password === 'password'){
      setPassStyle('text')
    }else{
      setPassStyle('password')
    }
    }

  
  const handleClosePopup = () => {
    setShowPopup(false);
  }

  function handleMouseUp(){
    setColor({
      color: 'rgba(117, 42, 116, 1)',
      borderColor: 'rgba(117, 42, 116, 1)', 
      borderTopColor: 'rgba(117,42,116, 1)', 
      borderRightColor: 'rgba(117,42,116,1)', 
      borderBottomColor: 'rgba(117,42,116,1)',
    })
  }

  function handleMouseDown(){
    setColor({
      color: 'rgba(155, 80, 154, 1)',
      borderColor: 'rgba(155, 80, 154, 1)', 
      borderTopColor: 'rgba(155,80,154, 1)', 
      borderRightColor: 'rgba(155, 80,154,1)', 
      borderBottomColor: 'rgba(155, 80,154,1)',
    })
  }

  function handleHover(){
    setColor({
      color: 'rgba(155, 80, 154, 0.5)',
      borderColor: 'rgba(155, 80, 154, 0.5)', 
      borderTopColor: 'rgba(155,80,154, 0.5)', 
      borderRightColor: 'rgba(155, 80,154,0.5)', 
      borderBottomColor: 'rgba(155, 80,154,0.5)',
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div id="login-container" className="text-center d-lg-flex flex-fill justify-content-center align-items-center align-content-center align-self-center flex-nowrap justify-content-lg-center align-items-lg-center" style={{background: 'rgb(250, 240, 210)', borderColor: 'rgb(117, 42, 116)', borderTopColor: 'rgb(117, 42, 116)', borderRightColor: 'rgb(42, 116, 42)', borderBottomColor: 'rgb(42, 116, 116)', borderLeftColor: 'rgb(42, 116, 42)'}}  >
      <form id='login-form' style={{ background: 'rgb(251, 225, 147)', width: 'auto', height: 'auto', padding: '75px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginTop: '30px' }}>
        <div style={{ width: '200px', textAlign: 'center' }}>
          <div style={{ textAlign: 'center' }}><img style={{ height: '100px', borderRadius: '10px', width: '100px', background: 'url(\'src/assets/img/pollomaxlogo.jpg\')', minWidth: 'auto', borderWidth: '10px' }} src="src/assets/img/pollomaxlogo.jpg" alt="Logo"/></div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '10px' }}>Iniciar Sesión</p>
          </div>
          <div style={{ marginTop: '30px' }}>
            <p style={{ marginTop: '10px', fontFamily: 'Allerta' }}>Usuario:</p>
          </div>
          <div>
            <div className="d-flex justify-content-center" style={{ borderRadius: '10px', color: 'rgb(157,153,153)', background: '#dadada', padding: '0px', border: '2px solid rgb(0,0,0)'}}>
              <input value={user} onChange={(e) => setUser(e.target.value)} type="text" style={{ color: 'rgb(0, 0, 0)', background: 'rgba(255,255,255,0)', borderColor: 'transparent', outline: 'none',  padding: '10px', borderRadius: '10px'}} onKeyDown={handleKeyDown} /></div>
          </div>
          <div>
            <p style={{ marginTop: '10px', fontFamily: 'Allerta' }}>Contraseña:</p>
          </div>
          <div className="d-flex justify-content-center" style={{ position: 'relative', borderRadius: '10px', color: 'rgb(157,153,153)', background: '#dadada', padding: '0px', border: '2px solid rgb(0,0,0)', alignItems: 'center'}}>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type={password} style={{ color: 'rgb(0,0,0)', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none', padding: '10px', borderRadius: '10px', marginRight: '25px', width:'175px'}} onKeyDown={handleKeyDown} />
            <input name='viewPass' type='checkbox' onChange={handleCheck} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgb(255,255,255)', height: '20px', width: '20px'}}/>
        </div>
          <div><button form='login-form' onClick={handleLogin} className="btn btn-primary" type="button" style={{ marginTop: '20px', fontFamily: 'Allerta', background: color.color, borderWidth: '5px', borderColor: color.borderColor, borderTopColor: color.borderTopColor, borderRightColor: color.borderRightColor, borderBottomColor: color.borderBottomColor, outline: 'none' }} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseOver={handleHover} onMouseLeave={handleMouseUp}>Entrar</button></div>
        </div>
        <div>
        </div>
      </form>
      {showPopup && <Popup image={popupImage} message={popupMessage} onClose={handleClosePopup} />}
      </div>
  );
}

