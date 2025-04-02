import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import Disk from "../Disk";
import { useTools } from "../../contexts/ToolsContext";

const DiskGroup = ({ scrollY, scrollTarget }: { scrollY: any, scrollTarget: any }) => {
    const disksRef = useRef<Group>(null!);
    const { diskSplit, zoom } = useTools()

    useFrame(() => {
        if (disksRef.current) {
            disksRef.current.rotation.y += 0.001;
            scrollY.current += (scrollTarget.current - scrollY.current) * 0.1;
            disksRef.current.position.y = scrollY.current;
        }
    });

    return (
        <group position={[-0.7 - zoom*.1, -diskSplit / 4, -zoom]} ref={disksRef}>
            {new Array(diskSplit).fill(null).map((_, index) => (
                <Disk index={index} />
            ))}
        </group>
    );
};

export default DiskGroup;
