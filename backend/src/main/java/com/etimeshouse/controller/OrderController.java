package com.etimeshouse.controller;

import com.etimeshouse.dto.CreateOrderRequest;
import com.etimeshouse.dto.OrderDto;

import com.etimeshouse.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private com.etimeshouse.repository.UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Page<OrderDto>> getUserOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderDto> orders = orderService.getUserOrders(userId, pageable);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id, Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        OrderDto order = orderService.getOrderById(id, userId);
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CreateOrderRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        OrderDto order = orderService.createOrder(userId, request);
        return ResponseEntity.ok(order);
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"))
                .getId();
    }
}
