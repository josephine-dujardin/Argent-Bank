import { LocalStorageKeys, StaticRoutes } from "../const/const";
import { authStore } from "../store/authStore";
import { resetToken } from "../store/authReducer";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png"

const NavBar = () => {

    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const isConnected =
        pathname === StaticRoutes.Profile;
    const [name, setName] = useState("");
    useEffect(() => {
        if (isConnected) {
            const profile = JSON.parse(
                localStorage.getItem(LocalStorageKeys.UserProfile)
            );
            setName(profile.firstName);
        }
    }, [isConnected]);

    const onSignOut = () => {
        localStorage.removeItem(LocalStorageKeys.AuthToken);
        localStorage.removeItem(LocalStorageKeys.RememberUser);
        navigate(StaticRoutes.Landing);
        authStore.dispatch(resetToken());
    };

    return (
        <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div>
                {isConnected ? (
                    <>
                        <a className="main-nav-item" href={StaticRoutes.Profile}>
                            <i className="fa fa-user-circle"></i>
                            {name}
                        </a>
                        <button className="sign-out" onClick={onSignOut}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <a className="main-nav-item" href={StaticRoutes.Login}>
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </a>
                )}
            </div>
        </nav>
    );
};

export default NavBar;