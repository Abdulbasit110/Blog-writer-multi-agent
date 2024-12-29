"use client";

import { useState } from "react";
import { generateBlog } from "./actions/generateBlog";
import EngagementContent from "@/components/EngagementContent";
import BlogInputForm from "@/components/BlogInputForm";
import ReactMarkdown from "react-markdown";

const BlogGeneratorPage: React.FC = () => {
  const [blog, setBlog] = useState<string | null>(null); // Markdown content
  const [engagement, setEngagement] = useState<string>(
    "Here's a fun fact while we prepare your blog..."
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBlog = async (topic: string) => {
    setLoading(true);
    setError(null);
    setBlog(null);

    try {
      const blogData = await generateBlog(topic); // Fetch blog data
      setBlog(blogData.blog.raw); // Use the correct property from API response
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-gray-200">
      <div className="max-w-lg w-full bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">
          Generate a Blog
        </h1>
        <BlogInputForm onSubmit={handleGenerateBlog} />
        {loading && <EngagementContent content={engagement} />}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {blog && (
          <div className="mt-6 p-4 border border-gray-700 rounded-md bg-gray-900 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Generated Blog:</h2>
            <ReactMarkdown className="prose prose-invert text-gray-200">
              {blog}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGeneratorPage;
