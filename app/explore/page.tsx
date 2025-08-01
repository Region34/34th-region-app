"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Calendar, Eye } from "lucide-react"
import Image from "next/image"
import AdSlot from "@/components/ad-slot"

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
  "All",
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

// Dummy blog posts
const dummyPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Strong Christian Relationships",
    content:
      "In today's world, building meaningful Christian relationships requires intentionality, prayer, and commitment to biblical principles. We must learn to love as Christ loved us, showing grace, forgiveness, and understanding in all our interactions. This involves active listening, being present for one another, and supporting each other through life's challenges. Christian relationships are built on a foundation of mutual respect, shared values, and a common commitment to following Jesus Christ.",
    summary: "Learn how to build meaningful Christian relationships based on biblical principles and mutual respect.",
    category: "Relationships",
    author: "Pastor John Adebayo",
    authorImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    timestamp: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Preparing for Marriage God's Way",
    content:
      "Marriage is a sacred covenant ordained by God, and proper preparation is essential for a successful union. This preparation involves spiritual, emotional, and practical aspects. Couples should engage in premarital counseling, establish clear communication patterns, and align their life goals with biblical principles. Understanding roles and responsibilities, financial planning, and conflict resolution are crucial elements that need to be addressed before walking down the aisle.",
    summary: "Essential steps for preparing for marriage according to biblical principles and godly wisdom.",
    category: "Marriage",
    author: "Mrs. Grace Okafor",
    authorImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    timestamp: "2024-01-12T14:30:00Z",
  },
  {
    id: 3,
    title: "Career Excellence Through Faith",
    content:
      "Your career is not separate from your faith journey. God has equipped each of us with unique talents and abilities that should be used for His glory and the betterment of society. Excellence in your career comes through diligence, integrity, continuous learning, and maintaining ethical standards. Remember that your workplace is also your mission field where you can be a light to others through your conduct and character.",
    summary: "Discover how to excel in your career while maintaining strong Christian values and integrity.",
    category: "Career Tips",
    author: "Dr. Samuel Ogundimu",
    authorImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    timestamp: "2024-01-10T09:15:00Z",
  },
  {
    id: 4,
    title: "Maintaining Good Health as a Christian",
    content:
      "Our bodies are temples of the Holy Spirit, and we have a responsibility to take care of them. This involves regular exercise, proper nutrition, adequate rest, and avoiding harmful substances. Mental health is equally important - we should practice stress management, maintain healthy relationships, and seek help when needed. Remember that taking care of your health is not vanity but stewardship of what God has given you.",
    summary: "Learn about maintaining physical and mental health from a Christian perspective.",
    category: "Health & Hygiene",
    author: "Dr. Funmi Adeyemi",
    authorImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    timestamp: "2024-01-08T16:45:00Z",
  },
  {
    id: 5,
    title: "Upcoming Regional Convention 2024",
    content:
      "We are excited to announce the RCCG 34TH REGION Annual Convention scheduled for March 15-17, 2024. This year's theme is 'Supernatural Breakthrough' and we expect powerful ministrations from anointed servants of God. The convention will feature healing services, prophetic sessions, and life-transforming messages. Registration is now open for all members and friends. Don't miss this opportunity for spiritual renewal and divine encounter.",
    summary: "Join us for the annual regional convention featuring powerful ministrations and divine encounters.",
    category: "Events",
    author: "Regional Coordinator",
    authorImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    timestamp: "2024-01-05T12:00:00Z",
  },
  {
    id: 6,
    title: "New Parish Dedication in Ikeja",
    content:
      "We celebrate the dedication of our newest parish in Ikeja, Lagos State. The RCCG Victory Temple was officially opened last Sunday with great joy and celebration. The new facility can accommodate 500 worshippers and features modern amenities including a children's church, counseling rooms, and administrative offices. This expansion is part of our vision to have a member of RCCG in every family. We thank God for His faithfulness and provision.",
    summary: "Celebrating the opening of our newest parish facility in Ikeja with modern amenities.",
    category: "Church Gist",
    author: "Media Team",
    authorImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    timestamp: "2024-01-03T11:30:00Z",
  },
]

export default function ExplorePage() {
  const [posts, setPosts] = useState<BlogPost[]>(dummyPosts)
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(dummyPosts)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    // Load blog posts from localStorage if available
    const savedPosts = localStorage.getItem("blogPosts")
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts)
      setPosts([...parsedPosts, ...dummyPosts])
      setFilteredPosts([...parsedPosts, ...dummyPosts])
    }
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm, posts])

  return (
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore & Learn</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover inspiring content, practical tips, and spiritual insights to enrich your Christian journey
          </p>
        </div>

        <AdSlot type="banner" className="mb-8" />

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles, authors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div key={post.id}>
              <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <Badge className="absolute top-2 left-2">{post.category}</Badge>
                </div>

                <CardHeader className="flex-1">
                  <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.timestamp).toLocaleDateString()}
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline" onClick={() => setSelectedPost(post)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Read More
                  </Button>
                </CardContent>
              </Card>

              {/* Ad slot after every 3rd post */}
              {(index + 1) % 3 === 0 && (
                <div className="col-span-full my-6">
                  <AdSlot type="banner" />
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}

        <AdSlot type="banner" className="mt-12" />

        {/* Article Modal */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedPost && (
              <>
                <DialogHeader>
                  <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={selectedPost.image || "/placeholder.svg"}
                      alt={selectedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge>{selectedPost.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(selectedPost.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <DialogTitle className="text-2xl md:text-3xl">{selectedPost.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={selectedPost.authorImage || "/placeholder.svg"}
                      alt={selectedPost.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{selectedPost.author}</p>
                      <p className="text-sm text-muted-foreground">Author</p>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed">{selectedPost.content}</p>
                  </div>

                  <AdSlot type="banner" />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
