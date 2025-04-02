import { useEffect, useRef, useState } from "react";
import Track from "../Track";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useTools } from "../../contexts/ToolsContext";
import { useAlgorithms } from "../../contexts/AlgorithmsContext";
import { Request } from "../../classes/Request";

interface Location {
    diskIndex: number;
    sectorIndex: number;
    trackIndex: number;
}

interface DiskProps {
    index: number;
}

const Disk: React.FC<DiskProps> = ({ index }) => {
    const { setHeadIndex, algorithm, simulate, headSpeed, headLocation, distance, setDistance } = useAlgorithms();
    const { requests, setRequests, sectorSplit, trackSplit } = useTools();
    const headRef = useRef<Group>(null);
    const [headMoving, setHeadMoving] = useState<boolean>(false);
    const [nextLocation, setNextLocation] = useState<Location>(headLocation);
    const [tick, setTick] = useState<number>(0);

    useEffect(() => {
        if (simulate && requests.length > 0) {
            const newLocation = algorithm(
                requests,
                nextLocation.diskIndex,
                nextLocation.sectorIndex,
                nextLocation.trackIndex
            );

            if (newLocation.diskIndex === index) {
                setDistance(
                    distance +
                    Math.abs(
                        nextLocation.diskIndex +
                        nextLocation.sectorIndex +
                        nextLocation.trackIndex -
                        (newLocation.diskIndex + newLocation.sectorIndex + newLocation.trackIndex)
                    )
                );
                setNextLocation(newLocation);
                setHeadMoving(true);
            }
        }
    }, [requests, simulate]);

    useEffect(() => {
        setNextLocation(headLocation);
    }, [headLocation]);

    useEffect(() => {
        if (headLocation.diskIndex !== index) return;
        const radius = (headLocation.sectorIndex / sectorSplit) * 1;
        const angle = (headLocation.trackIndex / trackSplit) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = -index * 1 + 0.15;

        moveHead([x, y, z]);
    }, [headLocation]);

    const moveHead = (targetPosition: [number, number, number]) => {
        if (headRef.current) {
            const currentPosition = headRef.current.position;
            const newPos: [number, number, number] = [
                currentPosition.x + (targetPosition[0] - currentPosition.x) * headSpeed,
                currentPosition.y + (targetPosition[1] - currentPosition.y) * headSpeed,
                currentPosition.z + (targetPosition[2] - currentPosition.z) * headSpeed,
            ];

            headRef.current.position.set(...newPos);

            if (
                Math.abs(currentPosition.x - targetPosition[0]) < 0.01 &&
                Math.abs(currentPosition.y - targetPosition[1]) < 0.01 &&
                Math.abs(currentPosition.z - targetPosition[2]) < 0.01
            ) {
                setHeadMoving(false);
                setRequests(requests.filter(
                        (el) =>
                            !(
                                el.diskIndex === nextLocation.diskIndex &&
                                el.sectorIndex === nextLocation.sectorIndex &&
                                el.trackIndex === nextLocation.trackIndex
                            )
                    )
                );
                setHeadIndex(nextLocation.diskIndex * nextLocation.sectorIndex * nextLocation.trackIndex);
            }
        }
    };

    useFrame(({ clock }) => {
        if (headMoving && simulate && nextLocation.diskIndex === index) {
            const radius = (nextLocation.sectorIndex / sectorSplit) * 1;
            const angle = (nextLocation.trackIndex / trackSplit) * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            const y = -index * 1 + 0.15;
            moveHead([x, y, z]);
        }

        if (Math.floor(clock.elapsedTime) > tick) {
            console.log(tick)
            setTick(Math.floor(clock.elapsedTime));
            setRequests(requests
                    .map((req) => ({ ...req, deadline: req.deadline === undefined ? undefined : req.deadline - 1 } as Request))
                    .filter((req) => req.deadline === undefined ||  (req.deadline !== undefined && req.deadline > 0))
            );
        }
    });

    const hasRequests = simulate && nextLocation.diskIndex === index && requests.some((el: Request) => el.diskIndex === index);

    const getColor = () =>{
        if(hasRequests) return "cyan"
        else if(headLocation.diskIndex === index) return "rgb(222, 139, 238)"
        else return "#00C0C0"
    }

    return (
        <>
            <group position={[0, -index * 1 + 0.15, 0]} ref={headRef}>
                <mesh>
                    <cylinderGeometry args={[0.04, 0.04, 0.4]} />
                    <meshStandardMaterial color={getColor()} emissive={getColor()} emissiveIntensity={0.3}/>
                </mesh>
            </group>
            <group key={index}>
                <mesh position={[0, -index, 0]}>
                    <cylinderGeometry args={[1, 1, 0.1, 50]} />
                    <meshStandardMaterial color="#ADD8E6" opacity={1} />
                </mesh>
                {new Array(sectorSplit).fill(null).map((_, ringIndex) => (
                    <group key={ringIndex} position={[0, -index, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        {new Array(trackSplit).fill(null).map((_, trackIndex) => (
                            <Track
                                key={trackIndex}
                                index={trackIndex}
                                radius={(1 * ringIndex) / sectorSplit}
                                deadline={requests.find(
                                    (el) =>
                                        el.diskIndex === index &&
                                        el.sectorIndex === ringIndex &&
                                        el.trackIndex === trackIndex
                                )?.deadline || 0}
                                marked={requests.some(
                                    (el) =>
                                        el.diskIndex === index &&
                                        el.sectorIndex === ringIndex &&
                                        el.trackIndex === trackIndex
                                )}
                            />
                        ))}
                    </group>
                ))}
            </group>
        </>
    );
};

export default Disk;