import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="glass-card mx-4 mb-4 mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* برند */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-xl font-black">
                V
              </div>
              <span className="text-xl font-black text-gradient">Vendo</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              وندو، پلتفرم آگهی آنلاین برای خرید و فروش سریع و امن. هر چیزی
              می‌خوای بفروشی یا بخری، اینجاست.
            </p>
          </div>

          {/* لینک‌ها */}
          <div>
            <h4 className="font-bold mb-4 text-gradient">دسترسی سریع</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  to="/post/create"
                  className="hover:text-primary-400 transition-colors"
                >
                  ثبت آگهی
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-primary-400 transition-colors"
                >
                  پنل کاربری
                </Link>
              </li>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div>
            <h4 className="font-bold mb-4 text-gradient">ما را دنبال کنید</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
              >
                <FaTelegram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          ساخته شده با ❤️ توسط{" "}
          <span className="text-primary-400 font-bold">Hamidreza Babazamani</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;