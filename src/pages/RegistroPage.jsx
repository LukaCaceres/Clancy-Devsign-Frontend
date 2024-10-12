import React from 'react'
import '../styles/registro.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const RegistroPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmitRegistro = async (e) => {
        e.preventDefault();

        // Limpiar mensaje de error y success
        setError('');
        setSuccess('');

        //Validar campos

        if (!nombre || nombre.length < 2 || nombre.length > 15) {
            setError('El nombre debe tener entre 2 y 15 caracteres.');
            return;
        }

        if (!email.includes('@') || email.length > 20) {
            setError('Ingresa un correo electrónico válido.');
            return;
        }

        if (password !== controlPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Enviar los datos al backend
            const response = await fetch('https://clancydevsign-backend.onrender.com/api/usuario', {
                method: 'POST',
                body: JSON.stringify({
                    nombre: nombre,
                    correo: email,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (!response.ok) {
                setError('Error al registrar: ' + (data.msg || 'Algo salió mal'));
                return;
            }

            //Si se pudo registrar
            setSuccess('Registro exitoso.');




        }
        catch {
            setError('Error al conectar con el servidor. Intentelo más tarde.');
        }
    }
    return (
        <div className="login-page-container d-flex flex-column flex-xl-row justify-content-center align-items-center gap-2 h-100 w-100 px-4">

            <section className="registro-section d-flex justify-content-center align-items-center">
                <div className="form-container-registro d-flex flex-column justify-content-evenly align-items-center text-black">
                    <h2 className="fw-bold">Registrate</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <form className="inputs-container-registro w-75 d-grid gap-2" onSubmit={handleSubmitRegistro}>
                        <div className="item-registro">
                            <label htmlFor='username'>Nombre de Usuario</label>
                            <input
                                type="text"
                                name='username'
                                id='username'
                                placeholder="Pepito Cruz"
                                className="form-control input-registro mb-3"
                                pattern="^[A-Za-z\s]{2,20}$"
                                title='Introduce entre 2 y 20 letras'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                onInput={(e) => {
                                    // Filtrar para permitir solo letras de la A a la Z (mayúsculas o minúsculas)
                                    e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                                }}
                                minLength='2'
                                maxLength='20'
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="item-registro">
                            <label htmlFor='correo'>Correo electrónico</label>
                            <input
                                type="email"
                                name='correo'
                                id='correo'
                                placeholder="ejemplo@gmail.com"
                                className="form-control input-registro mb-3"
                                title='Introduce un correo electrónico'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                minLength='2'
                                maxLength='20'
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="item-registro">
                            <label htmlFor='pass'>Contraseña</label>
                            <input
                                type="password"
                                name='pass'
                                id='pass'
                                placeholder="*********"
                                className="form-control input-registro mb-3"
                                title='Ingresa una clave de al menos 6 caracteres.'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength='6'
                                maxLength='20'
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="item-registro">
                            <label htmlFor='controlpass'>Confirmar contraseña</label>
                            <input
                                type="password"
                                name='controlpass'
                                id='controlpass'
                                placeholder="*********"
                                className="form-control input-registro mb-3"
                                title='Repite tu contraseña'
                                value={controlPassword}
                                onChange={(e) => setControlPassword(e.target.value)}
                                minLength='6'
                                maxLength='20'
                                autoComplete="off"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-registro w-100">
                            Registrarse
                        </button>
                        <p className="text-center mt-2">
                            ¿Ya tenés una cuenta? <Link to='/login' className='link'>Inicia Sesión</Link>
                        </p>
                        {success && <p className="text-success">{success} <Link to="/login" className='link'>Iniciar Sesión</Link></p>}
                    </form>
                </div>

            </section>
            <img src="https://i.postimg.cc/1zgjR6Sx/registro.jpg" alt="Imagen de fondo" className='d-none d-xl-block img-bg' />

        </div>
    );
};

export default RegistroPage