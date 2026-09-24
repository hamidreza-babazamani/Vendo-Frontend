import { ColorRing } from "react-loader-spinner";

interface LoaderProps {
  size?: number;
  fullScreen?: boolean;
}

const Loader = ({ size = 80, fullScreen = false }: LoaderProps) => {
  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <ColorRing
        visible={true}
        height={size}
        width={size}
        ariaLabel="loading"
        colors={["#FF6B35", "#FF8A5B", "#A855F7", "#C084FC", "#FF6B35"]}
      />
      <p className="text-white/70 text-sm font-medium">در حال بارگذاری...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
        {loader}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-20">{loader}</div>;
};

export default Loader;