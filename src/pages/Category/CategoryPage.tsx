import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getAllPosts } from "../../services/post.service";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => getAllPosts({ category: slug }),
    enabled: !!slug,
  });

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h1 className="text-3xl font-black text-gradient mb-2">
          آگهی‌های دسته {slug}
        </h1>
        <p className="text-white/60">
          {posts?.length || 0} آگهی در این دسته وجود دارد
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : !posts || posts.length === 0 ? (
        <Card className="text-center py-10">
          <p className="text-white/60">هنوز آگهی‌ای در این دسته ثبت نشده</p>
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300x300/1a1a2e/FF6B35?text=Vendo";
                      }}
                    />
                  ) : (
                    <span className="text-6xl">📷</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2 line-clamp-1">{post.title}</h3>
                  <p className="text-primary-400 font-black text-lg">
                    {post.amount?.toLocaleString("fa-IR")} تومان
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;