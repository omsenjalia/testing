import { StatPill } from "./StatPill"

interface HeaderProps {
  userCount: number
}

export function Header({ userCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-11 border-b border-[#e8e8e6] bg-white z-50 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-[14px] font-medium text-[#1a1a1a]">
          BuildInProcess <span className="text-[#a0a0a0] mx-1">·</span> <span className="text-[#6b6b6b]">Builder Globe</span>
        </h1>
      </div>
      <StatPill count={userCount} />
    </header>
  )
}
