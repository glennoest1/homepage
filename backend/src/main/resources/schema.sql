CREATE TABLE entrances (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    target_url VARCHAR(512) NOT NULL,
    icon_type VARCHAR(50) DEFAULT 'home',
    priority INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
