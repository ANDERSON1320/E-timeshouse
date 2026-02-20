package com.etimeshouse.dto;

import java.math.BigDecimal;

public class DashboardStatsDto {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private long totalSales; // Number of items sold

    public DashboardStatsDto(BigDecimal totalRevenue, long totalOrders, long totalSales) {
        this.totalRevenue = totalRevenue;
        this.totalOrders = totalOrders;
        this.totalSales = totalSales;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(long totalSales) {
        this.totalSales = totalSales;
    }
}
