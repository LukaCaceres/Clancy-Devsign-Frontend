import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Limpiar mensaje de error
        setError('');

        // Petición al backend
        try {
            const response = await fetch('https://clancydevsign-backend.onrender.com/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    correo: email,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json'  // Asegurarse de que el body se interprete como JSON
                }
            });

            const data = await response.json();
            if (response.ok) {
                // Guardar token en localStorage
                localStorage.setItem('token', data.token);


                // Redirigir al usuario a la página principal (home)
                navigate('/');
            } else {
                // Mostrar mensaje de error si el login falla
                setError(data.msg || 'Correo o contraseña incorrecta');
            }
        } catch (error) {
            setError('Error de conexión. Inténtalo más tarde.');
        }
    };

    return (
        <>
            <div className="login-page-container d-flex flex-column flex-xl-row justify-content-center align-items-center gap-2 w-100 px-4">
                <img src="https://i.postimg.cc/vmPWd0Ht/login-bg.jpg" alt="Imagen de fondo" className='d-none d-xl-block img-bg' />
                <section className="login-section d-flex justify-content-center align-items-center">
                    <div className="form-container d-flex flex-column justify-content-evenly align-items-center text-black">
                        <h2 className="fw-bold">Iniciar sesión</h2>
                        {error && <p className="text-danger">{error}</p>}
                        <form className="inputs-container w-75 d-grid gap-2" onSubmit={handleSubmit}>
                            <div className="item">
                                <label>Correo electrónico</label>
                                <input
                                    type="email"
                                    placeholder="ejemplo@gmail.com"
                                    className="form-control mb-3 p-2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    minLength='2'
                                    maxLength='20'
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="item">
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="*********"
                                    className="form-control mb-3 p-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength='6'
                                    maxLength='20'
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn w-100 fs-5 py-1">
                                Iniciar sesión
                            </button>
                        </form>

                        <div className="links-container d-flex gap-2 gap-xl-4 mt-2 mt-xl-0">
                            <Link to="/recuperar-pass" className="links">Olvidé mi contraseña</Link>
                            <Link to="/registro" className="links">Crear una cuenta</Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LoginPage;