import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLock, FiArrowRight } from "react-icons/fi";
import { checkOtp } from "../../services/auth.service";
import Button from "../common/Button";
import Input from "../common/Input";

interface CheckOtpProps {
  mobile: string;
  setStep: (step: number) => void;
}

const CheckOtp = ({ mobile, setStep }: CheckOtpProps) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: checkOtp,
    onSuccess: () => {
      toast.success("خوش آمدید 🎉");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "کد وارد شده اشتباهه";
      toast.error(message);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (code.length !== 5) {
      toast.error("کد تایید باید ۵ رقم باشه");
      return;
    }

    mutate({ mobile, code });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card p-8">
        {/* آیکن */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center shadow-glow-secondary">
            <FiLock size={40} className="text-white" />
          </div>
        </div>

        {/* عنوان */}
        <h2 className="text-2xl font-black text-center mb-2 text-gradient">
          ورود کد تایید
        </h2>
        <p className="text-white/60 text-center text-sm mb-2">
          کد تایید به شماره زیر ارسال شد
        </p>
        <p className="text-center font-bold text-primary-400 mb-8 text-lg">
          {mobile}
        </p>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="کد تایید"
            type="text"
            placeholder="- - - - -"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            icon={<FiLock size={20} />}
            maxLength={5}
            autoFocus
            className="text-center text-2xl tracking-widest"
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={code.length !== 5}
          >
            تایید و ورود
          </Button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-center text-white/60 hover:text-primary-400 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowRight size={16} />
            ویرایش شماره موبایل
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOtp;