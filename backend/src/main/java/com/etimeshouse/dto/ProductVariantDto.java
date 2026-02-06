package com.etimeshouse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDto {
    private Long id;
    private Long watchId;
    private String size;
    private String color;
    private Integer stockQuantity;
    private BigDecimal priceAdjustment;
}
