"use client"

interface HeaderProps {
  userCount: number
}

export function Header({ userCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-[48px] border-b border-[var(--border)] bg-[var(--bg)] z-50 flex items-center justify-between px-4">
      <div className="flex flex-col justify-center">
        <span className="text-[#cc2a2a] text-[10px] font-mono font-semibold tracking-wider uppercase leading-none mb-0.5">
          BUILDINPROCESS
        </span>
        <h1 className="text-[16px] font-display text-[var(--text-primary)] leading-none uppercase">
          Builder Globe
        </h1>
      </div>
      <div className="text-[var(--text-muted)] font-mono text-[12px]">
        {userCount} builders
      </div>
    </header>
  )
}
