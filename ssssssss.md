public class BinarySearchTree {
    private static class TreeElement {
        String element;
        TreeElement smaller;
        TreeElement greater;

        TreeElement(String element) {
            this.element = element;
        }
    }

    private TreeElement root;

    public void insert(String element) {
        root = insertRecursive(root, element);
    }

    private TreeElement insertRecursive(TreeElement current, String element) {
        if (current == null) {
            return new TreeElement(element);
        }
        if (element.compareTo(current.element) < 0) {
            current.smaller = insertRecursive(current.smaller, element);
        } else if (element.compareTo(current.element) > 0) {
            current.greater = insertRecursive(current.greater, element);
        }
        return current;
    }

    public void printInOrder() {
        printInOrderRecursive(root);
    }

    private void printInOrderRecursive(TreeElement node) {
        if (node != null) {
            printInOrderRecursive(node.smaller);
            System.out.println(node.element);
            printInOrderRecursive(node.greater);
        }
    }

    // New methods below

    // Search for a specific string in the tree
    public boolean search(String element) {
        return searchRecursive(root, element);
    }

    private boolean searchRecursive(TreeElement current, String element) {
        // Base case: element not found
        if (current == null) {
            return false;
        }
        
        // Compare the strings
        int compareResult = element.compareTo(current.element);
        
        // Element found
        if (compareResult == 0) {
            return true;
        }
        
        // Search left or right subtree
        if (compareResult < 0) {
            return searchRecursive(current.smaller, element);
        } else {
            return searchRecursive(current.greater, element);
        }
    }

    // Find minimum value in the tree
    public String findMin() {
        if (root == null) {
            return null;
        }
        return findMinNode(root).element;
    }

    private TreeElement findMinNode(TreeElement node) {
        // The leftmost element is the minimum
        TreeElement current = node;
        while (current.smaller != null) {
            current = current.smaller;
        }
        return current;
    }

    // Find maximum value in the tree
    public String findMax() {
        if (root == null) {
            return null;
        }
        return findMaxNode(root).element;
    }

    private TreeElement findMaxNode(TreeElement node) {
        // The rightmost element is the maximum
        TreeElement current = node;
        while (current.greater != null) {
            current = current.greater;
        }
        return current;
    }

    // Delete a node with the given value
    public void delete(String element) {
        root = deleteRecursive(root, element);
    }

    private TreeElement deleteRecursive(TreeElement current, String element) {
        // Base case: element not found
        if (current == null) {
            return null;
        }

        // Compare strings
        int compareResult = element.compareTo(current.element);
        
        // Navigate to the node to delete
        if (compareResult < 0) {
            current.smaller = deleteRecursive(current.smaller, element);
        } else if (compareResult > 0) {
            current.greater = deleteRecursive(current.greater, element);
        } else {
            // Node found, perform deletion

            // Case 1: Node has no children
            if (current.smaller == null && current.greater == null) {
                return null;
            }

            // Case 2: Node has only one child
            if (current.smaller == null) {
                return current.greater;
            }
            if (current.greater == null) {
                return current.smaller;
            }

            // Case 3: Node has two children
            // Find the inorder successor (smallest element in the right subtree)
            String minValue = findMinNode(current.greater).element;
            current.element = minValue;
            
            // Delete the inorder successor
            current.greater = deleteRecursive(current.greater, minValue);
        }
        return current;
    }

    // Get height of the tree
    public int getHeight() {
        return getHeightRecursive(root);
    }

    private int getHeightRecursive(TreeElement node) {
        if (node == null) {
            return 0;
        }
        int leftHeight = getHeightRecursive(node.smaller);
        int rightHeight = getHeightRecursive(node.greater);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Count nodes in the tree
    public int size() {
        return sizeRecursive(root);
    }

    private int sizeRecursive(TreeElement node) {
        if (node == null) {
            return 0;
        }
        return 1 + sizeRecursive(node.smaller) + sizeRecursive(node.greater);
    }

    // Print the tree levels
    public void printLevelOrder() {
        int h = getHeight();
        for (int i = 1; i <= h; i++) {
            System.out.println("Level " + i + ":");
            printCurrentLevel(root, i);
            System.out.println();
        }
    }

    private void printCurrentLevel(TreeElement root, int level) {
        if (root == null) {
            return;
        }
        if (level == 1) {
            System.out.print(root.element + " ");
        } else if (level > 1) {
            printCurrentLevel(root.smaller, level - 1);
            printCurrentLevel(root.greater, level - 1);
        }
    }
    
    // Count leaf nodes at a specific depth
    public int countLeavesAtDepth(int depth) {
        return countLeavesAtDepthRecursive(root, 1, depth);
    }
    
    private int countLeavesAtDepthRecursive(TreeElement node, int currentDepth, int targetDepth) {
        // Base case: empty node
        if (node == null) {
            return 0;
        }
        
        // If we've reached the target depth
        if (currentDepth == targetDepth) {
            // Check if this is a leaf node (no children)
            if (node.smaller == null && node.greater == null) {
                return 1; // Found a leaf at the target depth
            } else {
                return 0; // Not a leaf node
            }
        }
        
        // If we haven't reached the target depth yet, continue traversing
        // Add counts from both left and right subtrees
        return countLeavesAtDepthRecursive(node.smaller, currentDepth + 1, targetDepth) +
               countLeavesAtDepthRecursive(node.greater, currentDepth + 1, targetDepth);
    }
    
    // Count all leaf nodes in the tree
    public int countAllLeaves() {
        return countLeavesRecursive(root);
    }
    
    private int countLeavesRecursive(TreeElement node) {
        // Base case: empty node
        if (node == null) {
            return 0;
        }
        
        // If this is a leaf node
        if (node.smaller == null && node.greater == null) {
            return 1;
        }
        
        // Otherwise, count leaves in left and right subtrees
        return countLeavesRecursive(node.smaller) + countLeavesRecursive(node.greater);
    }
}
