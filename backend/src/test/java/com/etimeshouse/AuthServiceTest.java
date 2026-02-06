package com.etimeshouse;

import com.etimeshouse.dto.RegisterRequest;
import com.etimeshouse.entity.User;
import com.etimeshouse.repository.UserRepository;
import com.etimeshouse.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testRegister() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testuser");
        request.setEmail("test@example.com");
        request.setPassword("password123");
        request.setFirstName("Test");
        request.setLastName("User");

        var response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("testuser", response.getUsername());

        User user = userRepository.findByUsername("testuser").orElse(null);
        assertNotNull(user);
        assertEquals("test@example.com", user.getEmail());
    }
}


