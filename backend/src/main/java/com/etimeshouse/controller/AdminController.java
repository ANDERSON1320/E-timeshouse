package com.etimeshouse.controller;

import com.etimeshouse.dto.OrderDto;
import com.etimeshouse.dto.UserDto;
import com.etimeshouse.entity.User;
import com.etimeshouse.repository.UserRepository;
import com.etimeshouse.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderService orderService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> dtos = users.stream()
                .map(user -> new UserDto(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getRole().name(),
                        user.getCreatedAt()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/orders")
    public ResponseEntity<Page<OrderDto>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderDto> orders = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<OrderDto> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        com.etimeshouse.entity.Order.OrderStatus orderStatus = com.etimeshouse.entity.Order.OrderStatus.valueOf(status);
        OrderDto order = orderService.updateOrderStatus(id, orderStatus);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/stats")
    public ResponseEntity<com.etimeshouse.dto.DashboardStatsDto> getDashboardStats() {
        return ResponseEntity.ok(orderService.getDashboardStats());
    }
}
