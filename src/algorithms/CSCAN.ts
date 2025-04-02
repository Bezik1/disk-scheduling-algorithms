import { Request } from "../classes/Request";
import { Location } from "../contexts/AlgorithmsContext";
import { AlgorithmFunction } from "./AlgorithmFunction";

export const CSCAN: AlgorithmFunction = (
    requests: Request[],
    diskIndex: number,
    sectorIndex: number,
    trackIndex: number
) => {
    if (requests.length === 0) return new Request(0, 0, 0, 0, 0);

    const diskWeight = 10000;
    const sectorWeight = 100;
    const trackWeight = 1;

    const headIndex = diskIndex * diskWeight + sectorIndex * sectorWeight + trackIndex * trackWeight;

    const calculateIndex = (el: Location) => {
        return el.diskIndex * diskWeight + el.sectorIndex * sectorWeight + el.trackIndex * trackWeight;
    };

    requests.sort((a, b) => calculateIndex(a) - calculateIndex(b));

    let splitIndex = requests.findIndex(req => calculateIndex(req) >= headIndex);

    if (splitIndex === -1) {
        splitIndex = requests.sort((a, b) => b.diskIndex - a.diskIndex).findIndex(req => calculateIndex(req) >= headIndex);
    }

    if (splitIndex === -1) {
        return requests[0];
    }

    const right = requests.slice(splitIndex);
    const left = requests.slice(0, splitIndex)

    if (right.length > 0) {
        return right[0];
    } else {
        return left[left.length-1];
    }
};
