import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BlogInputFormProps {
  onSubmit: (topic: string) => void
  loading: boolean
}

const BlogInputForm: React.FC<BlogInputFormProps> = ({ onSubmit, loading }) => {
  const [topic, setTopic] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      onSubmit(topic.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topic">Blog Topic</Label>
        <Input
          id="topic"
          type="text"
          placeholder="Enter your blog topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={loading || !topic.trim()} className="w-full">
        Generate Blog
      </Button>
    </form>
  )
}

export default BlogInputForm

