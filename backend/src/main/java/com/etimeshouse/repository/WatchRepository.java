package com.etimeshouse.repository;

import com.etimeshouse.entity.Watch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface WatchRepository extends JpaRepository<Watch, Long> {
    
    Page<Watch> findByBrandContainingIgnoreCase(String brand, Pageable pageable);
    
    Page<Watch> findByCategoryId(Long categoryId, Pageable pageable);
    
    @Query("SELECT w FROM Watch w WHERE w.price BETWEEN :minPrice AND :maxPrice")
    Page<Watch> findByPriceBetween(@Param("minPrice") BigDecimal minPrice, 
                                    @Param("maxPrice") BigDecimal maxPrice, 
                                    Pageable pageable);
    
    @Query("SELECT w FROM Watch w WHERE w.stockQuantity > 0")
    Page<Watch> findAvailableWatches(Pageable pageable);
    
    @Query("SELECT w FROM Watch w WHERE " +
           "(:brand IS NULL OR LOWER(w.brand) LIKE LOWER(CONCAT('%', :brand, '%'))) AND " +
           "(:categoryId IS NULL OR w.category.id = :categoryId) AND " +
           "(:minPrice IS NULL OR w.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR w.price <= :maxPrice) AND " +
           "(:availableOnly IS NULL OR :availableOnly = false OR w.stockQuantity > 0)")
    Page<Watch> findWithFilters(@Param("brand") String brand,
                                @Param("categoryId") Long categoryId,
                                @Param("minPrice") BigDecimal minPrice,
                                @Param("maxPrice") BigDecimal maxPrice,
                                @Param("availableOnly") Boolean availableOnly,
                                Pageable pageable);
}


