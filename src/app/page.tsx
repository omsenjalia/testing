"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/Header"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import { useUsers } from "@/hooks/useUsers"
import { User } from "@/types/user"

// Dynamic import for Globe component (browser-only)
const GlobeCanvas = dynamic(() => import("@/components/GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#111111] flex items-center justify-center">
      <p className="text-[#a0a0a0] text-[14px]">Loading builders...</p>
    </div>
  ),
})

export default function Home() {
  const { users, isLoading, error } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleCloseSidebar = () => {
    setSelectedUser(null)
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-[#111111] flex items-center justify-center">
        <p className="text-red-400 text-[14px]">Failed to load builders.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#111111]">
      <Header userCount={users.length} />

      {!isLoading && (
        <GlobeCanvas
          users={users}
          onUserClick={handleUserClick}
          sidebarOpen={!!selectedUser}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-[#111111] flex items-center justify-center z-10">
          <p className="text-[#a0a0a0] text-[14px]">Loading builders...</p>
        </div>
      )}

      <ProfileSidebar user={selectedUser} onClose={handleCloseSidebar} />
    </main>
  )
}
