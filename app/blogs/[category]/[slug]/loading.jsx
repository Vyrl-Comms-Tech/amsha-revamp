import BlogInnerHero from "@/app/components/BlogInner/BlogInnerHero";
import BlogInnerContent from "@/app/components/BlogInner/BlogInnerContent";

const Loading = () => (
  <div>
    <BlogInnerHero loading />
    <BlogInnerContent loading />
  </div>
);

export default Loading;
