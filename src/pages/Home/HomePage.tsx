import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/post.service";
import { getCategories } from "../../services/category.service";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";

const HomePage = () => {
  // دریافت همه آگهی‌ها
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  });

  // دریافت دسته‌بندی‌ها
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-gradient">
          Vendo
        </h1>
        <p className="text-white/70 text-lg md:text-xl">
          هر چیزی که می‌خوای، اینجاست 🌟
        </p>
      </section>

      {/* دسته‌بندی‌ها */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gradient">
          دسته‌بندی‌ها
        </h2>

        {categoriesLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.map((category) => (
              <Link key={category._id} to={`/category/${category.slug}`}>
                <Card hover padding="sm" className="text-center">
                  <div className="text-4xl mb-2">{category.icon || "📁"}</div>
                  <p className="font-bold text-sm">{category.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* آخرین آگهی‌ها */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gradient">آخرین آگهی‌ها</h2>

        {postsLoading ? (
          <Loader />
        ) : !posts || posts.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-white/60">هنوز آگهی‌ای ثبت نشده</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <Card hover padding="none" className="overflow-hidden">
                  {/* تصویر */}
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

                  {/* محتوا */}
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-primary-400 font-black text-lg">
                      {post.amount?.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;