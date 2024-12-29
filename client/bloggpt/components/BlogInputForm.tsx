"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface BlogInputFormProps {
  onSubmit: (topic: string) => void;
}

const BlogInputForm: React.FC<BlogInputFormProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Enter a topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 text-black"
      />
      <Button type="submit" className="w-full bg-blue-600 text-white">
        Generate Blog
      </Button>
    </form>
  );
};

export default BlogInputForm;
