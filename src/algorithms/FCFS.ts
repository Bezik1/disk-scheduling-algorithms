import { Request } from "../classes/Request";
import { AlgorithmFunction } from "./AlgorithmFunction";

export const FCFS: AlgorithmFunction = (requests: Request[], diskIndex: number, sectorIndex: number, trackIndex: number,) => {
    console.log(diskIndex, sectorIndex, trackIndex)
    return requests[0]
};
