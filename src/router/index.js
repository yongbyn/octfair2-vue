import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Board/Notice.vue';
import NoticeDetail from '../components/page/Board/Notice/NoticeDetail.vue';
import Qna from '../views/Qna/QuesnAnsw.vue';
import QnaDetailModal from '../components/page/Qna/QnaDetailModal.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/vue',
    name: 'vue',
    component: DashBoard,
    children: [
      {
        path: 'board',
        name: 'board',
        children: [
          {
            path: 'notice.do',
            name: 'notice',
            component: Notice,
          },
          {
            path: 'notice.do/:idx',
            name: 'noticeDetail',
            component: NoticeDetail,
          },
          {
            path: 'notice.do/insert',
            name: 'noticeInsert',
            component: NoticeDetail,
          },

          {
            path: 'qna.do',
            qna: 'qna',
            component: Qna,
          },

          {
            path: 'qnaInsert.do/insert',
            qna: 'qnaInsert',
            component: QnaDetailModal,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
