import "react-phone-input-2/lib/style.css";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { auth } from "./firebase.config";


const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
   
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
         
      });
  }

  function onOTPVerify() {
     
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
         
      })
      .catch((err) => {
        console.log(err);
         
      });
  }

  return (
    <section className=" bg-stone-400  flex items-center justify-center  h-screen ">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-wh  ite font-medium text-2xl">
            You have Login successfully
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            
          {showOTP ? (
              <>
                 
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-black text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className=" bg-slate-800 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                 
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-black text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className=" bg-slate-800 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  
                  <span>Send OTP</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
