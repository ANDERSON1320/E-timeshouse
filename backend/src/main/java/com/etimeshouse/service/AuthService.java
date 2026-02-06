package com.etimeshouse.service;

import com.etimeshouse.dto.AuthResponse;
import com.etimeshouse.dto.LoginRequest;
import com.etimeshouse.dto.RegisterRequest;
import com.etimeshouse.entity.User;
import com.etimeshouse.repository.UserRepository;
import com.etimeshouse.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Le nom d'utilisateur est déjà utilisé");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("L'email est déjà utilisé");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        // Déterminer le rôle de l'utilisateur
        long userCount = userRepository.count();

        if (userCount == 0) {
            // Premier utilisateur = ADMIN automatiquement
            user.setRole(User.Role.ADMIN);
        } else if (request.getAdminCode() != null && !request.getAdminCode().trim().isEmpty()) {
            // Vérifier le code admin
            String validAdminCode = "ETIMESHOUSE_ADMIN_2024";
            if (validAdminCode.equals(request.getAdminCode().trim())) {
                user.setRole(User.Role.ADMIN);
            } else {
                throw new RuntimeException("Code administrateur invalide");
            }
        } else {
            // Utilisateur normal
            user.setRole(User.Role.USER);
        }

        user.setEnabled(true);

        user = userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails, user.getRole().name());

        return new AuthResponse(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(),
                user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        String token = jwtUtil.generateToken(userDetails, user.getRole().name());

        return new AuthResponse(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(),
                user.getRole().name());
    }
}
