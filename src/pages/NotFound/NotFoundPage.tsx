import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { IoHome } from "react-icons/io5";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-black text-gradient mb-4 animate-pulse-slow">
        404
      </h1>
      <h2 className="text-3xl font-bold mb-4">صفحه پیدا نشد!</h2>
      <p className="text-white/60 mb-8 max-w-md">
        صفحه‌ای که دنبالش هستید وجود نداره یا حذف شده. می‌تونید به صفحه اصلی
        برگردید.
      </p>
      <Link to="/">
        <Button variant="primary" icon={<IoHome size={20} />}>
          بازگشت به صفحه اصلی
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;