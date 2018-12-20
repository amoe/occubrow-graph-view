import * as _ from 'lodash';

function isDescendant(parentNode, maybeChildNode) {
    const path = maybeChildNode.getPath();
    const isDescendant = _.some(path, n => n === parentNode);
    return isDescendant;
}

function getNodeForCategoryName(treeModelRoot, categoryName) {
    const result = treeModelRoot.first(function(someNode) {
        return someNode.model.name === categoryName;
    });
    return result;
}

function pointIsSelected(treeModelRoot, c, selectedCategoryNodes) {
    const result = _.some(
        selectedCategoryNodes, p => {
            // Not really sure why this needs an explicit return
            return isDescendant(p, getNodeForCategoryName(treeModelRoot, c.category))
        }
    );
    return result;
}

export default {
    isDescendant,
    getNodeForCategoryName,
    pointIsSelected
};
