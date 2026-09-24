import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiSmartphone } from "react-icons/fi";
import { sendOtp } from "../../services/auth.service";
import Button from "../common/Button";
import Input from "../common/Input";

interface SendOtpProps {
  setStep: (step: number) => void;
  setMobile: (mobile: string) => void;
}

const SendOtp = ({ setStep, setMobile }: SendOtpProps) => {
  const [mobile, setMobileLocal] = useState("");

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success("کد تایید ارسال شد");
      setMobile(mobile);
      setTimeout(() => setStep(2), 1000);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "خطا در ارسال کد";
      toast.error(message);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (mobile.length !== 11) {
      toast.error("شماره موبایل باید ۱۱ رقم باشه");
      return;
    }

    if (!mobile.startsWith("09")) {
      toast.error("شماره موبایل باید با ۰۹ شروع بشه");
      return;
    }

    mutate({ mobile });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card p-8">
        {/* آیکن */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow-primary">
            <FiSmartphone size={40} className="text-white" />
          </div>
        </div>

        {/* عنوان */}
        <h2 className="text-2xl font-black text-center mb-2 text-gradient">
          ورود به حساب کاربری
        </h2>
        <p className="text-white/60 text-center text-sm mb-8">
          برای استفاده از امکانات وندو، شماره موبایل خود را وارد کنید
        </p>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="شماره موبایل"
            type="tel"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            value={mobile}
            onChange={(e) => setMobileLocal(e.target.value)}
            icon={<FiSmartphone size={20} />}
            helperText="کد تایید به این شماره پیامک خواهد شد"
            maxLength={11}
            autoFocus
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={mobile.length !== 11}
          >
            ارسال کد تایید
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendOtp;