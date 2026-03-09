interface StatPillProps {
  count: number
}

export function StatPill({ count }: StatPillProps) {
  return (
    <div className="px-3 py-1 bg-white border border-[#e8e8e6] rounded-full flex items-center justify-center">
      <span className="text-[11px] font-medium text-[#6b6b6b]">
        {count} builders
      </span>
    </div>
  )
}
