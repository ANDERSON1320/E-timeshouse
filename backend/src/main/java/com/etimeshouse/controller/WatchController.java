package com.etimeshouse.controller;

import com.etimeshouse.dto.WatchDto;
import com.etimeshouse.service.WatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/watches")
@CrossOrigin(origins = "http://localhost:4200")
public class WatchController {

    @Autowired
    private WatchService watchService;

    @GetMapping
    public ResponseEntity<Page<WatchDto>> getAllWatches(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean availableOnly,
            @RequestParam(required = false) String sort) {

        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            switch (sort) {
                case "price_asc":
                    pageable = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("price").ascending());
                    break;
                case "price_desc":
                    pageable = PageRequest.of(page, size,
                            org.springframework.data.domain.Sort.by("price").descending());
                    break;
                case "newest":
                    pageable = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("id").descending());
                    break;
                default:
                    pageable = PageRequest.of(page, size);
            }
        } else {
            pageable = PageRequest.of(page, size);
        }

        Page<WatchDto> watches = watchService.getAllWatches(pageable, brand, categoryId, minPrice, maxPrice,
                availableOnly);
        return ResponseEntity.ok(watches);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WatchDto> getWatchById(@PathVariable Long id) {
        WatchDto watch = watchService.getWatchById(id);
        return ResponseEntity.ok(watch);
    }

    @GetMapping("/{id}/variants")
    public ResponseEntity<java.util.List<com.etimeshouse.dto.ProductVariantDto>> getWatchVariants(
            @PathVariable Long id) {
        return ResponseEntity.ok(watchService.getVariantsByWatchId(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WatchDto> createWatch(@RequestBody WatchDto watchDto) {
        WatchDto created = watchService.createWatch(watchDto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WatchDto> updateWatch(@PathVariable Long id, @RequestBody WatchDto watchDto) {
        WatchDto updated = watchService.updateWatch(id, watchDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteWatch(@PathVariable Long id) {
        watchService.deleteWatch(id);
        return ResponseEntity.noContent().build();
    }
}
