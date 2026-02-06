package com.etimeshouse.controller;

import com.etimeshouse.dto.CategoryDto;
import com.etimeshouse.entity.Category;
import com.etimeshouse.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> dtos = categories.stream()
                .map(cat -> new CategoryDto(cat.getId(), cat.getName(), cat.getDescription()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}


