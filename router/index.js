import { createRouter, createWebHistory } from 'vue-router'
//import PostList from './views/PostList.vue';
import PostList from '../views/PostList.vue';
import PostContent from '../views/PostContent.vue';
import UserAuth from '../views/UserAuth.vue';
import NewPost from '../views/NewPost.vue';
import EditPost from '../views/EditPost.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/posts' },
    { path: '/posts', component: PostList, },
    { path: '/posts/:id', component: PostContent, props: true },
    { path: '/posts/:id/edit', component: EditPost, props: true },
    { path: '/auth', component: UserAuth },
    { path: '/newPost', component: NewPost },
  ],
})

export default router
