import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user.service";

const Header = () => {
  const location = useLocation();
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  return (
    <header className="sticky top-0 z-40 glass-card mx-4 mt-4 mb-6">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-2xl font-black shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              V
            </div>
            <span className="text-2xl font-black text-gradient hidden sm:block">
              Vendo
            </span>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 text-white/70">
            <IoLocationOutline size={20} />
            <span className="font-semibold">تهران</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* User */}
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="flex items-center gap-2 text-white/80 hover:text-primary-400 transition-colors"
            >
              <FaRegUser size={18} />
              <span className="font-bold hidden sm:block">
                {user ? user.fullName || "پروفایل" : "دیوار من"}
              </span>
            </Link>

            {/* Create Post Button */}
            <Link
              to="/post/create"
              className="btn-primary text-sm py-2 px-4"
            >
              ثبت آگهی
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;