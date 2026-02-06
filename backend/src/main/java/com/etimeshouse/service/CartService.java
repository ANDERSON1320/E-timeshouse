package com.etimeshouse.service;

import com.etimeshouse.dto.CartDto;
import com.etimeshouse.dto.CartItemDto;
import com.etimeshouse.entity.Cart;
import com.etimeshouse.entity.CartItem;
import com.etimeshouse.entity.User;
import com.etimeshouse.entity.Watch;
import com.etimeshouse.repository.CartItemRepository;
import com.etimeshouse.repository.CartRepository;
import com.etimeshouse.repository.UserRepository;
import com.etimeshouse.repository.WatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WatchRepository watchRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public CartDto getCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return mapToDto(cart);
    }

    @Transactional
    public CartDto addItemToCart(Long userId, Long watchId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);
        Watch watch = watchRepository.findById(watchId)
                .orElseThrow(() -> new RuntimeException("Montre non trouvée"));

        if (watch.getStockQuantity() < quantity) {
            throw new RuntimeException("Stock insuffisant");
        }

        CartItem existingItem = cartItemRepository.findByCartIdAndWatchId(cart.getId(), watchId).orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartItemRepository.save(existingItem);
        } else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setWatch(watch);
            item.setQuantity(quantity);
            cart.getItems().add(item);
        }

        cart = cartRepository.save(cart);
        return mapToDto(cart);
    }

    @Transactional
    public CartDto updateCartItemQuantity(Long userId, Long itemId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Article non trouvé"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Article n'appartient pas à votre panier");
        }

        if (quantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            if (item.getWatch().getStockQuantity() < quantity) {
                throw new RuntimeException("Stock insuffisant");
            }
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        cart = cartRepository.save(cart);
        return mapToDto(cart);
    }

    @Transactional
    public CartDto removeCartItem(Long userId, Long itemId) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Article non trouvé"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Article n'appartient pas à votre panier");
        }

        cart.getItems().remove(item);
        cartItemRepository.delete(item);
        cart = cartRepository.save(cart);
        return mapToDto(cart);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    private CartDto mapToDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());

        BigDecimal totalAmount = BigDecimal.ZERO;
        int totalItems = 0;
        List<CartItemDto> itemDtos = new ArrayList<>();

        if (cart.getItems() != null) {
            for (CartItem item : cart.getItems()) {
                Watch watch = item.getWatch();
                BigDecimal subtotal = watch.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                totalAmount = totalAmount.add(subtotal);
                totalItems += item.getQuantity();

                String imageUrl = (watch.getImages() != null && !watch.getImages().isEmpty())
                        ? watch.getImages().get(0).getImageUrl()
                        : null;

                itemDtos.add(new CartItemDto(
                        item.getId(),
                        watch.getId(),
                        watch.getName(),
                        watch.getBrand(),
                        watch.getPrice(),
                        imageUrl,
                        item.getQuantity(),
                        subtotal
                ));
            }
        }

        dto.setItems(itemDtos);
        dto.setTotalAmount(totalAmount);
        dto.setTotalItems(totalItems);
        return dto;
    }
}


