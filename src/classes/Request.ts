import { mapAddressToPositions } from "../utils/generateRequests"

export class Request {
    public position: number
    public diskIndex: number
    public sectorIndex: number
    public trackIndex: number
    public deadline?: number

    constructor(position: number, diskIndex: number, sectorIndex: number, trackIndex: number, deadline?: number) {
        this.position = position
        this.diskIndex = diskIndex
        this.sectorIndex = sectorIndex
        this.trackIndex = trackIndex
        this.deadline = deadline
    }

    getCoordinates() {
        return mapAddressToPositions(this.position)
    }
}