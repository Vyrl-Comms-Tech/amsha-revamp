"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BlogParentHero from "../components/Blog/blogParentHero";
import BlogGrid from "../components/Blog/blogGrid";
import FooterModel from "../components/layout/FooterModel";

const Page = () => {
  const [activeTab, setActiveTab] = useState("blog");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async (category) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/content/get?category=${category}&status=published`
      );
      const items = res?.data?.data?.data || [];
      setData(items);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab]);

  return (
    <>
      <BlogParentHero
        data={data}
        loading={loading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <BlogGrid data={data?.slice(1)} loading={loading} activeTab={activeTab} />
      <FooterModel />
    </>
  );
};

export default Page;
