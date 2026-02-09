import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  integer, 
  decimal, 
  boolean, 
  timestamp, 
  jsonb,
  geometry,
  index,
  unique,
  check,
  primaryKey,
  pgEnum
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);
export const rewardTypeEnum = pgEnum('reward_type', ['discount', 'free_coffee', 'merchandise', 'points', 'badge']);
export const requirementTypeEnum = pgEnum('requirement_type', ['checkins', 'shops', 'streak', 'trails', 'points']);
export const tierEnum = pgEnum('tier', ['bronze', 'silver', 'gold', 'platinum']);
export const postTypeEnum = pgEnum('post_type', ['checkin', 'trail_complete', 'reward', 'review']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  
  // Stats
  level: integer('level').default(1),
  xp: integer('xp').default(0),
  points: integer('points').default(0),
  
  // Counters
  totalCheckins: integer('total_checkins').default(0),
  uniqueShopsVisited: integer('unique_shops_visited').default(0),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  trailsCompleted: integer('trails_completed').default(0),
  rewardsEarned: integer('rewards_earned').default(0),
  
  // Preferences
  favoriteShops: uuid('favorite_shops').array().default([]),
  
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  lastCheckinAt: timestamp('last_checkin_at', { withTimezone: true }),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  usernameIdx: index('users_username_idx').on(table.username),
}));

// Coffee Shops table
export const coffeeShops = pgTable('coffee_shops', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Basic info
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 50 }).notNull(),
  zip: varchar('zip', { length: 20 }).notNull(),
  neighborhood: varchar('neighborhood', { length: 100 }),
  
  // Contact
  phone: varchar('phone', { length: 50 }),
  websiteUrl: text('website_url'),
  instagramHandle: varchar('instagram_handle', { length: 100 }),
  
  // Location
  location: geometry('location', { type: 'point', mode: 'xy', srid: 4326 }),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  
  // Ratings
  rating: decimal('rating', { precision: 3, scale: 2 }),
  reviewCount: integer('review_count').default(0),
  internalScore: integer('internal_score'),
  
  // Media
  imageUrl: text('image_url'),
  galleryUrls: text('gallery_urls').array(),
  
  // Operating hours & features
  hours: jsonb('hours'),
  amenities: varchar('amenities', { length: 50 }).array(),
  tags: varchar('tags', { length: 50 }).array(),
  equipment: jsonb('equipment'),
  vibe: varchar('vibe', { length: 50 }).array(),
  
  // Pricing
  priceLevel: integer('price_level'),
  
  // External integrations
  googlePlaceId: varchar('google_place_id', { length: 100 }),
  externalProvider: varchar('external_provider', { length: 50 }),
  externalShopId: varchar('external_shop_id', { length: 100 }),
  
  // Status
  isActive: boolean('is_active').default(true),
  isVerified: boolean('is_verified').default(false),
  
  // Stats
  totalCheckins: integer('total_checkins').default(0),
  totalVisitors: integer('total_visitors').default(0),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  locationIdx: index('shops_location_idx').using('gist', table.location),
  cityIdx: index('shops_city_idx').on(table.city),
  neighborhoodIdx: index('shops_neighborhood_idx').on(table.neighborhood),
  tagsIdx: index('shops_tags_idx').on(table.tags),
  googlePlaceIdIdx: index('shops_google_place_id_idx').on(table.googlePlaceId),
}));

// Check-ins table
export const checkins = pgTable('checkins', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  shopId: uuid('shop_id').notNull().references(() => coffeeShops.id, { onDelete: 'cascade' }),
  
  // Check-in data
  rating: integer('rating'),
  note: text('note'),
  photoUrl: text('photo_url'),
  
  // Location verification
  userLatitude: decimal('user_latitude', { precision: 10, scale: 8 }),
  userLongitude: decimal('user_longitude', { precision: 11, scale: 8 }),
  distanceMeters: integer('distance_meters'),
  
  // For streak calculation
  checkinDate: timestamp('checkin_date', { withTimezone: true }).notNull(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  userIdx: index('checkins_user_idx').on(table.userId),
  shopIdx: index('checkins_shop_idx').on(table.shopId),
  dateIdx: index('checkins_date_idx').on(table.checkinDate),
}));

