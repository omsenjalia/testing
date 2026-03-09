import { useState, useEffect } from "react"
import { User } from "@/types/user"
import { mockUsers } from "@/data/mockUsers"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate API fetch
    const fetchUsers = async () => {
      try {
        /*
        // Swap to this when API is ready:
        const res = await fetch(`${API_BASE}/api/users/map`)
        if (!res.ok) throw new Error("Failed to fetch")
        const data: User[] = await res.json()
        setUsers(data)
        */

        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUsers(mockUsers)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch users"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, isLoading, error }
}
