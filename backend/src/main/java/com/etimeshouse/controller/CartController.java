package com.etimeshouse.controller;

import com.etimeshouse.dto.CartDto;
import com.etimeshouse.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private com.etimeshouse.repository.UserRepository userRepository;

    @GetMapping
    public ResponseEntity<CartDto> getCart(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        CartDto cart = cartService.getCart(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/items")
    public ResponseEntity<CartDto> addItemToCart(
            @RequestParam Long watchId,
            @RequestParam(defaultValue = "1") Integer quantity,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        CartDto cart = cartService.addItemToCart(userId, watchId, quantity);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartDto> updateCartItemQuantity(
            @PathVariable Long itemId,
            @RequestParam Integer quantity,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        CartDto cart = cartService.updateCartItemQuantity(userId, itemId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartDto> removeCartItem(
            @PathVariable Long itemId,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        CartDto cart = cartService.removeCartItem(userId, itemId);
        return ResponseEntity.ok(cart);
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"))
                .getId();
    }
}


