package com.etimeshouse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:4200")
public class FileController {

    private final Path fileStorageLocation;

    public FileController() {
        this.fileStorageLocation = Paths.get("uploads/images/watches").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        // Normalize file name
        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String fileExtension = "";

        int i = originalFileName.lastIndexOf('.');
        if (i > 0) {
            fileExtension = originalFileName.substring(i);
        }

        // Generate new filename to avoid conflicts
        String fileName = UUID.randomUUID().toString() + fileExtension;

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Mock URL - In production this would be a real URL/CDN
            // Since we serve static files from /images/watches/**
            // But for local dev with spring boot serving static content from classpath, we
            // need to restart usually.
            // However, if we save to target/classes it might work or we need a special
            // configuration.
            // For now, let's assume standard static serving.

            // NOTE: Saving to src/main/resources only works for dev. In prod, use external
            // storage.

            String fileDownloadUri = "/images/watches/" + fileName;

            Map<String, String> response = new HashMap<>();
            response.put("fileName", fileName);
            response.put("fileDownloadUri", fileDownloadUri);

            return ResponseEntity.ok(response);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
}
