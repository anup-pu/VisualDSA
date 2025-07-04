package com.example.visualDSA.service;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class LinkedListService {
    private final LinkedList<Integer> list = new LinkedList<>();

    // Insert at a specific index
    public List<Integer> insertAt(int index, int value) {
        if (index < 0 || index > list.size()) {
            throw new IllegalArgumentException("Invalid index"); // Ignore if invalid
        }
        list.add(index, value);
        return getList();
    }

    // Delete node at a specific index
    public List<Integer> deleteAt(int index) {
        if (index < 0 || index >= list.size()) {
            throw new IllegalArgumentException("Invalid index");
        }
        list.remove(index);
        return getList();
    }

    // Get the current state of the list
    public List<Integer> getList() {
        return new LinkedList<>(list);
    }
}
