"use client";

import { useState } from "react";
import { generateBlog } from "./actions/generateBlog";
import BlogInputForm from "@/components/BlogInputForm";
import InteractiveBlogLoader from "@/components/InteractiveBlogLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { marked } from "marked";
import Image from "next/image";
import DOMPurify from "dompurify";

const BlogGeneratorPage: React.FC = () => {
  const [blog, setBlog] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBlog = async (topic: string) => {
    setLoading(true);
    setError(null);
    setBlog(null);
    setImageUrl(null);

    try {
      const blogData = await generateBlog(topic);
      const cleanedBlog = blogData.blog.raw
        .replace(/^```markdown\n/, "") // Remove the opening ```markdown
        .replace(/\n```$/, "") // Remove the closing ```
        .trim();
      const htmlBlog = marked(cleanedBlog);
      setBlog(htmlBlog);

      // Fetch image URL
      const imageResponse = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic }),
      });
      const imageData = await imageResponse.json();
      console.log(imageData);
      setImageUrl(imageData.imageUrl);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBlog(null);
    setImageUrl(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            AI Blog Generator
          </CardTitle>
          <CardDescription className="text-center">
            Enter a topic and let AI create a blog post with an image for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <InteractiveBlogLoader />
          ) : blog ? (
            <div className="space-y-6">
              <Button variant="outline" onClick={handleReset} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Generate Another Blog
              </Button>
              {imageUrl && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Generated blog image"
                    // layout="fill"
                    fill
                    // objectFit="cover"
                    // className="transition-opacity duration-300 ease-in-out"
                    className="object-cover transition-opacity duration-300 ease-in-out"
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                  />
                </div>
              )}
              <div
                className="prose lg:prose-xl dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog) }}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <BlogInputForm onSubmit={handleGenerateBlog} loading={loading} />
              {error && (
                <div
                  className="bg-red-100 border border-neutral-200 border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-100 dark:border-red-800 dark:border-neutral-800"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogGeneratorPage;
