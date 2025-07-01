package com.example.visualDSA.controller;

import com.example.visualDSA.service.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tree")
@CrossOrigin(origins = "*")
public class TreeController {

    @Autowired
    private TreeService treeService;

    @PostMapping("/insert")
    public void insert(@RequestParam String value) {
        treeService.insert(value);
    }

    @PostMapping("/insert-null")
    public void insertNull() {
        treeService.insertNull();
    }

    @DeleteMapping("/reset")
    public void reset() {
        treeService.reset();
    }

    @GetMapping("/all")
    public List<Map<String, String>> getAll() {
        return treeService.getAll();
    }

    @GetMapping("/bfs")
    public List<String> bfs() {
        return treeService.bfs();
    }

    @GetMapping("/inorder")
    public List<String> inorder() {
        return treeService.inorder();
    }

    @GetMapping("/preorder")
    public List<String> preorder() {
        return treeService.preorder();
    }

    @GetMapping("/postorder")
    public List<String> postorder() {
        return treeService.postorder();
    }
}
