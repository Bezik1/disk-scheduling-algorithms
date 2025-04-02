import { Request } from "../classes/Request";
import { AlgorithmFunction } from "./AlgorithmFunction";

export const FDSCAN: AlgorithmFunction = (requests: Request[], diskIndex: number, sectorIndex: number, trackIndex: number) => {
    if (requests.length === 0) return new Request(0, 0, 0, 0, 0);

    const diskWeight = 10000;
    const sectorWeight = 100;
    const trackWeight = 1;

    const headIndex = diskIndex * diskWeight + sectorIndex * sectorWeight + trackIndex * trackWeight;

    const calculateIndex = (el: Request) => {
        return el.diskIndex * diskWeight + el.sectorIndex * sectorWeight + el.trackIndex * trackWeight;
    };

    requests.sort((a, b) => (a.deadline && b.deadline) ? a.deadline - b.deadline : calculateIndex(a) - calculateIndex(b));
    const shortestDeadlineRequest = requests[0];

    requests.sort((a, b) => calculateIndex(a) - calculateIndex(b));

    let splitIndex = requests.findIndex(req => calculateIndex(req) >= calculateIndex(shortestDeadlineRequest));
    if (splitIndex === -1) splitIndex = requests.length;

    let left = requests.filter(req => calculateIndex(req) < headIndex);
    let right = requests.filter(req => calculateIndex(req) >= headIndex);

    if (shortestDeadlineRequest && calculateIndex(shortestDeadlineRequest) < headIndex) {
        return left.length > 0 ? left[left.length - 1] : shortestDeadlineRequest;
    } else {
        return right.length > 0 ? right[0] : shortestDeadlineRequest;
    }
};
