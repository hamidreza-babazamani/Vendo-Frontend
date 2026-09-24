import { FormEvent, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiUpload, FiPlus, FiX } from "react-icons/fi";
import { createPost } from "../../services/post.service";
import { getCategories } from "../../services/category.service";
import { getOptionsByCategoryId } from "../../services/option.service";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    content: "",
    category: "",
    province: "",
    city: "",
    address: "",
    lat: "35.6892",
    lng: "51.3890",
  });

  const [images, setImages] = useState<File[]>([]);
  const [optionsValues, setOptionsValues] = useState<Record<string, string>>(
    {}
  );

  const { data: categories, isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: options } = useQuery({
    queryKey: ["options", form.category],
    queryFn: () => getOptionsByCategoryId(form.category),
    enabled: !!form.category,
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("آگهی با موفقیت ثبت شد");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "خطا در ثبت آگهی");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.category || !form.amount) {
      toast.error("لطفاً فیلدهای اجباری رو پر کن");
      return;
    }

    if (images.length === 0) {
      toast.error("حداقل یک عکس آپلود کن");
      return;
    }

    const formData = new FormData();
    formData.append("title_post", form.title);
    formData.append("description", form.content);
    formData.append("amount", form.amount);
    formData.append("category", form.category);
    formData.append("lat", form.lat);
    formData.append("lng", form.lng);

    Object.entries(optionsValues).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    images.forEach((img) => formData.append("images", img));

    mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      toast.error("حداکثر ۱۰ عکس مجاز است");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-black text-gradient mb-6">
        ثبت آگهی جدید
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* اطلاعات اصلی */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gradient">
            اطلاعات اصلی
          </h2>

          <div className="space-y-4">
            <Input
              label="عنوان آگهی *"
              placeholder="مثلاً: آیفون ۱۴ پرو مکس"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <div>
              <label className="label-glass">دسته‌بندی *</label>
              {catLoading ? (
                <Loader size={40} />
              ) : (
                <select
                  className="input-glass"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">انتخاب کنید...</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id} className="bg-gray-800">
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <Input
              label="مبلغ (تومان) *"
              type="number"
              placeholder="مثلاً: 50000000"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <div>
              <label className="label-glass">توضیحات *</label>
              <textarea
                className="input-glass min-h-[120px]"
                placeholder="توضیحات کامل آگهی..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* گزینه‌ها */}
        {options && options.length > 0 && (
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gradient">
              مشخصات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option) => (
                <div key={option._id}>
                  {option.type === "array" && option.values?.length > 0 ? (
                    <>
                      <label className="label-glass">
                        {option.title}
                        {option.required && " *"}
                      </label>
                      <select
                        className="input-glass"
                        value={optionsValues[option.title] || ""}
                        onChange={(e) =>
                          setOptionsValues({
                            ...optionsValues,
                            [option.title]: e.target.value,
                          })
                        }
                      >
                        <option value="">انتخاب کنید...</option>
                        {option.values.map((v, i) => (
                          <option key={i} value={v} className="bg-gray-800">
                            {v}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <Input
                      label={`${option.title}${option.required ? " *" : ""}`}
                      placeholder={option.guid || ""}
                      value={optionsValues[option.title] || ""}
                      onChange={(e) =>
                        setOptionsValues({
                          ...optionsValues,
                          [option.title]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* مکان */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gradient">مکان</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="استان"
              placeholder="تهران"
              value={form.province}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
            />
            <Input
              label="شهر"
              placeholder="تهران"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              label="آدرس"
              placeholder="آدرس دقیق"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </Card>

        {/* تصاویر */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gradient">
            تصاویر ({images.length}/10)
          </h2>

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
            <FiUpload size={32} className="text-primary-400 mb-2" />
            <p className="text-white/60 text-sm">
              برای آپلود عکس کلیک کن یا فایل رو بکش
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages(images.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* دکمه */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          loading={isLoading}
          icon={<FiPlus size={20} />}
        >
          ثبت آگهی
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;