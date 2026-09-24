import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiUser, FiPhone, FiCalendar, FiPlus } from "react-icons/fi";
import moment from "jalali-moment";
import { getProfile } from "../../services/user.service";
import { getMyPosts } from "../../services/post.service";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

const DashboardPage = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["myPosts"],
    queryFn: getMyPosts,
  });

  if (userLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* هدر */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-black text-gradient">پنل کاربری</h1>
        <Link to="/post/create">
          <Button variant="primary" icon={<FiPlus size={18} />}>
            ثبت آگهی جدید
          </Button>
        </Link>
      </div>

      {/* کارت پروفایل */}
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gradient">
          اطلاعات پروفایل
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <FiUser size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">نام کامل</p>
              <p className="font-bold">{user?.fullName || "وارد نشده"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center">
              <FiPhone size={20} className="text-secondary-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">شماره موبایل</p>
              <p className="font-bold">{user?.mobile}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <FiCalendar size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">تاریخ عضویت</p>
              <p className="font-bold text-sm">
                {user?.createdAt &&
                  moment(user.createdAt)
                    .locale("fa")
                    .format("jDD jMMMM jYYYY")}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* آگهی‌های من */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gradient">
          آگهی‌های من ({posts?.length || 0})
        </h2>

        {postsLoading ? (
          <Loader />
        ) : !posts || posts.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-white/60 mb-4">هنوز آگهی‌ای ثبت نکردی</p>
            <Link to="/post/create">
              <Button variant="primary">ثبت اولین آگهی</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <Card hover padding="none" className="overflow-hidden">
                  <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                    {post.images?.[0] ? (
                      <img
                        src={`http://localhost:3400/${post.images[0]}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl">📷</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-primary-400 font-black">
                      {post.amount?.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;