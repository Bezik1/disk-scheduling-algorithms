import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BASE_DISK_SPLIT, BASE_REQUEST_COUNT, BASE_SECTOR_SPLIT, BASE_TRACK_SPLIT } from "../const";
import { Request } from "../classes/Request";

const ToolsContext = createContext<{
    diskSplit: number,
    setDiskSplit: React.Dispatch<React.SetStateAction<number>> | undefined,
    sectorSplit: number,
    setSectorSplit: React.Dispatch<React.SetStateAction<number>> | undefined,
    trackSplit: number,
    setTrackSplit: React.Dispatch<React.SetStateAction<number>> | undefined,
    requestCount: number,
    setRequestCount: React.Dispatch<React.SetStateAction<number>> | undefined,
    requests: Request[],
    setRequests: React.Dispatch<React.SetStateAction<Request[]>> | undefined,
    zoom: number,
    setZoom: React.Dispatch<React.SetStateAction<number>> | undefined,
    realTimeRequesProbabilityt: number,
    setRealTimeRequesProbabilityt: React.Dispatch<React.SetStateAction<number>> | undefined,
    }>({
        diskSplit: BASE_DISK_SPLIT,
        setDiskSplit: undefined,
        sectorSplit: BASE_SECTOR_SPLIT,
        setSectorSplit: undefined,
        trackSplit: BASE_TRACK_SPLIT,
        setTrackSplit: undefined,
        requestCount: BASE_REQUEST_COUNT,
        setRequestCount: undefined,
        requests: [],
        setRequests: undefined,
        zoom: 0,
        setZoom: undefined,
        realTimeRequesProbabilityt: 0,
        setRealTimeRequesProbabilityt: undefined,
})

export const ToolsProvider = ({ children } : { children: ReactNode | ReactNode[]  }) =>{
    const [diskSplit, setDiskSplit] = useState(BASE_DISK_SPLIT)
    const [sectorSplit, setSectorSplit] = useState(BASE_SECTOR_SPLIT)
    const [trackSplit, setTrackSplit] = useState(BASE_TRACK_SPLIT)
    const [requestCount, setRequestCount] = useState(BASE_REQUEST_COUNT)
    const [requests, setRequests] = useState<Request[]>([])
    const [zoom, setZoom] = useState(0)
    const [realTimeRequesProbabilityt, setRealTimeRequesProbabilityt] = useState(0)

    return (
        <ToolsContext.Provider value={{
            diskSplit, setDiskSplit,
            sectorSplit, setSectorSplit,
            trackSplit, setTrackSplit,
            requestCount, setRequestCount,
            requests, setRequests,
            zoom, setZoom,
            realTimeRequesProbabilityt, setRealTimeRequesProbabilityt,
        }}>
            { children }
        </ToolsContext.Provider>
    )
}

export const useTools = () =>{
    const { diskSplit, sectorSplit, trackSplit, requestCount, requests, zoom, realTimeRequesProbabilityt, setRealTimeRequesProbabilityt, setZoom, setRequests, setRequestCount, setDiskSplit, setSectorSplit, setTrackSplit } = useContext(ToolsContext)

    if(typeof setRealTimeRequesProbabilityt === "undefined" || typeof setZoom === "undefined" || typeof setRequests === "undefined" || typeof setDiskSplit === "undefined" || typeof setSectorSplit === "undefined" ||  typeof setTrackSplit === "undefined" || typeof setRequestCount === "undefined")
        throw new Error('Element is outside Tools Provider')

    return { diskSplit, sectorSplit, trackSplit, requestCount, requests, zoom, realTimeRequesProbabilityt, setRealTimeRequesProbabilityt, setZoom, setDiskSplit, setSectorSplit, setTrackSplit, setRequestCount, setRequests }
}