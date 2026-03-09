"use client"

import { useEffect } from "react"
import { User } from "@/types/user"

interface ProfileWidgetProps {
  user: User | null
  onClose: () => void
}

export function ProfileWidget({ user, onClose }: ProfileWidgetProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <div
        className="fixed inset-0 z-[999] bg-transparent"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-[var(--surface)] border border-[var(--border)] rounded-[4px] p-5 z-[1000] font-mono">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[#cc2a2a] text-[10px] font-semibold tracking-wider uppercase">BUILDINPROCESS</span>
          <button
            onClick={onClose}
            className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full border border-[var(--border)] overflow-hidden bg-[#d4cfc6] flex items-center justify-center shrink-0">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-[11px] font-medium text-[var(--text-primary)]">${initials}</span>`;
                }}
              />
            ) : (
              <span className="text-[11px] font-medium text-[var(--text-primary)]">{initials}</span>
            )}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-base font-bold text-[var(--text-primary)] font-display uppercase truncate leading-tight mb-0.5">
              {user.name}
            </h2>
            <p className="text-[12px] text-[var(--text-secondary)] truncate">
              @{user.username}
            </p>
          </div>
        </div>

        <div className="border-t border-[#d4cfc6] pt-4 mb-4">
          <p className="text-[12px] text-[var(--text-primary)] mb-1">
            {user.location}
          </p>
          <p className="text-[12px] text-[var(--text-secondary)] line-clamp-2">
            {user.tagline}
          </p>
        </div>

        <div className="border-t border-[#d4cfc6] pt-4 mb-5">
          <p className="text-[12px] text-[var(--text-primary)]">
            {user.productsCount} products shipped
          </p>
        </div>

        <button
          onClick={() => window.open(user.profileUrl, '_blank')}
          className="w-full bg-[var(--btn-bg)] text-[var(--btn-text)] py-3 text-[13px] font-semibold uppercase hover:bg-[#333333] transition-colors"
        >
          VIEW PROFILE →
        </button>
      </div>
    </>
  )
}
