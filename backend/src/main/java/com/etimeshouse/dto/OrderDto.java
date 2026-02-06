package com.etimeshouse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private String orderNumber;
    private BigDecimal totalAmount;
    private String status;
    private String shippingAddress;
    private String shippingCity;
    private String shippingPostalCode;
    private String shippingCountry;
    private LocalDateTime createdAt;
    private List<OrderItemDto> items;
}

