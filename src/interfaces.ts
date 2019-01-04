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

// This is the 'domain-specific' part of the graph node.  At the moment, these
// match node properties that are given by the backend.
export interface TokenDatum {
    content: string;
    id: number;
    label: string;
    strength: number;
}


// Representing a tree node that's been processed by d3's cluster layout.
export interface GVNode {
    x: number;
    y: number;
    depth: number;
    height: number;
    parent: GVNode | null;
    data: TokenDatum;
    children: GVNode[];
}

export interface NodeFillMap {
    [key: number]: string;
}


export interface TokenTreeNode {
    id: number;
    children?: TokenTreeNode[],
    content: string;
    label: string;
}

export interface GraphViewState {
    possibleRoots: string[],
    selectedRoot: string,
    widgetDropTargets: Element[],
    nodeDropTargets: Vue[],
    nodeFill: NodeFillMap
}

export interface RootState {
}
