package com.etimeshouse.service;

import com.etimeshouse.dto.WatchDto;
import com.etimeshouse.dto.WatchImageDto;
import com.etimeshouse.entity.Watch;
import com.etimeshouse.entity.WatchImage;
import com.etimeshouse.repository.CategoryRepository;
import com.etimeshouse.repository.WatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
public class WatchService {

    @Autowired
    private WatchRepository watchRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private com.etimeshouse.repository.ProductVariantRepository productVariantRepository;

    public java.util.List<com.etimeshouse.dto.ProductVariantDto> getVariantsByWatchId(Long watchId) {
        return productVariantRepository.findByWatchId(watchId).stream()
                .map(variant -> new com.etimeshouse.dto.ProductVariantDto(
                        variant.getId(),
                        variant.getWatch().getId(),
                        variant.getSize(),
                        variant.getColor(),
                        variant.getStockQuantity(),
                        variant.getPriceAdjustment()))
                .collect(Collectors.toList());
    }

    public Page<WatchDto> getAllWatches(Pageable pageable, String brand, Long categoryId,
            BigDecimal minPrice, BigDecimal maxPrice, Boolean availableOnly) {
        Page<Watch> watches = watchRepository.findWithFilters(brand, categoryId, minPrice, maxPrice, availableOnly,
                pageable);
        return watches.map(this::mapToDto);
    }

    public WatchDto getWatchById(Long id) {
        Watch watch = watchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Montre non trouvée"));
        return mapToDto(watch);
    }

    @Transactional
    public WatchDto createWatch(WatchDto watchDto) {
        Watch watch = new Watch();
        watch.setName(watchDto.getName());
        watch.setDescription(watchDto.getDescription());
        watch.setBrand(watchDto.getBrand());
        watch.setModel(watchDto.getModel());
        watch.setPrice(watchDto.getPrice());
        watch.setStockQuantity(watchDto.getStockQuantity());

        if (watchDto.getCategoryId() != null) {
            watch.setCategory(categoryRepository.findById(watchDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée")));
        }

        watch = watchRepository.save(watch);

        // Ajouter les images
        if (watchDto.getImages() != null) {
            for (WatchImageDto imageDto : watchDto.getImages()) {
                WatchImage image = new WatchImage();
                image.setWatch(watch);
                image.setImageUrl(imageDto.getImageUrl());
                image.setIsPrimary(imageDto.getIsPrimary());
                image.setDisplayOrder(imageDto.getDisplayOrder());
                watch.getImages().add(image);
            }
        }

        watch = watchRepository.save(watch);
        return mapToDto(watch);
    }

    @Transactional
    public WatchDto updateWatch(Long id, WatchDto watchDto) {
        Watch watch = watchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Montre non trouvée"));

        if (watchDto.getName() != null)
            watch.setName(watchDto.getName());
        if (watchDto.getDescription() != null)
            watch.setDescription(watchDto.getDescription());
        if (watchDto.getBrand() != null)
            watch.setBrand(watchDto.getBrand());
        if (watchDto.getModel() != null)
            watch.setModel(watchDto.getModel());
        if (watchDto.getPrice() != null)
            watch.setPrice(watchDto.getPrice());
        if (watchDto.getStockQuantity() != null)
            watch.setStockQuantity(watchDto.getStockQuantity());

        if (watchDto.getCategoryId() != null) {
            watch.setCategory(categoryRepository.findById(watchDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée")));
        }

        watch = watchRepository.save(watch);
        return mapToDto(watch);
    }

    @Transactional
    public void deleteWatch(Long id) {
        if (!watchRepository.existsById(id)) {
            throw new RuntimeException("Montre non trouvée");
        }
        watchRepository.deleteById(id);
    }

    private WatchDto mapToDto(Watch watch) {
        WatchDto dto = new WatchDto();
        dto.setId(watch.getId());
        dto.setName(watch.getName());
        dto.setDescription(watch.getDescription());
        dto.setBrand(watch.getBrand());
        dto.setModel(watch.getModel());
        dto.setPrice(watch.getPrice());
        dto.setStockQuantity(watch.getStockQuantity());

        if (watch.getCategory() != null) {
            dto.setCategoryId(watch.getCategory().getId());
            dto.setCategoryName(watch.getCategory().getName());
        }

        if (watch.getImages() != null) {
            dto.setImages(watch.getImages().stream()
                    .map(img -> new WatchImageDto(img.getId(), img.getImageUrl(), img.getIsPrimary(),
                            img.getDisplayOrder()))
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}
