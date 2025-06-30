package com.example.visualDSA.service;

import com.example.visualDSA.model.TreeNode;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TreeService {
    private TreeNode root;
    private final List<String> insertionOrder = new ArrayList<>();

    public void insert(String value) {
        insertionOrder.add(value);
        buildTree();
    }

    public void insertNull() {
        insertionOrder.add("null");
        buildTree();
    }

    public void reset() {
        root = null;
        insertionOrder.clear();
    }

    private void buildTree() {
        if (insertionOrder.isEmpty()) {
            root = null;
            return;
        }

        List<TreeNode> nodes = new ArrayList<>();
        for (String val : insertionOrder) {
            if (val.equals("null")) {
                nodes.add(null);
            } else {
                nodes.add(new TreeNode(val));
            }
        }

        for (int i = 0; i < nodes.size(); i++) {
            TreeNode node = nodes.get(i);
            if (node != null) {
                int leftIdx = 2 * i + 1;
                int rightIdx = 2 * i + 2;
                if (leftIdx < nodes.size()) {
                    node.setLeft(nodes.get(leftIdx));
                }
                if (rightIdx < nodes.size()) {
                    node.setRight(nodes.get(rightIdx));
                }
            }
        }

        root = nodes.get(0);
    }

    public List<Map<String, String>> getAll() {
        List<Map<String, String>> result = new ArrayList<>();
        for (String val : insertionOrder) {
            Map<String, String> node = new HashMap<>();
            node.put("value", val);
            result.add(node);
        }
        return result;
    }

    public List<String> bfs() {
        List<String> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                res.add("null");
                continue;
            }
            res.add(node.getValue());
            queue.offer(node.getLeft());
            queue.offer(node.getRight());
        }
        return res;
    }

    public List<String> inorder() {
        List<String> res = new ArrayList<>();
        inorderHelper(root, res);
        return res;
    }

    private void inorderHelper(TreeNode node, List<String> res) {
        if (node == null) return;
        inorderHelper(node.getLeft(), res);
        res.add(node.getValue());
        inorderHelper(node.getRight(), res);
    }

    public List<String> preorder() {
        List<String> res = new ArrayList<>();
        preorderHelper(root, res);
        return res;
    }

    private void preorderHelper(TreeNode node, List<String> res) {
        if (node == null) return;
        res.add(node.getValue());
        preorderHelper(node.getLeft(), res);
        preorderHelper(node.getRight(), res);
    }

    public List<String> postorder() {
        List<String> res = new ArrayList<>();
        postorderHelper(root, res);
        return res;
    }

    private void postorderHelper(TreeNode node, List<String> res) {
        if (node == null) return;
        postorderHelper(node.getLeft(), res);
        postorderHelper(node.getRight(), res);
        res.add(node.getValue());
    }
}
