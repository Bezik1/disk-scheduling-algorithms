import { Request } from "../classes/Request";
import { Location } from "../contexts/AlgorithmsContext";
import { AlgorithmFunction } from "./AlgorithmFunction";

export const SSTF: AlgorithmFunction = (requests: Request[], diskIndex: number, sectorIndex: number, trackIndex: number) => {
    if (requests.length <= 1) return new Request(0, 0, 0, 0, 0);

    const diskWeight = 10000
    const sectorWeight = 100
    const trackWeight = 1

    const headIndex = diskIndex*diskWeight + sectorIndex*sectorWeight + trackIndex*trackWeight

    const calculateIndex = (el: Location) => {
        return el.diskIndex * diskWeight + el.sectorIndex * sectorWeight +  el.trackIndex * trackWeight
    }

    return requests.sort((a, b) => Math.abs((headIndex- calculateIndex(a))) - Math.abs((headIndex- calculateIndex(b))))[0]
};
