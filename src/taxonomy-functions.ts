import * as _ from 'lodash';

import { CategoryNode } from './interfaces';
import { Node } from 'tree-model';

function isDescendant(parentNode: Node<any>, maybeChildNode: Node<any>) {
    const path = maybeChildNode.getPath();
    const isDescendant = _.some(path, n => n === parentNode);
    return isDescendant;
}

function getNodeForCategoryName(treeModelRoot: CategoryNode, categoryName: string): CategoryNode {
    const result = treeModelRoot.first(function(someNode) {
        return someNode.model.name === categoryName;
    });

    if (result === undefined) {
        throw new Error("unable to locate node for category name " + categoryName);
    }

    return result;
}

export default {
    isDescendant,
    getNodeForCategoryName
};
