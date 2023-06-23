import { useLoginMutation, useProfileMutation } from "../services/auth.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LocalStorageKeys, StaticRoutes } from "../const/const";
import { updateToken } from "../store/authReducer";
import { authStore } from "../store/authStore";

const Login = () => {
    // Mutation hooks for login and profile requests
    const [login] = useLoginMutation();
    const [profileRequest] = useProfileMutation();

    // State variables for error handling and form data
    const [hasError, setHasError] = useState(false);
    const { register, handleSubmit } = useForm({ mode: "onTouched" });

    // State variable for the "Remember Me" checkbox
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Perform login request
            const user = await login(data);

            // Handle error and success cases
            if (user.error?.status === 400) setHasError(true);
            if (user.data?.status === 200) {
                // Store authentication token and profile in local storage
                remember && localStorage.setItem(LocalStorageKeys.RememberUser, "true");
                localStorage.setItem(LocalStorageKeys.AuthToken, user.data.body.token);

                // Request user profile
                const profile = await profileRequest({});
                localStorage.setItem(
                    LocalStorageKeys.UserProfile,
                    JSON.stringify(profile.data?.body)
                );

                // Update authentication state in the store
                authStore.dispatch(updateToken(user.data.body.token));

                // Navigate to the profile page
                navigate(StaticRoutes.Profile);
            }
        } catch (err) {
            setHasError(true);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            onChange={() => setRemember(!remember)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
                {hasError && (
                    <small className="error-message">
                        Email or password is incorrect
                    </small>
                )}
            </section>
        </main>
    );
};

export default Login;
