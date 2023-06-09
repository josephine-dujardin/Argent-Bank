import { LocalStorageKeys } from "../const/const";
import { useUpdateProfileMutation } from "../services/auth.service";
import AuthGuard from "../guards/auth.guard";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  // Invoke the AuthGuard to check if the user is authenticated
  AuthGuard();

  // Mutation hook for updating the user profile
  const [updateProfile] = useUpdateProfileMutation();

  // Get the user profile from local storage
  const profile = JSON.parse(localStorage.getItem(LocalStorageKeys.UserProfile));

  // State variable for controlling the name edit mode
  const [showNameEdit, setShowNameEdit] = useState(false);

  // Form management using react-hook-form
  const { register, handleSubmit } = useForm({ mode: "onTouched" });

  // Function to cancel name editing
  const onCancel = (e) => {
    e.preventDefault();
    setShowNameEdit(false);
  };

  // State variables for the first name and last name
  const [name, setName] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName || name.firstName,
      lastName: data.lastName || name.lastName,
    };

    // Update the user's profile
    const newProfile = await updateProfile(payload);

    // Update the profile in local storage
    localStorage.setItem(
      LocalStorageKeys.UserProfile,
      JSON.stringify(newProfile.data.body)
    );

    // Update the displayed name and exit the edit mode
    setName(payload);
    setShowNameEdit(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {name.firstName} {name.lastName}
        </h1>
        {showNameEdit ? (
          <div className="edit-name">
            <form className="edit-name-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="edit-name-content">
                <div className="input-wrapper">
                  <input {...register("firstName")} />
                </div>
                <div className="input-wrapper">
                  <input {...register("lastName")} />
                </div>
              </div>
              <div className="edit-name-content">
                <input
                  type="submit"
                  value="Save"
                  className="edit-btn sign-in-button"
                />
                <button onClick={onCancel} className="edit-btn sign-in-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button className="edit-button" onClick={() => setShowNameEdit(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;