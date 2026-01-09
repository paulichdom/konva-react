import { useAtom } from "jotai"
import { dotsAtom } from "./ScgDots.atoms"

export const SvgDots = () => {
  const [dots] = useAtom(dotsAtom)
  return (
    <g>
      {dots.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r='2' fill='#aaa' />
      ))}
    </g>
  )
}