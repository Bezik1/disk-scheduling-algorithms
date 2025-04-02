import "./index.css"
import { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Request } from "../../classes/Request"
import DiskGroup from "../DisksGroup"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useTools } from "../../contexts/ToolsContext"

const DisksContainer = () => {
    const { requests } = useTools()
    const scrollY = useRef(0)
    const scrollTarget = useRef(0)

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            scrollTarget.current += event.deltaY * 0.002
        }

        window.addEventListener("wheel", handleScroll)
        return () => window.removeEventListener("wheel", handleScroll)
    }, [])

    console.log(requests)

    return (
        <Canvas
            style={{
                position: "absolute",
                width: window.innerWidth * 0.8,
                height: window.innerHeight*0.95
            }}
            camera={{
                position: [0, 2, 4],
                fov: 30,
            }}
        >
            <ambientLight intensity={0.8}/>
            <DiskGroup scrollY={scrollY} scrollTarget={scrollTarget} />
            <EffectComposer>
                <Bloom
                    intensity={1.5}
                    kernelSize={2}
                    luminanceThreshold={0.5}
                    luminanceSmoothing={0.9}
                />
            </EffectComposer>
        </Canvas>
    )
}

export default DisksContainer
