package com.example.visualDSA.controller;

import com.example.visualDSA.service.LinkedListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/linkedlist")
@CrossOrigin(origins = "*")
public class LinkedListController {

    @Autowired
    private LinkedListService linkedListService;

    // Insert value at given index
    @PostMapping("/insert")
    public List<Integer> insertAt(@RequestParam int value, @RequestParam int index) {
        return linkedListService.insertAt(index, value);
    }

    // Delete node at given index
    @DeleteMapping("/delete")
    public List<Integer> deleteAt(@RequestParam int index) {
        return linkedListService.deleteAt(index);
    }

    // Get entire list
    @GetMapping("/all")
    public List<Integer> getAll() {
        return linkedListService.getList();
    }
}
