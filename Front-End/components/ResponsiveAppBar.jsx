import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import useUser from '../src/useUser';
import './ResponsiveAppBar.css'; // Import your CSS file

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen}) {
    const { userInfo, handleLogout } = useUser();

    let pages = [];
    const pageNames = ['Menú','Productos', 'Transacciones', 'Inventario', 'Reportes'];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if(userInfo.userTypeName === 'ADMINISTRADOR'){
        pages = ['menu','admin-productos', 'transacciones', 'inventario', 'reportes'];
    } else {
        pages = ['menu','productos'];
    }


    return (
        <div>
                <div id="mySidebar" className={`sidebar ${isSidebarOpen ? '' : 'closed'}`} style={{ background: "#fbd23a", height: '100%', width: '250px'}}>
                    <div className="sidebar-header">
                        <img
                            src="../src/assets/img/pollomaxlogo.jpg"
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "30px",
                                margin: "0px 0px 0px 30px"
                            }}
                            alt="Logo"
                        />
                    </div>
                    <ul className="list-unstyled components" style={{ '--bs-primary': '#fbd23a', '--bs-primary-rgb': '251,210,58', background: '#fbd23a', borderColor: '#fbd23a' }}>
                        {pages.map((page, index) => (
                            <li key={index} style={{ backgroundColor: '#fbd23a', color: 'var(--bs-emphasis-color)', fontSize: '20px', fontFamily: 'Allerta', fontWeight: 'bold' }}>
                                <NavLink to={`/${page}`} className={({isActive}) => `${isActive === true ? 'sidebar-active': ''}`}>{pageNames[index]}</NavLink>
                            </li>
                        ))}
                        <div>
                            <button className='close-session' onClick={handleLogout}>
                                Cerrar sesión, {userInfo.username}
                            </button>
                        </div>
                    </ul>
                </div>
        </div>
    );
}

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired,
};


