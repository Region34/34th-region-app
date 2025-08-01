"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Edit, Trash2, Eye, Users, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PasswordModal from "@/components/password-modal"

interface Registration {
  id: number
  serialNumber: string
  timestamp: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  parish: string
  area: string
  zone: string
  postInChurch: string
  image?: string
  localGovt: string
  homeAddress: string
  profession: string
  department: string
  suggestions: string
  prayerPoints: string
}

export default function DatabasePage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<Registration | null>(null)
  const [showDatabaseModal, setShowDatabaseModal] = useState(false)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    // Load registrations from localStorage
    const data = JSON.parse(localStorage.getItem("registrations") || "[]")
    setRegistrations(data)
    setFilteredRegistrations(data)
  }, [])

  useEffect(() => {
    // Filter registrations based on search term
    const filtered = registrations.filter(
      (reg) =>
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.parish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(reg.dateOfBirth)
          .toLocaleDateString("en-US", { month: "long" })
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    )
    setFilteredRegistrations(filtered)
  }, [searchTerm, registrations])

  const handleDatabaseAccess = () => {
    setHasAccess(true)
  }

  const handleBlogAccess = () => {
    window.location.href = "/blog-admin"
  }

  const handleDelete = (id: number) => {
    const updated = registrations.filter((reg) => reg.id !== id)
    setRegistrations(updated)
    localStorage.setItem("registrations", JSON.stringify(updated))
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen pt-20 px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Database Access</h1>
            <p className="text-muted-foreground">Choose your access level</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setShowDatabaseModal(true)}
            >
              <CardHeader className="text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl">GO DATABASE</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Access member registration database with full CRUD operations
                </p>
                <Button className="w-full">Access Database</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowBlogModal(true)}>
              <CardHeader className="text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl">GO BLOG</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">Manage blog content and posts for the explore section</p>
                <Button className="w-full">Access Blog Admin</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <PasswordModal
          isOpen={showDatabaseModal}
          onClose={() => setShowDatabaseModal(false)}
          onSuccess={handleDatabaseAccess}
          correctPassword="34TH REGION"
          title="Database Access"
          description="Enter password to access member database"
        />

        <PasswordModal
          isOpen={showBlogModal}
          onClose={() => setShowBlogModal(false)}
          onSuccess={handleBlogAccess}
          correctPassword="34TH REGION"
          title="Blog Admin Access"
          description="Enter password to access blog administration"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Member Database</h1>
            <p className="text-muted-foreground">Total Members: {registrations.length}</p>
          </div>
          <Link href="/database">
            <Button variant="outline">Back to Access</Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, parish, zone, area, or birth month..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegistrations.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    {member.image ? (
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{member.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{member.parish}</p>
                    <p className="text-sm text-muted-foreground">{member.postInChurch || "Member"}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {member.serialNumber}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedProfile(member)}>
                    <Eye className="h-4 w-4 mr-1" />
                    More
                  </Button>

                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRegistrations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No members found matching your search.</p>
          </div>
        )}

        {/* Profile Modal */}
        <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedProfile && (
              <>
                <DialogHeader>
                  <DialogTitle>Member Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
                      {selectedProfile.image ? (
                        <Image
                          src={selectedProfile.image || "/placeholder.svg"}
                          alt={selectedProfile.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                          {selectedProfile.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProfile.name}</h2>
                      <p className="text-muted-foreground">{selectedProfile.email}</p>
                      <Badge>{selectedProfile.serialNumber}</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Personal Information</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Phone:</strong> {selectedProfile.phone}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong> {new Date(selectedProfile.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Gender:</strong> {selectedProfile.gender}
                        </p>
                        <p>
                          <strong>Local Govt:</strong> {selectedProfile.localGovt}
                        </p>
                        <p>
                          <strong>Profession:</strong> {selectedProfile.profession}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Church Information</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Parish:</strong> {selectedProfile.parish}
                        </p>
                        <p>
                          <strong>Area:</strong> {selectedProfile.area}
                        </p>
                        <p>
                          <strong>Zone:</strong> {selectedProfile.zone}
                        </p>
                        <p>
                          <strong>Department:</strong> {selectedProfile.department}
                        </p>
                        <p>
                          <strong>Post:</strong> {selectedProfile.postInChurch}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-sm">{selectedProfile.homeAddress}</p>
                  </div>

                  {selectedProfile.suggestions && (
                    <div>
                      <h3 className="font-semibold mb-2">Suggestions</h3>
                      <p className="text-sm">{selectedProfile.suggestions}</p>
                    </div>
                  )}

                  {selectedProfile.prayerPoints && (
                    <div>
                      <h3 className="font-semibold mb-2">Prayer Points</h3>
                      <p className="text-sm">{selectedProfile.prayerPoints}</p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    <p>Registered: {new Date(selectedProfile.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
