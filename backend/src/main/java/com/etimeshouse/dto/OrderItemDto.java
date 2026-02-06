package com.etimeshouse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    private Long id;
    private Long watchId;
    private String watchName;
    private String watchBrand;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
}

