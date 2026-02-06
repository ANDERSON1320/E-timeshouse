package com.etimeshouse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "watch_id", nullable = false)
    @JsonIgnore
    private Watch watch;

    @Column(length = 50)
    private String size;

    @Column(length = 50)
    private String color;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;

    @Column(name = "price_adjustment", precision = 10, scale = 2)
    private BigDecimal priceAdjustment = BigDecimal.ZERO;
}
