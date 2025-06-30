package com.example.visualDSA.controller;

import com.example.visualDSA.service.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/queue")
@CrossOrigin
public class QueueController {

    @Autowired
    private QueueService queueService;

    @PostMapping("/enqueue")
    public List<Integer> enqueue(@RequestParam int value) {
        return queueService.enqueue(value);
    }

    @DeleteMapping("/dequeue")
    public List<Integer> dequeue() {
        return queueService.dequeue();
    }

    @GetMapping("/all")
    public List<Integer> getQueue() {
        return queueService.getQueue();
    }
}
