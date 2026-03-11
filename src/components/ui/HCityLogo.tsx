export default function HCityLogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none" className={className}>
      <polygon points="45,4 82,24 82,66 45,86 8,66 8,24"
        fill="rgba(27,94,53,0.35)" stroke="rgba(76,175,120,0.45)" strokeWidth="1.5" />
      <text x="50%" y="53%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="Cormorant Garamond,Georgia,serif" fontSize="42" fontWeight="700" fill="white">H</text>
      <line x1="24" y1="70" x2="66" y2="70" stroke="#4CAF78" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
