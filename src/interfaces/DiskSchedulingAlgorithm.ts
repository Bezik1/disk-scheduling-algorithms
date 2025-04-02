import { Request } from "../classes/Request";

export interface DiskSchedulingAlgorithm {
    getNextHeadPosition(currHeadPosition: number, addresses: Request[]): number
}