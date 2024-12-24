import { createRouter, createWebHistory } from "vue-router";
import NoticeDetail from "../components/page/Board/Notice/NoticeDetail.vue";
import QnaDetailModal from "../components/page/Qna/QnaDetailModal.vue";
import ResumeDetail from "../components/page/Resume/ResumeDetail/ResumeDetail.vue";
import Notice from "../views/Board/Notice.vue";
import DashBoard from "../views/DashBoard/DashBoard.vue";
import HirePost from "../views/Hire/HirePost.vue";
import Post from "../views/Jobs/Post.vue";
import Login from "../views/Login/Login.vue";
import Qna from "../views/Qna/QuesnAnsw.vue";
import Resume from "../views/Resume/Resume.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/vue",
    name: "vue",
    component: DashBoard,
    children: [
      {
        path: "board",
        name: "board",
        children: [
          {
            path: "notice.do",
            name: "notice",
            component: Notice,
          },
          {
            path: "notice.do/:idx",
            name: "noticeDetail",
            component: NoticeDetail,
          },
          {
            path: "notice.do/insert",
            name: "noticeInsert",
            component: NoticeDetail,
          },

          {
            path: "qna.do",
            qna: "qna",
            component: Qna,
          },

          {
            path: "qnaInsert.do/insert",
            qna: "qnaInsert",
            component: QnaDetailModal,
          },
        ],
      },
      {
        path: "apply",
        name: "apply",
        children: [
          {
            path: "resume.do",
            name: "resume",
            component: Resume,
          },
          {
            path: "resume.do/:idx",
            name: "resumeDetail",
            component: ResumeDetail,
          },
        ],
      },
      {
        path: "jobs",
        name: "jobs",
        children: [
          {
            path: "posts.do",
            name: "post",
            component: Post,
          },
        ],
      },
      {
        path: "manage-hire",
        name: "manage-hire",
        children: [
          {
            path: "post.do",
            name: "hire-post",
            component: HirePost,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
