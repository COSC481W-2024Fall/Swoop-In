import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, reload } from "firebase/auth";
import "../css/signUpPage.css"; 

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith("@emich.edu")) {
      setMessageType("error");
      setMessage("Please use your EMU email address ending with @emich.edu.");
      return;
    }
    if (password.length < 6) {
      setMessageType("error");
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmpassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setIsVerificationSent(true);
      setMessageType("success");
      setMessage("Verification email sent! Please check your inbox.");

      const checkVerificationStatus = setInterval(async () => {
        await reload(user);
        if (user.emailVerified) {
          clearInterval(checkVerificationStatus);
          setMessageType("success");
          setMessage("Email verified! Redirecting...");

          const userData = {
            email: email,
            firstName: "", 
            lastName: "",
            age: null,
            bio: "",
            gender: "",
            major: "",
            minAge: null,
            maxAge: null,
            preferredGender: "",
            images: [], 
            lastActive: new Date(),
            settings: {
              activeStatus: true,
              blockList: [],
              lightMode: true,
              notification: true,
            },
            swipes: {
              left: [],
              right: [],
              matches: [],
            },
            createdAt: new Date(),
          };

          await setDoc(doc(db, "Users", user.uid), userData);

          navigate(`/CreateProfilePage/${user.uid}`);
        }
      }, 3000);
    } catch (error: any) {
      setIsVerificationSent(false);

      let customMessage = "An error occurred. Please try again.";
      switch (error.code) {
        case "auth/email-already-in-use":
          customMessage = "This email is already in use. Please use a different email.";
          break;
        case "auth/invalid-email":
          customMessage = "The email address is invalid. Please check the format.";
          break;
        case "auth/weak-password":
          customMessage = "Password is too weak. Please use at least 6 characters.";
          break;
        case "auth/network-request-failed":
          customMessage = "Network error. Please check your internet connection.";
          break;
      }

      setMessageType("error");
      setMessage(customMessage);
    }
  };

  return (
    <div className="sign-up-page container">
      <div className="sign-up-layout">
        <h1 className="sign-up-title">Sign Up Page</h1>
        <form onSubmit={handleSignUp} className="form">
          <label htmlFor="email" className="label">Enter your email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />

          <label htmlFor="password" className="label">Enter your new password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />

          <label htmlFor="confirmpassword" className="label">Re-enter your new password</label>
          <input
            type="password"
            id="confirmpassword"
            required
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />

          <button type="submit" className="submit-button">
            {isVerificationSent ? "Check Email for Verification" : "Proceed to Create Profile"}
          </button>
        </form>
        
        {message && (
          <p className={`message ${messageType === "error" ? "error-message" : "success-message"}`}>
            {message}
          </p>
        )}

        <a href="/" className="back-link">Back to Login</a>
      </div>
    </div>
  );
};

export default SignUpPage;
