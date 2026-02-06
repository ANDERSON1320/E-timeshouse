package com.etimeshouse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long id;
    private Long watchId;
    private String watchName;
    private String watchBrand;
    private BigDecimal watchPrice;
    private String watchImageUrl;
    private Integer quantity;
    private BigDecimal subtotal;
}


