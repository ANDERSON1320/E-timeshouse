package com.etimeshouse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchDto {
    private Long id;
    private String name;
    private String description;
    private String brand;
    private String model;
    private BigDecimal price;
    private Integer stockQuantity;
    private Long categoryId;
    private String categoryName;
    private List<WatchImageDto> images;
}


