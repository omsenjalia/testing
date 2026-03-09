"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/Header"
import { ProfileWidget } from "@/components/ProfileWidget"
import { useUsers } from "@/hooks/useUsers"
import { User } from "@/types/user"

// Dynamic import for Globe component (browser-only)
const GlobeCanvas = dynamic(() => import("@/components/GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#c8c3b8] flex items-center justify-center font-mono text-[13px] text-[var(--text-muted)]">
      Loading builders...
    </div>
  ),
})

export default function Home() {
  const { users, isLoading, error } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleCloseWidget = () => {
    setSelectedUser(null)
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-[#ede9e0] flex items-center justify-center font-mono text-[14px] text-red-600">
        Failed to load builders.
      </div>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#ede9e0]">
      <Header userCount={users.length} />

      {!isLoading && (
        <GlobeCanvas
          users={users}
          onUserClick={handleUserClick}
          selectedUser={selectedUser}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-[#ede9e0] flex items-center justify-center z-10 font-mono text-[13px] text-[var(--text-muted)]">
          Loading builders...
        </div>
      )}

      <ProfileWidget user={selectedUser} onClose={handleCloseWidget} />
    </main>
  )
}
