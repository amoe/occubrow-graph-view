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
    // The label is an artifact of the Neo4j representation, and it will always
    // be "Token".
    label: string;
    strength: number | null;    // strength can be null on the root node
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


// This is the format that the package user provides the data in.  It's 
// identical to the networkx `tree_data` format.
export interface TokenTreeNode extends TokenDatum {
    children?: TokenTreeNode[],
}

export interface GraphViewState {
    possibleRoots: string[],
    selectedRoot: string,
    widgetDropTargets: Element[],
    nodeDropTargets: Vue[],
    nodeFill: NodeFillMap,
    graphData: TokenTreeNode
}

export interface RootState {
}

export interface NodeFillMap {
    [key: number]: string;
}

// This is an augmented data format provided by js-tree-model library.
export type TokenNode = Node<TokenDatum>
