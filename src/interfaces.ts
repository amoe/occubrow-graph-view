export type NodeIdentifier = string;

export interface DragAndDropOperation {
    source: NodeIdentifier,
    target: NodeIdentifier
};

// This is a regular polar point but with the caveat that the angle is 
// represented in degrees.
export interface PolarPoint {
    angle: number;
    radius: number;
};

export interface CartesianPoint {
    x: number;
    y: number;
};

export interface WidgetDisplaySpecifier {
    name: string;
    renderCount: number;
};
