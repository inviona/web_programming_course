## Search ##

public boolean contains(T value) {
    return containsRecursive(root, value);
}

private boolean containsRecursive(Node<T> current, T value) {
    if (current == null) return false;
    if (value.compareTo(current.data) == 0) {
        return true;
    // Recursive cases
    if (value.compareTo(current.data) < 0)
        return containsRecursive(current.left, value);
    else  return containsRecursive(current.right, value);

## Delete ##

public root = deleteRecursive(root, value);
private Node<T> deleteRecursive(Node<T> current, T value) {
current == null return null;
    if (cmp < 0)  current.left = deleteRecursive(current.left, value);
    else if (cmp > 0) current.right ...
    else  if (current.left == null) return current.right; same for right
        T smallest = findMin(current.right);
        current.data = smallest;
        current.right = deleteRecursive(current.right, smallest);
    }
    return current;
}

private T findMin(Node<T> node) {
    while (node.left != null) node = node.left;
    return node.data;
}

At traversials use if(node != null)

## Height ##
    if (node == null) return -1; 
    return 1 + Math.max(heightRecursive(node.left), heightRecursive(node.right));


## Node counting ##

countNodesRecursive(node) {
    if (node == null) return 0;
    return 1 + countNodesRecursive(node.left) + countNodesRecursive(node.right);
}

private int countLeavesRecursive(Node<T> node) {
   node == null return 0;
    if (node.left == null && node.right == null) return 1;
    return countLeavesRecursive(node.left) + countLeavesRecursive(node.right);
}

private int countInternalRecursive(Node<T> node) {
    if (node == null || (node.left == null && node.right == null)) return 0;
    return 1 + countInternalRecursive(node.left) + countInternalRecursive(node.right);
}

## Depth 

private int getDepthRecursive(node, T value, int depth) {
    node == null return -1;
    if (cmp == 0) return depth;
    if (cmp < 0) return getDepthRecursive(node.left, value, depth + 1);
    else return getDepthRecursive(node.right, value, depth + 1);
}

## Balance

public return checkBalance(root) != -1;


private int checkBalance node == null return 0;

    int leftHeight = checkBalance(node.left);
    if (leftHeight == -1) return -1; same for right side

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    return 1 + Math.max(leftHeight, rightHeight);

## Valid BST

public return isValidBSTRecursive(root, null, null);

private boolean isValidBSTRecursive(Node<T> node, T min, T max) {
    if (node == null) return true;

    if ((min != null && node.data.compareTo(min) <= 0) ||
            (max != null && node.data.compareTo(max) >= 0)) {
        return false;
    }

    return isValidBSTRecursive(node.left, min, node.data) &&
            isValidBSTRecursive(node.right, node.data, max);
}

## public List<T> pathToNode(T value) {
    List<T> path = new ArrayList<>();
    if (findPath(root, value, path)) return path;
    return Collections.emptyList(); // not found
}

private boolean findPath(Node<T> node, T value, List<T> path) {
    if (node == null) return false;

    path.add(node.data);

    int cmp = value.compareTo(node.data);
    if (cmp == 0) return true;
    if (cmp < 0 && findPath(node.left, value, path)) return true;
    if (cmp > 0 && findPath(node.right, value, path)) return true;

    // Backtrack if value not found in this path
    path.remove(path.size() - 1);
    return false;
} // for this code in main u would write 
List<Integer> path = bst.pathToNode(60);
System.out.println("Path to 60: " + path);
