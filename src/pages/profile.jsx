import { LocalStorageKeys } from "../const/const";
import { useUpdateProfileMutation } from "../services/auth.service";
import AuthGuard from "../guards/auth.guard";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  AuthGuard();
  const [updateProfile] = useUpdateProfileMutation();
  const profile = JSON.parse(localStorage.getItem(LocalStorageKeys.UserProfile));
  const [showNameEdit, setShowNameEdit] = useState(false);
  const { register, handleSubmit } = useForm({ mode: "onTouched" });
  const onCancel = (e) => {
    e.preventDefault();
    setShowNameEdit(false);
  };

  const [name, setName] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName || name.firstName,
      lastName: data.lastName || name.lastName,
    };
    const newProfile = await updateProfile(payload);
    localStorage.setItem(
      LocalStorageKeys.UserProfile,
      JSON.stringify(newProfile.data.body)
    );
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