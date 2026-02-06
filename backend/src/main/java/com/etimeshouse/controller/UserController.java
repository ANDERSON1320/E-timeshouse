package com.etimeshouse.controller;

import com.etimeshouse.dto.UserDto;
import com.etimeshouse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private com.etimeshouse.repository.UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        UserDto profile = userService.getProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(@RequestBody UserDto userDto, Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        UserDto updated = userService.updateProfile(userId, userDto);
        return ResponseEntity.ok(updated);
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"))
                .getId();
    }
}


