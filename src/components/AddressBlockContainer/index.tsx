import { Request } from "../../classes/Request"
import { useTools } from "../../contexts/ToolsContext"
import "./index.css"

const AddressBlockContainer = () => {
    const { diskSplit, sectorSplit, trackSplit, requests } = useTools()

    const getBlocksForDisk = (diskIndex: number) => {
        const blocks = []
        for (let j = 0; j < sectorSplit; j++) {
            for (let k = 0; k < trackSplit; k++) {
                const condition = requests.find(el =>
                    el.diskIndex === diskIndex &&
                    el.sectorIndex === j &&
                    el.trackIndex === k
                )
                blocks.push(
                    <div key={`${diskIndex}-${j}-${k}`} className={`block ${condition ? "activated" : ""}`} />
                )
            }
        }
        return blocks
    }

    return (
        <div className="scroll-container">
            {Array.from({ length: diskSplit }, (_, i) => (
                <div key={i} className="disk-container">
                    <h3>Disk {i + 1}</h3>
                    <div className="block-container">{getBlocksForDisk(i)}</div>
                </div>
            ))}
        </div>
    )
}

export default AddressBlockContainer
