package com.example.homepage.controller;

import com.example.homepage.entity.Entrance;
import com.example.homepage.service.EntranceService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/navigation")
public class NavigationController {

    private static final Logger log = LoggerFactory.getLogger(NavigationController.class);

    private final EntranceService entranceService;

    public NavigationController(EntranceService entranceService) {
        this.entranceService = entranceService;
    }

    @GetMapping("/active-links")
    public ResponseEntity<List<Entrance>> getActiveLinks() {
        return ResponseEntity.ok(entranceService.getActiveLinks());
    }

    @PostMapping("/click-log")
    public ResponseEntity<Void> logClick(@RequestParam Long entranceId) {
        log.info("User clicked on entrance ID: {}", entranceId);
        entranceService.logClick(entranceId);
        return ResponseEntity.ok().build();
    }
}
