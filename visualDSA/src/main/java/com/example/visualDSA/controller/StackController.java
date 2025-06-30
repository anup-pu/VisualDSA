package com.example.visualDSA.controller;

import com.example.visualDSA.service.StackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stack")
@CrossOrigin
public class StackController {

    @Autowired
    private StackService stackService;

    @PostMapping("/push")
    public List<Integer> push(@RequestParam int value) {
        return stackService.push(value);
    }

    @DeleteMapping("/pop")
    public List<Integer> pop() {
        return stackService.pop();
    }

    @GetMapping("/all")
    public List<Integer> getStack() {
        return stackService.getStack();
    }
}

