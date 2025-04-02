import { DiskSchedulingAlgorithm } from "../interfaces/DiskSchedulingAlgorithm"
import { Request } from "./Request"

export class Disk {
    private maxHeadPosition: number
    private currHeadPosition: number = 0
    private finalHeadDistance: number = 0
    private schedulingAlgorithm: DiskSchedulingAlgorithm

    constructor(initialHeadPosition: number = 0, maxHeadPosition: number, schedulingAlgorithm: DiskSchedulingAlgorithm) {
        this.currHeadPosition = initialHeadPosition
        this.maxHeadPosition = maxHeadPosition
        this.schedulingAlgorithm = schedulingAlgorithm;
        this.finalHeadDistance = 0
    }

    public update(requests: Request[]): Disk {
        this.maxHeadPosition = requests.length

        const nextHeadPosition = this.schedulingAlgorithm.getNextHeadPosition(this.currHeadPosition, requests)
        const dist = this.calculateHeadDistance(nextHeadPosition)

        this.finalHeadDistance += dist
        return this
    }

    private calculateHeadDistance(nextHeadPosition: number) {
        return Math.abs(this.currHeadPosition - nextHeadPosition)
    }

    public getFinalHeadDistance(): number {
        return this.finalHeadDistance
    }
}