import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BASE_DISK_SPLIT, BASE_HEAD_SPEED, BASE_REQUEST_COUNT, BASE_SECTOR_SPLIT, BASE_TRACK_SPLIT } from "../const";
import { Request } from "../classes/Request";
import { SSTF } from "../algorithms/SSTF";
import { AlgorithmFunction } from "../algorithms/AlgorithmFunction";
import { SCAN } from "../algorithms/SCAN";
import { CSCAN } from "../algorithms/CSCAN";

export type Location = {
    diskIndex: number
    sectorIndex: number
    trackIndex: number
}

const AlgorithmsContext = createContext<{
    headSpeed: number,
    setHeadSpeed: React.Dispatch<React.SetStateAction<number>> | undefined,
    headIndex: number,
    setHeadIndex: React.Dispatch<React.SetStateAction<number>> | undefined,
    simulate: boolean,
    setSimulate: React.Dispatch<React.SetStateAction<boolean>> | undefined,
    algorithm: AlgorithmFunction,
    setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmFunction>> | undefined,
    headLocation: Location,
    setHeadLocation: React.Dispatch<React.SetStateAction<Location>> | undefined,
    algorithmName: string,
    setAlgorithmName: React.Dispatch<React.SetStateAction<string>> | undefined,
    distance: number,
    setDistance: React.Dispatch<React.SetStateAction<number>> | undefined,
    }>({
        headSpeed: BASE_HEAD_SPEED,
        setHeadSpeed: undefined,
        headIndex: 0,
        setHeadIndex: undefined,
        simulate: false,
        setSimulate: undefined,
        algorithm: CSCAN,
        setAlgorithm: undefined,
        headLocation: {
            diskIndex: 0,
            sectorIndex: 0,
            trackIndex: 0,
        },
        setHeadLocation: undefined,
        algorithmName: "CSCAN",
        setAlgorithmName: undefined,
        distance: 0,
        setDistance: undefined,
})

export const AlgorithmsProvider = ({ children } : { children: ReactNode | ReactNode[]  }) =>{
    const [headSpeed, setHeadSpeed] = useState(BASE_HEAD_SPEED)
    const [headIndex, setHeadIndex] = useState(0)
    const [simulate, setSimulate] = useState(false)
    const [algorithm, setAlgorithm] = useState<AlgorithmFunction>(() => CSCAN)
    const [headLocation, setHeadLocation] = useState<Location>({
        diskIndex: 0,
        sectorIndex: 0,
        trackIndex: 0,
    })
    const [algorithmName, setAlgorithmName] = useState("CSCAN")
    const [distance, setDistance] = useState(0)

    return (
        <AlgorithmsContext.Provider value={{
            headIndex, setHeadIndex,
            simulate, setSimulate,
            headSpeed, setHeadSpeed,
            algorithm, setAlgorithm,
            headLocation, setHeadLocation,
            algorithmName, setAlgorithmName,
            distance, setDistance,
        }}>
            { children }
        </AlgorithmsContext.Provider>
    )
}

export const useAlgorithms = () =>{
    const { headSpeed, headIndex, simulate, headLocation, algorithmName, distance, setDistance, setAlgorithmName, setHeadLocation, algorithm, setAlgorithm, setHeadSpeed, setSimulate, setHeadIndex } = useContext(AlgorithmsContext)

    if(typeof setDistance === "undefined" || typeof setAlgorithmName === "undefined" || typeof setHeadLocation === "undefined" || typeof setAlgorithm === "undefined" || typeof setSimulate === "undefined" || typeof setHeadIndex === "undefined" || typeof setHeadSpeed === "undefined")
        throw new Error('Element is outside Tools Provider')

    return { headIndex, simulate, headSpeed, headLocation, algorithmName, distance, setDistance, setAlgorithmName, setHeadLocation, algorithm, setAlgorithm, setHeadSpeed, setSimulate, setHeadIndex,  }
}