import { Request } from "../classes/Request";
import { AlgorithmFunction } from "./AlgorithmFunction";

export const EDF: AlgorithmFunction = (requests: Request[], diskIndex: number, sectorIndex: number, trackIndex: number) => {
    if (requests.length === 0) return new Request(0, 0, 0, 0);

    const diskWeight = 10000;
    const sectorWeight = 100;
    const trackWeight = 1;

    const headIndex = diskIndex * diskWeight + sectorIndex * sectorWeight + trackIndex * trackWeight;

    const calculateIndex = (el: Request) => {
        return el.diskIndex * diskWeight + el.sectorIndex * sectorWeight + el.trackIndex * trackWeight;
    };

    const withDeadline = requests.filter((r) => r.deadline !== undefined);

    if (withDeadline.length > 0) {
        return withDeadline.sort((a, b) => a.deadline! - b.deadline!)[0];
    }

    const getActiveDiskIndex = (requests: Request[]): number | null => {
        if (requests.length === 0) return null;

        const activeDisks = [...new Set(requests.map(req => req.diskIndex))];
        return activeDisks.length > 0 ? Math.min(...activeDisks) : null;
    };

    if (diskIndex === getActiveDiskIndex(requests)) {
        return requests.sort(
            (a, b) =>
                Math.abs(headIndex - calculateIndex(a)) -
                Math.abs(headIndex - calculateIndex(b))
        )[0];
    }

    return new Request(0, 0, 0, 0);

}