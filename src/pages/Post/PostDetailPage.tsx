import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiMapPin,
  FiCalendar,
  FiPhone,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import moment from "jalali-moment";
import { getPostById, deletePost } from "../../services/post.service";
import { getProfile } from "../../services/user.service";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id!),
    enabled: !!id,
  });

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  if (isLoading) return <Loader />;

  if (!post) {
    return (
      <Card className="text-center py-10">
        <p className="text-white/60">آگهی پیدا نشد</p>
      </Card>
    );
  }

  const isOwner = user?._id === post.userId;

  const handleDelete = async () => {
    if (!confirm("مطمئنی می‌خوای این آگهی رو حذف کنی؟")) return;

    try {
      await deletePost(post._id);
      toast.success("آگهی حذف شد");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "خطا در حذف");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون چپ: تصاویر */}
        <div className="lg:col-span-2 space-y-4">
          <Card padding="none" className="overflow-hidden">
            <div className="aspect-video bg-white/5 flex items-center justify-center">
              {post.images?.[0] ? (
                <img
                  src={`http://localhost:3400/${post.images[0]}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl">📷</span>
              )}
            </div>
          </Card>

          {/* گالری */}
          {post.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {post.images.slice(1).map((img, i) => (
                <Card key={i} padding="none" className="overflow-hidden">
                  <img
                    src={`http://localhost:3400/${img}`}
                    alt={`تصویر ${i + 2}`}
                    className="w-full aspect-square object-cover"
                  />
                </Card>
              ))}
            </div>
          )}

          {/* محتوا */}
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gradient">
              توضیحات
            </h2>
            <p className="text-white/80 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </Card>
        </div>

        {/* ستون راست: اطلاعات */}
        <div className="space-y-4">
          {/* قیمت */}
          <Card>
            <p className="text-white/60 text-sm mb-2">قیمت</p>
            <p className="text-3xl font-black text-gradient mb-4">
              {post.amount?.toLocaleString("fa-IR")} تومان
            </p>
            <h1 className="text-xl font-bold">{post.title}</h1>
          </Card>

          {/* اطلاعات */}
          <Card>
            <h3 className="font-bold mb-4 text-gradient">اطلاعات آگهی</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <FiCalendar size={16} className="text-primary-400" />
                <span>
                  {moment(post.createdAt)
                    .locale("fa")
                    .format("jDD jMMMM jYYYY - HH:mm")}
                </span>
              </div>

              {post.address && (
                <div className="flex items-center gap-2 text-white/70">
                  <FiMapPin size={16} className="text-primary-400" />
                  <span>{post.address}</span>
                </div>
              )}

              {post.userMobile && (
                <div className="flex items-center gap-2 text-white/70">
                  <FiPhone size={16} className="text-primary-400" />
                  <span>{post.userMobile}</span>
                </div>
              )}
            </div>
          </Card>

          {/* دکمه‌ها */}
          <div className="space-y-3">
            {post.userMobile && (
              <a href={`tel:${post.userMobile}`} className="block">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<FiPhone size={18} />}
                >
                  تماس با فروشنده
                </Button>
              </a>
            )}

            {isOwner && (
              <Button
                variant="danger"
                fullWidth
                icon={<FiTrash2 size={18} />}
                onClick={handleDelete}
              >
                حذف آگهی
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;