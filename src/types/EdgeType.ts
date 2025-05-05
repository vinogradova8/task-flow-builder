import { MarkerType } from "@xyflow/react";

export type EdgeType = {
	id: string;
    source: string;
    target: string;
    type: string;
    markerEnd: {
        type: MarkerType;
        width: number;
        height: number;
    };
}