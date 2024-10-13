import React, { useState, useEffect, useRef } from 'react';
import '../styles/navbar.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';


const navigation = [
    { name: 'Inicio', to: '/' },
    { name: 'Destacados', to: '/destacados' },
    { name: 'Contactanos', to: '/contactanos' },
    { name: 'Conocenos', to: '/conocenos' },
];

const userNav = [
    { name: 'Iniciar Sesión', to: '/login' },
    { name: 'Registrarse', to: '/registro' },
    { name: 'ayuda', to: '/ayuda' },
];

const userNavLog = [
    { name: 'Carrito', to: '/carrito', badge: true },
    { name: 'Favoritos', to: '/favoritos', badge: true },
    { name: 'ayuda', to: '/ayuda' },
];

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(false);
    const token = localStorage.getItem('token');
    const [favoritosCount, setFavoritosCount] = useState(0);
    const [carritoCount, setCarritoCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [burgerVisibility, setBurgerVisibility] = useState(false)
    const dropdownRef = useRef(null);
    const location = useLocation();

    //Dropdown Desktop
    const toggleDropdown = () => {
        setVisibility(prev => !prev);
    };

    useEffect(() => {
        setVisibility(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setVisibility(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    //Dropdown Mobile
    const toggleHamburger = () => {
        setBurgerVisibility(prev => !prev);
    }


    //obtener favoritos y carrito de un usuario
    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const response = await fetch('https://clancydevsign-backend.onrender.com/api/favorito', {
                    headers: {
                        'x-token': token,
                    },
                });
                const data = await response.json();
                const favorito = data.favorito;
                setFavoritosCount(favorito.productos.length);
            } catch (error) {
                console.error("Error al obtener los favoritos:", error);
            }
        };

        const fetchCarrito = async () => {
            try {
                const response = await fetch('https://clancydevsign-backend.onrender.com/api/carrito', {
                    headers: {
                        'x-token': token,
                    },
                });
                const data = await response.json();
                setCarritoCount(data.productos.length);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        };

        fetchFavoritos();
        fetchCarrito();
    }, [token]);

    //Busqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/resultados?query=${searchTerm}`);
        }
    };

    return (
        <>
            <nav className={`navbar-container bg-light fs-6 d-flex justify-content-between align-items-center px-4 w-100 ${burgerVisibility ? 'no-border' : ''}`}>
                <Link className="logo-container d-flex align-items-center">
                    <img src="src/assets/images/clancy-logo.webp" alt="clany devsign" className='logo-clancy' />
                    <p className='fw-semibold my-0 ms-2 clancy-p'>Clany Devsign</p>
                </Link>

                {/* Mobile */}
                <div className="hamburger-container">
                    <img src="src/assets/images/hamburger-icon.webp" alt="Icono Hamburguesa" className='hamburger-icon d-xl-none' onClick={toggleHamburger} />
                </div>
                {(burgerVisibility) ? (<div className="hamburger-dropdown d-xl-none d-flex flex-column justify-content-between align-items-center position-absolute top-100 bg-light w-100 px-4">
                    <form onSubmit={handleSearchSubmit} className="w-100">
                        <input
                            type="search"
                            name="buscar"
                            aria-label='Buscar un producto en la tienda.'
                            placeholder='Buscar...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className='form-control my-4'
                            maxLength='20'
                            minLength='1'
                            autoComplete="off"
                        />
                    </form>

                    <div className="hamburger-links-container d-flex justify-content-between align-items-center w-100 mb-4">
                        <div className="navigation-container d-flex flex-column align-items-start justify-content-evenly w-50">
                            {navigation.map((item) => {
                                return (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'nl-active' : 'nl-inactive'}`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                )
                            })}
                        </div>

                        <div className="navLog-container d-flex flex-column align-items-end justify-content-evenly w-50">
                            {token ? (
                                <>
                                    {userNavLog.map((item) => (
                                        <div className="link-badge-container gap-2 d-flex" key={item.name}>
                                            {item.badge ? ((item.name === 'Carrito') ? <p className='badge-dropdown rounded-circle d-flex align-items-center justify-content-center'>{carritoCount}</p> : <p className='badge-dropdown rounded-circle d-flex align-items-center justify-content-center'>{favoritosCount}</p>) : ''}
                                            <NavLink to={item.to} className={({ isActive }) =>
                                                `nav-link ${isActive ? 'nl-active' : 'nl-inactive'}`
                                            }>
                                                {item.name}
                                            </NavLink>

                                        </div>
                                    ))}
                                    <p
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'nl-active' : 'nl-inactive'}`
                                        }
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            window.location.reload();
                                        }}
                                    >
                                        Cerrar Sesión
                                    </p>
                                </>
                            ) : (
                                <>
                                    {userNav.map((item) => (
                                        <NavLink key={item.name} to={item.to} className={({ isActive }) =>
                                            `nav-link ${isActive ? 'nl-active' : 'nl-inactive'}`
                                        }>
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>) : ''}

                {/* Desktop */}
                <div className="d-none d-xl-flex nav-links-container justify-content-center gap-4">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'nl-active' : 'nl-inactive'}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                <div className="user-search-dropdown-container d-flex justify-content-end">


                    <div className="user-dropdown-container position-relative d-none d-xl-inline-block" ref={dropdownRef}>
                        <div className="user-search-container d-flex align-items-center gap-2">

                            <form onSubmit={handleSearchSubmit} className="d-flex">
                                <input
                                    type="search"
                                    name="buscar"
                                    aria-label='Buscar un producto en la tienda.'
                                    placeholder='Buscar...'
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className='form-control'
                                    maxLength='20'
                                    minLength='1'
                                    autoComplete="off"
                                />
                            </form>


                            <img
                                src="src/assets/images/user-logo.webp"
                                alt="icono de usuario"
                                className='logo-user '
                                onClick={toggleDropdown}
                            />
                        </div>


                        <div className={`dropdown d-none  ${visibility ? 'd-xl-flex' : ''}`}>
                            {token ? (
                                <>
                                    {userNavLog.map((item) => (
                                        <div className="link-badge-container d-flex" key={item.name}>
                                            <NavLink to={item.to} className="dropdown-item">
                                                {item.name}
                                            </NavLink>
                                            {item.badge ? ((item.name === 'Carrito') ? <p className='badge-dropdown rounded-circle d-flex align-items-center justify-content-center'>{carritoCount}</p> : <p className='badge-dropdown rounded-circle d-flex align-items-center justify-content-center'>{favoritosCount}</p>) : ''}
                                        </div>
                                    ))}
                                    <p
                                        className="dropdown-item"
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            window.location.reload();
                                        }}
                                    >
                                        Cerrar Sesión
                                    </p>
                                </>
                            ) : (
                                <>
                                    {userNav.map((item) => (
                                        <NavLink key={item.name} to={item.to} className="dropdown-item">
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavbarComponent;
