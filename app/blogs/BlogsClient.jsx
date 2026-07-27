"use client";

import { useEffect, useRef, useState } from "react";
import NewsLetter from "../components/layout/NewsLetter";
import axios from "axios";
import BlogParentHero from "../components/Blog/blogParentHero";
import BlogGrid from "../components/Blog/blogGrid";
import FooterModel from "../components/layout/FooterModel";

const BlogsClient = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [data, setData] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const scrollPendingRef = useRef(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/content/categories`
      );
      const categories = res?.data?.data || [];
      setTabs(categories);
      setActiveTab(categories[0] || "");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const fetchContent = async (category, page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/content/get?category=${category}&status=published&page=${page}&limit=9&featured=true`
      );
      const items = res?.data?.data?.data || [];
      setData(items);
      setFeatured(res?.data?.data?.featured || null);
      setPagination(res?.data?.data?.pagination || null);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeTab) fetchContent(activeTab, currentPage);
  }, [activeTab, currentPage]);

  useEffect(() => {
    if (!loading && scrollPendingRef.current) {
      scrollPendingRef.current = false;
      document
        .querySelector(".bg-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    scrollPendingRef.current = true;
    setCurrentPage(page);
  };

  return (
    <>
      <BlogParentHero
        featured={featured}
        loading={loading}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <BlogGrid
        data={data}
        loading={loading}
        activeTab={activeTab}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <NewsLetter />
      <FooterModel />
    </>
  );
};

export default BlogsClient;
