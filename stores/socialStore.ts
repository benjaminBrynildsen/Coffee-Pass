import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocialPost } from '@/types';
import { mockSocialPosts } from '@/data/mockData';

interface SocialState {
  posts: SocialPost[];
  
  // Actions
  addPost: (post: SocialPost) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: { id: string; userId: string; content: string; createdAt: string }) => void;
  getPostsForShop: (shopId: string) => SocialPost[];
  getPostsForUser: (userId: string) => SocialPost[];
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      posts: mockSocialPosts,

      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
      })),
      
      likePost: (postId, userId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId && !post.likedBy.includes(userId)
            ? { ...post, likes: post.likes + 1, likedBy: [...post.likedBy, userId] }
            : post
        ),
      })),
      
      unlikePost: (postId, userId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId && post.likedBy.includes(userId)
            ? { 
                ...post, 
                likes: Math.max(0, post.likes - 1), 
                likedBy: post.likedBy.filter(id => id !== userId) 
              }
            : post
        ),
      })),
      
      addComment: (postId, comment) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, comment] }
            : post
        ),
      })),
      
      getPostsForShop: (shopId) => {
        return get().posts.filter(post => post.shopId === shopId);
      },
      
      getPostsForUser: (userId) => {
        return get().posts.filter(post => post.userId === userId);
      },
    }),
    {
      name: 'social-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
