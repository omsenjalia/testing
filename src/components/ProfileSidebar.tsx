import { User } from "@/types/user"
import { useEffect, useRef } from "react"

interface ProfileSidebarProps {
  user: User | null
  onClose: () => void
}

export function ProfileSidebar({ user, onClose }: ProfileSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Handle click outside to close sidebar on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (user && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        // Only trigger if we're not clicking on a marker (which also triggers close/open)
        const target = event.target as HTMLElement
        if (!target.closest('.group.relative')) {
           onClose()
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [user, onClose])

  // Get initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <>
      {/* Backdrop for mobile clicking outside */}
      {user && (
        <div
          className="fixed inset-0 bg-black/10 md:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed z-50 bg-white border-[#e8e8e6]
          transition-transform duration-300 ease-in-out
          flex flex-col

          /* Desktop: slides from right */
          md:right-0 md:top-0 md:h-full md:w-[300px] md:border-l
          ${user ? "md:translate-x-0" : "md:translate-x-full"}

          /* Mobile: slides up from bottom */
          max-md:bottom-0 max-md:left-0 max-md:w-full max-md:h-[60vh] max-md:border-t max-md:rounded-t-[12px]
          ${user ? "max-md:translate-y-0" : "max-md:translate-y-full"}
        `}
      >
        {user && (
          <div className="p-6 flex flex-col h-full overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[20px] text-[#6b6b6b] hover:text-[#1a1a1a]"
            >
              ×
            </button>

            <div className="mt-8 mb-4">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-[52px] h-[52px] rounded-full object-cover border border-[#e8e8e6]"
                />
              ) : (
                <div className="w-[52px] h-[52px] rounded-full bg-[#2a2a2a] flex items-center justify-center text-white text-[18px] font-semibold">
                  {getInitials(user.name)}
                </div>
              )}
            </div>

            <div className="mb-1">
              <h2 className="text-[14px] font-semibold text-[#1a1a1a]">{user.name}</h2>
            </div>
            <div className="mb-6">
              <p className="text-[13px] text-[#6b6b6b]">@{user.username}</p>
            </div>

            <hr className="border-[#e8e8e6] mb-6" />

            <div className="space-y-4 flex-grow">
              <div>
                <div className="flex items-center text-[12px] text-[#6b6b6b] mb-1">
                  <span className="mr-2">📍</span> {user.location}
                </div>
              </div>

              <div>
                <p className="text-[13px] text-[#6b6b6b] leading-snug line-clamp-2">
                  {user.tagline}
                </p>
              </div>

              <hr className="border-[#e8e8e6]" />

              <div>
                <span className="inline-block px-2 py-1 bg-[#f7f7f5] text-[11px] font-medium text-[#6b6b6b] rounded-[4px] border border-[#e8e8e6]">
                  {user.productsCount} products shipped
                </span>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <a
                href={user.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 px-4 border border-[#e8e8e6] rounded-[6px] text-[13px] font-medium text-[#1a1a1a] hover:bg-[#f7f7f5] transition-colors"
              >
                View Profile →
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
