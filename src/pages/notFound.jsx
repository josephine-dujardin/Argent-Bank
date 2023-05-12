import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="div-404">
                <h2 className="title-404">404</h2>
                <p className="text-404">Oups! La page que vous demandez n'existe pas.</p>
                <Link className="link-404" to="/">
                    <p>Retourner sur la page d'accueil</p>
                </Link>
            </div>
        </>
    )
}

export default NotFound