import * as _ from 'lodash';

import { CategoryNode } from './interfaces';
import { Node } from 'tree-model';

function isDescendant(parentNode: Node<any>, maybeChildNode: Node<any>) {
    const path = maybeChildNode.getPath();
    const isDescendant = _.some(path, n => n === parentNode);
    return isDescendant;
}

function getNodeForCategoryName(treeModelRoot: CategoryNode, categoryName: string) {
    const result = treeModelRoot.first(function(someNode) {
        return someNode.model.name === categoryName;
    });
    return result;
}

export default {
    isDescendant,
    getNodeForCategoryName
};
