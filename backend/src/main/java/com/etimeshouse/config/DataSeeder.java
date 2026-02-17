package com.etimeshouse.config;

import com.etimeshouse.entity.User;
import com.etimeshouse.entity.Watch;
import com.etimeshouse.entity.WatchImage;
import com.etimeshouse.repository.UserRepository;
import com.etimeshouse.repository.WatchRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final WatchRepository watchRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, WatchRepository watchRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.watchRepository = watchRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedWatches();
    }

    private void seedUsers() {
        if (userRepository.findByEmail("admin@test.com").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@test.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
            System.out.println("✅ Admin user created: admin@test.com / admin123");
        }

        if (userRepository.findByEmail("user@test.com").isEmpty()) {
            User user = new User();
            user.setUsername("user");
            user.setFirstName("John");
            user.setLastName("Doe");
            user.setEmail("user@test.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole(User.Role.USER);
            user.setEnabled(true);
            userRepository.save(user);
            System.out.println("✅ Standard user created: user@test.com / user123");
        }
    }

    private void seedWatches() {
        if (watchRepository.count() == 0) {
            createWatch("Cosmograph Daytona", "ROLEX", new BigDecimal("15000000"),
                    "L'icône des chronographes de sport.", 5,
                    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop");

            createWatch("Royal Oak", "AUDEMARS PIGUET", new BigDecimal("22000000"),
                    "Un design révolutionnaire en acier.", 3,
                    "https://images.unsplash.com/photo-1619134778706-c89b25c345b5?q=80&w=600&auto=format&fit=crop");

            createWatch("Nautilus", "PATEK PHILIPPE", new BigDecimal("35000000"),
                    "L'élégance sportive par excellence.", 1,
                    "https://images.unsplash.com/photo-1623998021446-45cd96e35f5a?q=80&w=600&auto=format&fit=crop");

            System.out.println("✅ Sample watches created.");
        }
    }

    private void createWatch(String name, String brand, BigDecimal price, String description, Integer stock,
            String imageUrl) {
        Watch watch = new Watch();
        watch.setName(name);
        watch.setBrand(brand);
        watch.setPrice(price);
        watch.setDescription(description);
        watch.setStockQuantity(stock); // Correct field name

        // Create and add image
        WatchImage image = new WatchImage();
        image.setImageUrl(imageUrl);
        image.setIsPrimary(true);
        image.setWatch(watch);

        watch.getImages().add(image);

        watchRepository.save(watch);
    }
}
