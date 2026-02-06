package com.etimeshouse.controller;

import com.etimeshouse.dto.WatchDto;
import com.etimeshouse.service.WatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "http://localhost:4200")
public class HomeController {

    @Autowired
    private WatchService watchService;

    /**
     * Get new arrivals (latest products)
     */
    @GetMapping("/new-arrivals")
    public ResponseEntity<Page<WatchDto>> getNewArrivals() {
        Pageable pageable = PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "id"));
        Page<WatchDto> watches = watchService.getAllWatches(pageable, null, null, null, null, true);
        return ResponseEntity.ok(watches);
    }

    /**
     * Get best sellers (most popular products)
     * For now, returns random selection. Can be enhanced with actual sales data.
     */
    @GetMapping("/best-sellers")
    public ResponseEntity<Page<WatchDto>> getBestSellers() {
        Pageable pageable = PageRequest.of(0, 8);
        Page<WatchDto> watches = watchService.getAllWatches(pageable, null, null, null, null, true);
        return ResponseEntity.ok(watches);
    }

    /**
     * Get featured products
     */
    @GetMapping("/featured")
    public ResponseEntity<Page<WatchDto>> getFeaturedProducts() {
        Pageable pageable = PageRequest.of(0, 4);
        Page<WatchDto> watches = watchService.getAllWatches(pageable, null, null, null, null, true);
        return ResponseEntity.ok(watches);
    }

    /**
     * Get homepage summary data
     */
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getHomeSummary() {
        Map<String, Object> summary = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 1000);
        long totalProducts = watchService.getAllWatches(pageable, null, null, null, null, null).getTotalElements();
        summary.put("totalProducts", totalProducts);
        summary.put("newArrivals", 8);
        summary.put("bestSellers", 8);
        return ResponseEntity.ok(summary);
    }
}
