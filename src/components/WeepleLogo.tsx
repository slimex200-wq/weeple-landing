type Props = {
  size?: number
  className?: string
}

/**
 * weeple 로고 - C 변형
 * 4색 conic gradient 링 + 가운데에 L3 Mist+Mint 월페이퍼 + "w"
 */
export default function WeepleLogo({ size = 32, className }: Props) {
  const padding = Math.max(2, Math.round(size * 0.065))
  const fontSize = Math.round(size * 0.5)

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-grid',
        placeItems: 'center',
        width: size,
        height: size,
        borderRadius: '9999px',
        background:
          'conic-gradient(from 200deg, #FF8A7A, #F9D876, #5EEAD4, #B89EFF, #FF8A7A)',
        padding,
        flexShrink: 0,
      }}
      aria-hidden
    >
      {/* Inner wallpaper — same gradients + blobs as landing body */}
      <span
        style={{
          position: 'absolute',
          inset: padding,
          borderRadius: '9999px',
          background: `
            radial-gradient(ellipse 70% 55% at 25% 20%, rgba(14,165,160,0.35), transparent 60%),
            radial-gradient(ellipse 65% 55% at 78% 78%, rgba(125,211,252,0.3), transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 20%, rgba(94,234,212,0.22), transparent 60%),
            linear-gradient(180deg, #F0F4F1 0%, #E5EDE8 100%)
          `,
        }}
      />
      {/* Text */}
      <span
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'var(--font-geist-mono)',
          fontSize,
          fontWeight: 700,
          color: '#181622',
          letterSpacing: '-0.05em',
          lineHeight: 1,
        }}
      >
        w
      </span>
    </span>
  )
}
