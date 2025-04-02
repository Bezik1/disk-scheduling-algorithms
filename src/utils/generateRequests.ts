import { Request } from "../classes/Request"
import { BASE_DISK_SPLIT, BASE_MAX_DEADLINE, BASE_SECTOR_SPLIT, BASE_TRACK_SPLIT } from "../const"
import { randomGaussianInRange } from "./gaussianFunctions";

export const generateRequests = (count: number, addressMaxCount: number, diskSplit: number, sectorSplit: number, trackSplit: number, realTimeRequesProbabilityt: number): Request[] =>{
    return Array.from({ length: count }, () => generateRequest(addressMaxCount, diskSplit, sectorSplit, trackSplit, realTimeRequesProbabilityt));
}


export const generateRequest = (addressMaxCount: number, diskSplit: number, sectorSplit: number, trackSplit: number, realTimeRequesProbabilityt: number): Request =>{
    const address = getRandomAddress(addressMaxCount)
    const diskIndex = randomGaussianInRange(diskSplit/2, diskSplit/2, 0, diskSplit-1)
    const sectorIndex = randomGaussianInRange(sectorSplit/2, sectorSplit/2, 0, sectorSplit-1)
    const trackIndex = randomGaussianInRange(trackSplit/2, trackSplit/2, 0, trackSplit-1)


    const deadlineProbability = Math.random()
    const deadline = deadlineProbability < realTimeRequesProbabilityt
        ? randomGaussianInRange(BASE_MAX_DEADLINE/2, BASE_MAX_DEADLINE/2, 1, BASE_MAX_DEADLINE-1)
        : undefined

    return new Request(address, diskIndex, sectorIndex, trackIndex, deadline)
}

export const mapAddressToPositions = (
        address: number,
        diskSplit: number = BASE_DISK_SPLIT,
        sectorSplit: number = BASE_SECTOR_SPLIT,
        trackSplit: number = BASE_TRACK_SPLIT,
    ) =>{


    const diskIndex = Math.ceil(address / (diskSplit * sectorSplit))
    const sectorIndex = Math.ceil(address % (diskSplit * sectorSplit) / trackSplit)
    const trackIndex = Math.ceil(address / diskSplit)

    return {
        diskIndex,
        sectorIndex,
        trackIndex,
    }
}

export const getRandomAddress = (addressMaxCount: number) =>{
    return Math.floor(Math.random() * addressMaxCount)
}