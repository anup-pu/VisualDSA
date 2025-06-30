package com.example.visualDSA.service;

import org.springframework.stereotype.Service;
import java.util.LinkedList;
import java.util.List;

@Service
public class StackService {
    private final LinkedList<Integer> stack = new LinkedList<>();

    public List<Integer> push(int value) {
        stack.push(value);
        return getStack();
    }

    public List<Integer> pop() {
        if (!stack.isEmpty()) {
            stack.pop();
        }
        return getStack();
    }

    public List<Integer> getStack() {
        return new LinkedList<>(stack);
    }
}
