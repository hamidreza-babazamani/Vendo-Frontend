import { useState } from "react";
import SendOtp from "../../components/templates/SendOtp";
import CheckOtp from "../../components/templates/CheckOtp";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  return (
    <div className="py-10">
      {step === 1 && (
        <SendOtp setStep={setStep} setMobile={setMobile} />
      )}
      {step === 2 && <CheckOtp mobile={mobile} setStep={setStep} />}
    </div>
  );
};

export default AuthPage;