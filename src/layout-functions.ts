import { PolarPoint, CartesianPoint, GVNode } from './interfaces';



function isOnRightSide(node: GVNode) {
    const isInFirstHalf = node.x < 180;
    const isLeafNode = !node.children;

    return isInFirstHalf == isLeafNode;
}


// Projection function
function polarToCartesian(p: PolarPoint): CartesianPoint {
    const angleRadians = (p.angle - 90) / 180 * Math.PI;
    const radius = p.radius;

    return {
        x: radius * Math.cos(angleRadians),
        y: radius * Math.sin(angleRadians)
    }
}

function cartesianToPolar(p: CartesianPoint): PolarPoint {
    return {
        angle: Math.atan2(p.y, p.x),
        radius: Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2))
    };
}

function bearing(point1: CartesianPoint, point2: CartesianPoint): number {
    var theta = Math.atan2(point2.x - point1.x, point1.y - point2.y);
    return theta;
}

function getOptimalCircumferencePoint(
    sourcePoint: CartesianPoint,
    sourceRadius: number,
    targetPoint: CartesianPoint
): CartesianPoint {
    const angle = (Math.PI * 1.5) + bearing(sourcePoint, targetPoint);

    const x = sourcePoint.x + sourceRadius * Math.cos(angle);
    const y = sourcePoint.y + sourceRadius * Math.sin(angle);

    return { x, y };
}



function formatPoint(point: CartesianPoint): string {
    return `${point.x} ${point.y}`;
}


function getPathDescriptionForEdge(arche: PolarPoint, sourceRadius: number, telos: PolarPoint): string {
    const sourcePoint = polarToCartesian(arche);
    const targetPoint = polarToCartesian(telos)

    const circumferencePoint = getOptimalCircumferencePoint(
        sourcePoint,
        sourceRadius,
        targetPoint
    );

    //console.log("found circumference point as %o", circumferencePoint);

    const moveInstruction = "M" + formatPoint(circumferencePoint);

    const controlStart = formatPoint({
        x: targetPoint.x,
        y: (targetPoint.y + circumferencePoint.y) / 2
    });

    const controlEnd = formatPoint({
        x: circumferencePoint.x,
        y: (targetPoint.y + circumferencePoint.y) / 2
    });

    const endPoint = formatPoint(targetPoint);

    const curveInstruction = `C ${controlStart}, ${controlEnd}, ${endPoint}`;
    const fullDescription = `${moveInstruction} ${curveInstruction}`;

    return fullDescription;
}

export default {
    isOnRightSide, getPathDescriptionForEdge,
    polarToCartesian
};
