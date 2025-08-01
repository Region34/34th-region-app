"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, CheckCircle } from "lucide-react"
import Image from "next/image"

interface BlogPost {
  id: number
  title: string
  content: string
  summary: string
  category: string
  author: string
  authorImage: string
  image: string
  timestamp: string
}

const categories = [
  "Health & Hygiene",
  "Relationships",
  "Marriage",
  "Career Tips",
  "Memes",
  "Tools",
  "Events",
  "Church Gist",
  "Promotions",
  "News",
]

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    category: "",
    author: "",
    authorImage: "",
    image: "",
  })

  useEffect(() => {
    // Load existing posts
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    setPosts(savedPosts)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (field: "image" | "authorImage", file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target?.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newPost: BlogPost = {
      id: editingPost ? editingPost.id : Date.now(),
      ...formData,
      timestamp: editingPost ? editingPost.timestamp : new Date().toISOString(),
    }

    let updatedPosts
    if (editingPost) {
      updatedPosts = posts.map((post) => (post.id === editingPost.id ? newPost : post))
    } else {
      updatedPosts = [newPost, ...posts]
    }

    setPosts(updatedPosts)
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

    // Reset form
    setFormData({
      title: "",
      content: "",
      summary: "",
      category: "",
      author: "",
      authorImage: "",
      image: "",
    })
    setIsCreating(false)
    setEditingPost(null)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      summary: post.summary,
      category: post.category,
      author: post.author,
      authorImage: post.authorImage,
      image: post.image,
    })
    setEditingPost(post)
    setIsCreating(true)
  }

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      summary: "",
      category: "",
      author: "",
      authorImage: "",
      image: "",
    })
    setIsCreating(false)
    setEditingPost(null)
  }

  return (
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Blog Administration</h1>
            <p className="text-muted-foreground">Manage blog content for the explore section</p>
          </div>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Blog post {editingPost ? "updated" : "created"} successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Create/Edit Form */}
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)} value={formData.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Summary *</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => handleInputChange("summary", e.target.value)}
                    placeholder="Brief summary of the article..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Full article content..."
                    className="min-h-[200px]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author Name *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorImage">Author Image</Label>
                    <Input
                      id="authorImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload("authorImage", file)
                      }}
                    />
                    {formData.authorImage && (
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={formData.authorImage || "/placeholder.svg"}
                          alt="Author preview"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Article Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload("image", file)
                    }}
                  />
                  {formData.image && (
                    <div className="w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={formData.image || "/placeholder.svg"}
                        alt="Article preview"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingPost ? "Update Post" : "Create Post"}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Existing Posts ({posts.length})</h2>

          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No blog posts created yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {post.image ? (
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{post.category}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.summary}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>By {post.author}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2 ml-4">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
