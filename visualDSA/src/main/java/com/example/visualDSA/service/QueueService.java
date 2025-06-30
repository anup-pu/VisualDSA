package com.example.visualDSA.service;

import org.springframework.stereotype.Service;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

@Service
public class QueueService {
    private final Deque<Integer> queue = new LinkedList<>();
    private final int MAX_SIZE = 5;

    public List<Integer> enqueue(int value) {
        if (queue.size() >= MAX_SIZE) {
            // Don't add if full
            return getQueue();
        }
        queue.addFirst(value); // insert at FRONT
        return getQueue();
    }

    public List<Integer> dequeue() {
        if (!queue.isEmpty()) {
            queue.removeLast(); // remove from REAR
        }
        return getQueue();
    }

    public List<Integer> getQueue() {
        return new LinkedList<>(queue); // return current queue
    }
}
