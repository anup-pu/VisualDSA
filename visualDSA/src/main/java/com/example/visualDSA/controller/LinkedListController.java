package com.example.visualDSA.controller;

import com.example.visualDSA.service.LinkedListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> insertAt(@RequestParam int value, @RequestParam int index) {
        try {
            List<Integer> updatedList = linkedListService.insertAt(index, value);
            return ResponseEntity.ok(updatedList);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid index entered");
        }
    }

    // Delete node at given index
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAt(@RequestParam int index) {
        try {
            List<Integer> updatedList = linkedListService.deleteAt(index);
            return ResponseEntity.ok(updatedList);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid index entered");
        }
    }

    // Get entire list
    @GetMapping("/all")
    public List<Integer> getAll() {
        return linkedListService.getList();
    }
}
