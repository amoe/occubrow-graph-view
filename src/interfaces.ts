import Vue from 'vue';
import { Node } from 'tree-model';

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

interface CategoryNodeModel {
    name: string;
}

export type CategoryNode = Node<CategoryNodeModel>


export interface GVNode {
    x: number;
    y: number;
    parent: GVNode | null;
    data: any;
    children: GVNode[];
}

export interface NodeFillMap {
    [key: number]: string;
}




export interface GraphNode {
    id: any;
    children?: GraphNode[],
    taxon: any;
}

export interface GraphViewState {
    possibleRoots: string[],
    selectedRoot: string,
    widgetDropTargets: Element[],
    nodeDropTargets: Vue[],
    nodeFill: NodeFillMap,
    taxonomyModel: CategoryNode | null,    // null if uninitialized
}

export interface RootState {
}
