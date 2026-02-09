-- Coffee Pass Database Schema
-- PostgreSQL with PostGIS extension for geolocation

-- Enable PostGIS for location-based queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    
    -- Stats
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    
    -- Counters
    total_checkins INTEGER DEFAULT 0,
    unique_shops_visited INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    trails_completed INTEGER DEFAULT 0,
    rewards_earned INTEGER DEFAULT 0,
    
    -- Preferences
    favorite_shops UUID[] DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_checkin_at TIMESTAMP WITH TIME ZONE
);

-- Coffee Shops table
CREATE TABLE coffee_shops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic info
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    neighborhood VARCHAR(100),
    
    -- Contact
    phone VARCHAR(50),
    website_url TEXT,
    instagram_handle VARCHAR(100),
    
    -- Location (PostGIS)
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    
    -- Ratings
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    internal_score INTEGER CHECK (internal_score >= 0 AND internal_score <= 100),
    
    -- Media
    image_url TEXT,
    gallery_urls TEXT[],
    
    -- Operating hours (JSON for flexibility)
    hours JSONB,
    
    -- Features
    amenities VARCHAR(50)[],
    tags VARCHAR(50)[],
    equipment JSONB,
    vibe VARCHAR(50)[],
    
    -- Pricing
    price_level INTEGER CHECK (price_level >= 1 AND price_level <= 4),
    
    -- External integrations
    google_place_id VARCHAR(100),
    external_provider VARCHAR(50),
    external_shop_id VARCHAR(100),
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    -- Stats
    total_checkins INTEGER DEFAULT 0,
    total_visitors INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for location-based queries
CREATE INDEX idx_shops_location ON coffee_shops USING GIST(location);
CREATE INDEX idx_shops_city ON coffee_shops(city);
CREATE INDEX idx_shops_neighborhood ON coffee_shops(neighborhood);
CREATE INDEX idx_shops_tags ON coffee_shops USING GIN(tags);

-- Check-ins table
CREATE TABLE checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shop_id UUID NOT NULL REFERENCES coffee_shops(id) ON DELETE CASCADE,
    
    -- Check-in data
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    note TEXT,
    photo_url TEXT,
    
    -- Location verification
    user_latitude DECIMAL(10, 8),
    user_longitude DECIMAL(11, 8),
    distance_meters INTEGER,
    
    -- For streak calculation
    checkin_date DATE NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_checkins_user ON checkins(user_id);
CREATE INDEX idx_checkins_shop ON checkins(shop_id);
CREATE INDEX idx_checkins_date ON checkins(checkin_date);

-- Trails table
CREATE TABLE trails (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    
    -- Difficulty
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    estimated_time INTEGER, -- minutes
    distance_miles DECIMAL(5, 2),
    
    -- Shop sequence
    shop_ids UUID[] NOT NULL,
    
    -- Rewards
    rewards JSONB,
    
    -- Categorization
    tags VARCHAR(50)[],
    
    -- Status
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trail progress table
CREATE TABLE trail_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trail_id UUID NOT NULL REFERENCES trails(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    visited_shop_ids UUID[] DEFAULT '{}',
    is_completed BOOLEAN DEFAULT false,
    
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(trail_id, user_id)
);

CREATE INDEX idx_trail_progress_user ON trail_progress(user_id);
CREATE INDEX idx_trail_progress_trail ON trail_progress(trail_id);

-- Rewards table
CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) CHECK (type IN ('discount', 'free_coffee', 'merchandise', 'points', 'badge')),
    value INTEGER,
    
    -- Cost to redeem
    points_cost INTEGER DEFAULT 0,
    
    -- Shop-specific or global
    shop_id UUID REFERENCES coffee_shops(id),
    
    -- Media
    image_url TEXT,
    icon VARCHAR(50),
    
    -- Availability
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    quantity_available INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User rewards (earned/redeemed)
CREATE TABLE user_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    redeemed_at TIMESTAMP WITH TIME ZONE,
    is_redeemed BOOLEAN DEFAULT false,
    
    -- For code-based rewards
    redemption_code VARCHAR(100),
    
    UNIQUE(reward_id, user_id)
);

-- Achievements table
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    
    requirement INTEGER NOT NULL,
    requirement_type VARCHAR(50) CHECK (requirement_type IN ('checkins', 'shops', 'streak', 'trails', 'points')),
    
    tier VARCHAR(20) CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
    
    points_reward INTEGER DEFAULT 0,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(achievement_id, user_id)
);

-- Social feed/posts
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    type VARCHAR(50) CHECK (type IN ('checkin', 'trail_complete', 'reward', 'review')),
    content TEXT,
    image_url TEXT,
    
    -- Related entities
    shop_id UUID REFERENCES coffee_shops(id),
    trail_id UUID REFERENCES trails(id),
    reward_id UUID REFERENCES rewards(id),
    
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    
    -- Engagement
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_shop ON posts(shop_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

-- Post likes
CREATE TABLE post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(post_id, user_id)
);

-- Post comments
CREATE TABLE post_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User follows (for social features)
CREATE TABLE user_follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

CREATE INDEX idx_user_follows_follower ON user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON user_follows(following_id);

-- Push notification tokens
CREATE TABLE push_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    platform VARCHAR(20) CHECK (platform IN ('ios', 'android')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity log (for analytics)
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    activity_type VARCHAR(100) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_log_user ON activity_log(user_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coffee_shops_updated_at BEFORE UPDATE ON coffee_shops
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trails_updated_at BEFORE UPDATE ON trails
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed data: Achievements
INSERT INTO achievements (name, description, icon, requirement, requirement_type, tier, points_reward) VALUES
    ('First Sip', 'Check in to your first coffee shop', 'coffee', 1, 'checkins', 'bronze', 10),
    ('Coffee Explorer', 'Visit 10 different coffee shops', 'compass', 10, 'shops', 'silver', 50),
    ('Coffee Connoisseur', 'Visit 25 different coffee shops', 'star', 25, 'shops', 'gold', 150),
    ('Week Warrior', 'Maintain a 7-day check-in streak', 'flame', 7, 'streak', 'silver', 100),
    ('Month Master', 'Maintain a 30-day check-in streak', 'crown', 30, 'streak', 'gold', 500),
    ('Trail Blazer', 'Complete your first trail', 'map', 1, 'trails', 'bronze', 25),
    ('Trail Master', 'Complete 10 trails', 'trophy', 10, 'trails', 'gold', 200),
    ('Point Collector', 'Earn 1,000 points', 'coins', 1000, 'points', 'silver', 0),
    ('Coffee Addict', 'Check in 50 times', 'zap', 50, 'checkins', 'gold', 200);