// Trails table
export const trails = pgTable('trails', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  
  difficulty: difficultyEnum('difficulty'),
  estimatedTime: integer('estimated_time'),
  distanceMiles: decimal('distance_miles', { precision: 5, scale: 2 }),
  
  shopIds: uuid('shop_ids').array().notNull(),
  rewards: jsonb('rewards'),
  tags: varchar('tags', { length: 50 }).array(),
  
  isFeatured: boolean('is_featured').default(false),
  isActive: boolean('is_active').default(true),
  
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Trail progress table
export const trailProgress = pgTable('trail_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  trailId: uuid('trail_id').notNull().references(() => trails.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  visitedShopIds: uuid('visited_shop_ids').array().default([]),
  isCompleted: boolean('is_completed').default(false),
  
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('trail_progress_user_idx').on(table.userId),
  trailIdx: index('trail_progress_trail_idx').on(table.trailId),
  uniqueProgress: unique('trail_progress_unique').on(table.trailId, table.userId),
}));

// Rewards table
export const rewards = pgTable('rewards', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: rewardTypeEnum('type'),
  value: integer('value'),
  
  pointsCost: integer('points_cost').default(0),
  
  shopId: uuid('shop_id').references(() => coffeeShops.id),
  
  imageUrl: text('image_url'),
  icon: varchar('icon', { length: 50 }),
  
  isActive: boolean('is_active').default(true),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  quantityAvailable: integer('quantity_available'),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// User rewards table
export const userRewards = pgTable('user_rewards', {
  id: uuid('id').primaryKey().defaultRandom(),
  rewardId: uuid('reward_id').notNull().references(() => rewards.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  acquiredAt: timestamp('acquired_at', { withTimezone: true }).defaultNow(),
  redeemedAt: timestamp('redeemed_at', { withTimezone: true }),
  isRedeemed: boolean('is_redeemed').default(false),
  redemptionCode: varchar('redemption_code', { length: 100 }),
}, (table) => ({
  uniqueReward: unique('user_rewards_unique').on(table.rewardId, table.userId),
}));

// Achievements table
export const achievements = pgTable('achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  
  requirement: integer('requirement').notNull(),
  requirementType: requirementTypeEnum('requirement_type'),
  
  tier: tierEnum('tier'),
  pointsReward: integer('points_reward').default(0),
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// User achievements table
export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  achievementId: uuid('achievement_id').notNull().references(() => achievements.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  earnedAt: timestamp('earned_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  uniqueAchievement: unique('user_achievements_unique').on(table.achievementId, table.userId),
}));

// Posts table
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  type: postTypeEnum('type'),
  content: text('content'),
  imageUrl: text('image_url'),
  
  shopId: uuid('shop_id').references(() => coffeeShops.id),
  trailId: uuid('trail_id').references(() => trails.id),
  rewardId: uuid('reward_id').references(() => rewards.id),
  
  rating: integer('rating'),
  
  likesCount: integer('likes_count').default(0),
  commentsCount: integer('comments_count').default(0),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  userIdx: index('posts_user_idx').on(table.userId),
  shopIdx: index('posts_shop_idx').on(table.shopId),
  createdIdx: index('posts_created_idx').on(table.createdAt),
}));

// Post likes table
export const postLikes = pgTable('post_likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  uniqueLike: unique('post_likes_unique').on(table.postId, table.userId),
}));

// Post comments table
export const postComments = pgTable('post_comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// User follows table
export const userFollows = pgTable('user_follows', {
  id: uuid('id').primaryKey().defaultRandom(),
  followerId: uuid('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followingId: uuid('following_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  followerIdx: index('user_follows_follower_idx').on(table.followerId),
  followingIdx: index('user_follows_following_idx').on(table.followingId),
  uniqueFollow: unique('user_follows_unique').on(table.followerId, table.followingId),
}));

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type CoffeeShop = typeof coffeeShops.$inferSelect;
export type NewCoffeeShop = typeof coffeeShops.$inferInsert;

export type Checkin = typeof checkins.$inferSelect;
export type NewCheckin = typeof checkins.$inferInsert;

export type Trail = typeof trails.$inferSelect;
export type NewTrail = typeof trails.$inferInsert;

export type TrailProgress = typeof trailProgress.$inferSelect;
export type NewTrailProgress = typeof trailProgress.$inferInsert;

export type Reward = typeof rewards.$inferSelect;
export type NewReward = typeof rewards.$inferInsert;

export type UserReward = typeof userRewards.$inferSelect;
export type NewUserReward = typeof userRewards.$inferInsert;

export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type PostLike = typeof postLikes.$inferSelect;
export type NewPostLike = typeof postLikes.$inferInsert;

export type PostComment = typeof postComments.$inferSelect;
export type NewPostComment = typeof postComments.$inferInsert;

export type UserFollow = typeof userFollows.$inferSelect;
export type NewUserFollow = typeof userFollows.$inferInsert;
