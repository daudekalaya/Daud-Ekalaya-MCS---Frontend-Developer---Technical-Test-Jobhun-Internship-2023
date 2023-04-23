import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import FilmDisplay from '@/components/FilmDisplay'
import MovieDetail from '@/components/MovieDetail';

const routes = [
  {
    path: '/',
    name: 'FilmDisplay',
    component: FilmDisplay
  },
  {
    path: '/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true
 }
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router