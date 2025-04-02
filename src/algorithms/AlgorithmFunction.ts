import { Request } from "../classes/Request"

export type AlgorithmFunction = (
    requests: Request[],
    diskIndex: number,
    sectorIndex: number,
    trackIndex: number
) => Request