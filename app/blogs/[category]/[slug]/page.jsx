import axios from "axios";
import BlogInnerHero from "@/app/components/BlogInner/BlogInnerHero";
import BlogInnerContent from "@/app/components/BlogInner/BlogInnerContent";
import FooterModel from "@/app/components/layout/FooterModel";
import Newsletter from "../../../components/layout/NewsLetter";
async function getContent(slug, category) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/content/get`,
      {
        params: {
          status: "published",
          completeContent: true,
          slug,
          category,
        },
      }
    );
    return res?.data?.data;
  } catch (error) {
    console.log("Error fetching content:", error);
    return null;
  }
}

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  const content = await getContent(slug, category);
  return (
    <div>
      <BlogInnerHero data={content} />
      <BlogInnerContent data={content} />
      <Newsletter/>
      <FooterModel />
    </div>
  );
};

export default Page;
