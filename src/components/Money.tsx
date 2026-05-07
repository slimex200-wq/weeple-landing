type Props = {
  value: string
}

/**
 * Money — splits the won sign from digits so the currency mark renders in
 * Pretendard (font-sans) while digits stay in Geist Mono (.num).
 *
 * Geist Mono lacks a ₩ glyph, so without this split the browser falls back
 * to the body font for ₩ only, producing a heavier, wider mark next to
 * the monospace digits.
 */
export default function Money({ value }: Props) {
  const match = value.match(/^(₩)(.+)$/)
  if (!match) {
    const hasKorean = /[가-힯]/.test(value)
    return hasKorean ? <span>{value}</span> : <span className="num">{value}</span>
  }
  const [, currency, rest] = match
  const restHasKorean = /[가-힯]/.test(rest)
  return (
    <>
      <span className="font-sans">{currency}</span>
      <span className={restHasKorean ? undefined : 'num'}>{rest}</span>
    </>
  )
}
