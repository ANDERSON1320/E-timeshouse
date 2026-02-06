package com.etimeshouse.service;

import com.etimeshouse.dto.UserDto;
import com.etimeshouse.entity.User;
import com.etimeshouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return mapToDto(user);
    }

    @Transactional
    public UserDto updateProfile(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (userDto.getFirstName() != null) {
            user.setFirstName(userDto.getFirstName());
        }
        if (userDto.getLastName() != null) {
            user.setLastName(userDto.getLastName());
        }
        if (userDto.getEmail() != null && !userDto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                throw new RuntimeException("L'email est déjà utilisé");
            }
            user.setEmail(userDto.getEmail());
        }

        user = userRepository.save(user);
        return mapToDto(user);
    }

    private UserDto mapToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().name(),
                user.getCreatedAt()
        );
    }
}


