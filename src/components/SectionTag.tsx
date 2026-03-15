interface SectionTagProps {
  label: string
  color: string
}

export default function SectionTag({ label, color }: SectionTagProps) {
  return (
    <span className="inline-flex items-center gap-2 border border-[rgba(35,31,35,0.08)] rounded-full px-3 py-1.5">
      <span
        className="w-[10px] h-[10px] rounded-[2px]"
        style={{ backgroundColor: color }}
      />
      <span
        className="font-fragment uppercase text-[11px] tracking-[0.75px]"
        style={{ color: 'rgba(35,31,35,0.48)' }}
      >
        {label}
      </span>
    </span>
  )
}
