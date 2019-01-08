import { TokenTreeNode, TokenDatum } from '@/interfaces';
import { hierarchy, cluster, HierarchyPointNode } from 'd3';

function getClusterDimensions(breadth: number, width: number, depthOffset: number): [number, number] {
    const depth = (width / 2) - depthOffset;
    return [breadth, depth];
}

function clusterFresh(data: TokenTreeNode, dimensions: [number, number]): HierarchyPointNode<TokenDatum> {
    const theHierarchy = hierarchy(data, d => d.children);
    const clusterLayout = cluster();
    clusterLayout(theHierarchy);
    return theHierarchy as HierarchyPointNode<TokenDatum>;
}

export { getClusterDimensions, clusterFresh };
