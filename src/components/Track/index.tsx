import { BASE_MAX_DEADLINE } from "../../const"
import { useTools } from "../../contexts/ToolsContext"

const Track = ({ index, radius, marked, deadline } : { index: number, radius: number, marked: boolean, deadline?: number }) =>{
    const { trackSplit } = useTools()
    const angle = (index / trackSplit) * Math.PI * 2
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    const z = 0

    const interpolateColor = (deadline: number) => {
        const t = Math.min(Math.max(deadline / BASE_MAX_DEADLINE + 0.001, 0), 1)
        const r = Math.round(48 + (138 - 48) * t)
        const g = Math.round(126 + (43 - 126) * t)
        const b = Math.round(236 + (226 - 236) * t)
        return `rgb(${r},${g},${b})`;
    };

    return (
        <>
            <mesh position={[x, y, z-0.1]}>
                <boxGeometry args={[0.01, 0.01, 0.01]} />
                {marked ? <meshStandardMaterial
                    color={deadline ? interpolateColor(deadline) : `rgb(255, 255, 255)`}
                    emissive={deadline ? interpolateColor(deadline) : `rgb(255, 255, 255)`}
                    emissiveIntensity={deadline ? 10 + (BASE_MAX_DEADLINE / (deadline + 0.8)) : 2.5}
                /> : <meshStandardMaterial color="black" />}
            </mesh>
        </>
    )
}

export default Track