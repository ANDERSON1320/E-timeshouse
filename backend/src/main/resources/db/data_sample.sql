-- ============================================
-- E-TimesHouse - Données d'exemple
-- ============================================

-- ============================================
-- Utilisateurs
-- ============================================
-- IMPORTANT: Identifiants de connexion
-- 
-- ADMIN:
--   Username: admin
--   Password: admin123
--   Email: admin@etimeshouse.com
--
-- UTILISATEURS DE TEST:
--   Username: johndoe / Password: user123
--   Username: janedoe / Password: user123
--
-- CODE ADMIN POUR INSCRIPTION:
--   Si vous voulez créer un nouveau compte admin via l'inscription,
--   utilisez le code: ETIMESHOUSE_ADMIN_2024
--
-- NOTE: Le premier utilisateur qui s'inscrit devient automatiquement admin
-- ============================================

INSERT INTO users (username, email, password, first_name, last_name, role, enabled) VALUES
('admin', 'admin@etimeshouse.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwK8p6s2', 'Admin', 'User', 'ADMIN', TRUE),
('johndoe', 'user@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwK8p6s2', 'John', 'Doe', 'USER', TRUE),
('janedoe', 'jane@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwK8p6s2', 'Jane', 'Doe', 'USER', TRUE);

-- ============================================
-- Catégories
-- ============================================
INSERT INTO categories (name, description) VALUES
('Homme', 'Montres pour homme'),
('Femme', 'Montres pour femme'),
('Luxe', 'Montres de luxe haut de gamme'),
('Sport', 'Montres sportives et robustes'),
('Classique', 'Montres classiques et élégantes'),
('Connectée', 'Montres intelligentes et connectées'),
('Plongée', 'Montres étanches pour la plongée'),
('Chronographe', 'Montres avec fonction chronographe');

-- ============================================
-- Montres
-- ============================================
INSERT INTO watches (name, description, brand, model, price, stock_quantity, category_id) VALUES
('Rolex Submariner', 'Icône intemporelle de la plongée, la Submariner est une montre robuste et élégante. Boîtier en acier inoxydable, lunette rotative unidirectionnelle, étanchéité jusqu''à 300 mètres.', 'Rolex', 'Submariner', 5567500.00, 5, 1),
('Omega Speedmaster', 'La Speedmaster est la montre qui a accompagné les astronautes sur la Lune. Chronographe mécanique légendaire avec mouvement automatique.', 'Omega', 'Speedmaster Professional', 4061000.00, 8, 2),
('Tag Heuer Carrera', 'Montre chronographe sportive inspirée des courses automobiles. Design moderne et performance exceptionnelle.', 'Tag Heuer', 'Carrera', 2096000.00, 12, 6),
('Seiko Prospex', 'Montre de plongée professionnelle avec étanchéité 200m. Lunette rotative et cadran lumineux pour une lisibilité optimale.', 'Seiko', 'Prospex SRP777', 294750.00, 20, 5),
('Apple Watch Series 9', 'Montre connectée dernière génération avec écran Retina toujours allumé, GPS, suivi de la santé et notifications intelligentes.', 'Apple', 'Watch Series 9', 280995.00, 30, 4),
('Tissot Le Locle', 'Montre classique suisse avec mouvement automatique. Cadran guilloché et boîtier en acier inoxydable, élégance intemporelle.', 'Tissot', 'Le Locle', 425750.00, 15, 3),
('Breitling Navitimer', 'Chronographe aéronautique avec règle à calcul circulaire. Emblème de l''aviation, précision suisse.', 'Breitling', 'Navitimer B01', 5829500.00, 3, 1),
('Casio G-Shock', 'Montre robuste et résistante aux chocs. Parfaite pour les activités extrêmes, étanchéité 200m.', 'Casio', 'G-Shock GA-2100', 64845.00, 50, 2),
('Longines Master Collection', 'Montre classique avec complications. Mouvement automatique, calendrier complet, élégance raffinée.', 'Longines', 'Master Collection', 1211750.00, 10, 3),
('Samsung Galaxy Watch 6', 'Montre connectée Android avec écran AMOLED, suivi de la santé avancé, autonomie prolongée.', 'Samsung', 'Galaxy Watch 6', 195845.00, 25, 4);

-- ============================================
-- Images des montres
-- ============================================
-- Note: Utilisation des images locales dans assets/images/PHOTOS MONTRES

-- Rolex Submariner
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(1, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0047.jpg', TRUE, 1),
(1, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0048.jpg', FALSE, 2);

-- Omega Speedmaster
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(2, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0049.jpg', TRUE, 1),
(2, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0050.jpg', FALSE, 2);

-- Tag Heuer Carrera
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(3, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0051.jpg', TRUE, 1);

-- Seiko Prospex
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(4, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0052.jpg', TRUE, 1);

-- Apple Watch Series 9
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(5, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0053.jpg', TRUE, 1),
(5, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0054.jpg', FALSE, 2);

-- Tissot Le Locle
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(6, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0055.jpg', TRUE, 1);

-- Breitling Navitimer
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(7, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0056.jpg', TRUE, 1),
(7, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0057.jpg', FALSE, 2);

-- Casio G-Shock
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(8, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0058.jpg', TRUE, 1);

-- Longines Master Collection
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(9, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0059.jpg', TRUE, 1);

-- Samsung Galaxy Watch 6
INSERT INTO watch_images (watch_id, image_url, is_primary, display_order) VALUES
(10, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0060.jpg', TRUE, 1),
(10, 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0061.jpg', FALSE, 2);

-- ============================================
-- Paniers (exemple)
-- ============================================
-- Créer un panier pour l'utilisateur johndoe
INSERT INTO carts (user_id) VALUES (2);

-- Ajouter des articles au panier
INSERT INTO cart_items (cart_id, watch_id, quantity) VALUES
(1, 1, 1),
(1, 3, 2);

-- ============================================
-- Commandes d'exemple
-- ============================================
INSERT INTO orders (user_id, order_number, total_amount, status, shipping_address, shipping_city, shipping_postal_code, shipping_country) VALUES
(2, 'ORD-2024-001', 9759500.00, 'SHIPPED', '123 Main Street', 'Paris', '75001', 'France'),
(3, 'ORD-2024-002', 425750.00, 'PROCESSING', '456 Oak Avenue', 'Lyon', '69001', 'France');

-- Articles de commande
INSERT INTO order_items (order_id, watch_id, quantity, unit_price, subtotal) VALUES
(1, 1, 1, 5567500.00, 5567500.00),
(1, 3, 2, 2096000.00, 4192000.00),
(2, 6, 1, 425750.00, 425750.00);

-- ============================================
-- Fin des données d'exemple
-- ============================================


