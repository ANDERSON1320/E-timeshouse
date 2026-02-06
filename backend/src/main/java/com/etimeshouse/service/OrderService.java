package com.etimeshouse.service;

import com.etimeshouse.dto.CartDto;
import com.etimeshouse.dto.CreateOrderRequest;
import com.etimeshouse.dto.OrderDto;
import com.etimeshouse.dto.OrderItemDto;
import com.etimeshouse.entity.*;
import com.etimeshouse.repository.OrderRepository;
import com.etimeshouse.repository.UserRepository;
import com.etimeshouse.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private com.etimeshouse.repository.CartRepository cartRepository;

    public Page<OrderDto> getUserOrders(Long userId, Pageable pageable) {
        Page<Order> orders = orderRepository.findByUserId(userId, pageable);
        return orders.map(this::mapToDto);
    }

    public OrderDto getOrderById(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée"));

        if (!order.getUser().getId().equals(userId) && !isAdmin(userId)) {
            throw new RuntimeException("Accès non autorisé");
        }

        return mapToDto(order);
    }

    @Transactional
    public OrderDto createOrder(Long userId, CreateOrderRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        CartDto cartDto = cartService.getCart(userId);
        if (cartDto.getItems() == null || cartDto.getItems().isEmpty()) {
            throw new RuntimeException("Le panier est vide");
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber(generateOrderNumber());
        order.setTotalAmount(cartDto.getTotalAmount());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setShippingAddress(request.getShippingAddress());
        order.setShippingCity(request.getShippingCity());
        order.setShippingPostalCode(request.getShippingPostalCode());
        order.setShippingCountry(request.getShippingCountry());

        // Créer les order items et vérifier le stock
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        for (CartItem cartItem : cart.getItems()) {
            Watch watch = cartItem.getWatch();
            if (watch.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Stock insuffisant pour: " + watch.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setWatch(watch);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(watch.getPrice());
            orderItem.setSubtotal(watch.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            order.getItems().add(orderItem);

            // Réduire le stock
            watch.setStockQuantity(watch.getStockQuantity() - cartItem.getQuantity());
        }

        order = orderRepository.save(order);

        // Vider le panier
        cartService.clearCart(userId);

        return mapToDto(order);
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée"));
        order.setStatus(status);
        order = orderRepository.save(order);
        return mapToDto(order);
    }

    public Page<OrderDto> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        return orders.map(this::mapToDto);
    }

    private String generateOrderNumber() {
        return "ORD-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))
                + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    private boolean isAdmin(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null && user.getRole() == User.Role.ADMIN;
    }

    private OrderDto mapToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus().name());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setShippingCity(order.getShippingCity());
        dto.setShippingPostalCode(order.getShippingPostalCode());
        dto.setShippingCountry(order.getShippingCountry());
        dto.setCreatedAt(order.getCreatedAt());

        if (order.getItems() != null) {
            dto.setItems(order.getItems().stream()
                    .map(item -> new OrderItemDto(
                            item.getId(),
                            item.getWatch().getId(),
                            item.getWatch().getName(),
                            item.getWatch().getBrand(),
                            item.getQuantity(),
                            item.getUnitPrice(),
                            item.getSubtotal()
                    ))
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}


