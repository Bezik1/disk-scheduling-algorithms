import { useState } from "react"
import { useAlgorithms } from "../../../contexts/AlgorithmsContext"
import { useTools } from "../../../contexts/ToolsContext"
import "./index.css"
import { FCFS } from "../../../algorithms/FCFS"
import { SSTF } from "../../../algorithms/SSTF"
import { SCAN } from "../../../algorithms/SCAN"
import { CSCAN } from "../../../algorithms/CSCAN"
import { EDF } from "../../../algorithms/EDF"
import { FDSCAN } from "../../../algorithms/FDSCAN"

const Tools = () =>{
    const { setSimulate, simulate, headSpeed, distance, setHeadSpeed, setHeadLocation, headLocation, algorithmName, setAlgorithm, setAlgorithmName } = useAlgorithms()
    const { realTimeRequesProbabilityt, setRealTimeRequesProbabilityt, sectorSplit, diskSplit, trackSplit, requestCount, zoom, setZoom, setDiskSplit, setSectorSplit, setTrackSplit, setRequestCount } = useTools()

    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="tools">
            <div className="menu-el">
                <div className="menu-el-title">Speed: </div>
                <div className="menu-el-sub">
                    <input type="range" value={headSpeed} min={0.01} max={1} step={0.01} className="menu-el-input" onChange={e => setHeadSpeed(Number(e.target.value))}/>
                    <div className="menu-el-value">{headSpeed}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Disks: </div>
                <div className="menu-el-sub">
                    <input type="range" value={diskSplit} min={1} max={50} step={1} className="menu-el-input" onChange={e => setDiskSplit(Number(e.target.value))}/>
                    <div className="menu-el-value">{diskSplit}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Sectors: </div>
                <div className="menu-el-sub">
                    <input type="range" value={sectorSplit} min={1} max={50} step={1} className="menu-el-input" onChange={e => setSectorSplit(Number(e.target.value))}/>
                    <div className="menu-el-value">{sectorSplit}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Tracks: </div>
                <div className="menu-el-sub">
                    <input type="range" value={trackSplit} min={1} max={50} step={1} className="menu-el-input" onChange={e => setTrackSplit(Number(e.target.value))}/>
                    <div className="menu-el-value">{trackSplit}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Request Count: </div>
                <div className="menu-el-sub">
                    <input type="range" value={requestCount} min={1} max={diskSplit*sectorSplit*trackSplit} step={10} className="menu-el-input" onChange={e => setRequestCount(Number(e.target.value))}/>
                    <div className="menu-el-value">{requestCount}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Head Disk Location: </div>
                <div className="menu-el-sub">
                    <input type="range" value={headLocation.diskIndex} min={0} max={diskSplit-1} step={1} className="menu-el-input" onChange={e => setHeadLocation({ ...headLocation, diskIndex: Number(e.target.value) })}/>
                    <div className="menu-el-value">{headLocation.diskIndex}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Zoom: </div>
                <div className="menu-el-sub">
                    <input type="range" value={zoom} min={0} max={20} step={.1} className="menu-el-input" onChange={e => setZoom(Number(e.target.value))}/>
                    <div className="menu-el-value">{zoom}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Real Time Request Probability: </div>
                <div className="menu-el-sub">
                    <input type="range" value={realTimeRequesProbabilityt} min={0} max={1} step={.01} className="menu-el-input" onChange={e => setRealTimeRequesProbabilityt(Number(e.target.value))}/>
                    <div className="menu-el-value">{realTimeRequesProbabilityt}</div>
                </div>
            </div>
            <div className="menu-el width-limited">
                <div className="menu-el-title">Algorithm: </div>
                <div className="algorithms-menu-container">
                    <div className="menu-el-value algorithm-name" onClick={() => setShowMenu(!showMenu)}>{algorithmName}</div>
                    {showMenu && (
                        <div className="algorithms-menu">
                            <div className="algorithm-menu-el" onClick={() => {setAlgorithmName("FCFS");  setAlgorithm(() => FCFS); setShowMenu(false) }}>* FCFS</div>
                            <div className="algorithm-menu-el" onClick={() => {setAlgorithmName("SSTF");  setAlgorithm(() => SSTF); setShowMenu(false) }}>* SSTF</div>
                            <div className="algorithm-menu-el" onClick={() => {setAlgorithmName("SCAN");  setAlgorithm(() => SCAN); setShowMenu(false) }}>* SCAN</div>
                            <div className="algorithm-menu-el" onClick={() => {setAlgorithmName("CSCAN"); setAlgorithm(() => CSCAN);  setShowMenu(false) }}>* CSCAN</div>
                            <div className="algorithm-menu-el" onClick={() => {setAlgorithmName("EDF"); setAlgorithm(() => EDF);  setShowMenu(false) }}>* EDF</div>
                            <div className="algorithm-menu-el" onClick={() => {setAlgorithmName("FDSCAN"); setAlgorithm(() => FDSCAN);  setShowMenu(false) }}>* FDSCAN</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="menu-el distance-name">
                <div className="menu-el-title">Distance: </div>
                <div className="menu-el-value">{distance}</div>
            </div>
            <div className={`menu-el-btn ${simulate && "menu-activated"}`} onClick={() => setSimulate(!simulate)}>Simulate</div>
        </div>
    )
}

export default Tools