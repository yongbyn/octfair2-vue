import { createRouter, createWebHistory } from "vue-router";
import ApplicantResume from "../components/page/Applicant/ApplicantResume.vue";
import ResumeDetail from "../components/page/Apply/Resume/ResumeDetail.vue";
import NoticeDetail from "../components/page/Board/Notice/NoticeDetail.vue";
import CompanyDetail from "../components/page/Company/CompanyDetail.vue";
import FAQDetailModal from "../components/page/FAQ/FAQDetailModal.vue";
import HirePostEditor from "../components/page/Hire/HirePostEditor.vue";
import PostDetail from "../components/page/Jobs/Post/PostDetail.vue";
import QnaDetailModal from "../components/page/Qna/QnaDetailModal.vue";
import ApplicantViewMain from "../views/Applicant/ApplicantViewMain.vue";
import History from "../views/Apply/History/History.vue";
import Resume from "../views/Apply/Resume/Resume.vue";
import ApprovalPost from "../views/Approval/ApprovalPost.vue";
import ConfirmedPost from "../views/Approval/ConfirmedPost.vue";
import Notice from "../views/Board/Notice.vue";
import DashBoard from "../views/DashBoard/DashBoard.vue";
import FAQ from "../views/FAQ/FAQ.vue";
import HirePost from "../views/Hire/HirePost.vue";
import Post from "../views/Jobs/Post.vue";
import Scrap from "../views/Jobs/Scrap.vue";
import Login from "../views/Login/Login.vue";
import ManageApplicant from "../views/ManageUser/ManageApplicant.vue";
import ManageBiz from "../views/ManageUser/ManageBiz.vue";
import CompanySave from "../views/MyPage/CompanySave.vue";
import MyPage from "../views/MyPage/MyPage.vue";
import Withdraw from "../views/MyPage/Withdraw.vue";
import Qna from "../views/Qna/QuesnAnsw.vue";

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
            name: "qna",
            component: Qna,
          },

          {
            path: "qnaInsert.do/insert",
            name: "qnaInsert",
            component: QnaDetailModal,
          },
          {
            path: "faq.do",
            name: "faq",
            component: FAQ,
          },
          {
            path: "faqDetailBody.do/:faq_idx",
            name: "faqDetail",
            component: FAQDetailModal,
          },

          {
            path: "faqSavePart.do",
            name: "faqInsert",
            component: FAQDetailModal,
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
            path: "resume-detail.do",
            name: "resumeDetail",
            component: ResumeDetail,
          },
          {
            path: "history.do",
            name: "history",
            component: History,
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
          {
            path: "posts.do/:idx",
            name: "postDetail",
            component: PostDetail,
          },
          {
            path: "scrap.do",
            name: "scrap",
            component: Scrap,
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

          {
            path: "editor.do",
            name: "hire-post-create",
            component: HirePostEditor,
          },

          {
            path: "applicant.do",
            name: "volunteer",
            component: ApplicantViewMain,
          },
          {
            path: "applicantresume.do?:resIdx",
            name: "volunteerresume",
            component: ApplicantResume,
          },

          {
            path: "editor.do/:idx",
            name: "hire-post-update",
            component: HirePostEditor,
          },
        ],
      },
      {
        path: "manage-post",
        name: "manage-post",
        children: [
          {
            path: "approval.do",
            name: "approval-post",
            component: ApprovalPost,
          },
          {
            path: "post.do",
            name: "posts",
            component: ConfirmedPost,
          },
        ],
      },
      {
        path: "company",
        name: "company",
        children: [
          {
            path: "companyDetail.do/:bizIdx",
            name: "companyDetail",
            component: CompanyDetail,
          },
        ],
      },
      {
        path: "manage-user",
        name: "manage-user",
        children: [
          {
            path: "applicant.do",
            name: "manageApplicant",
            component: ManageApplicant,
          },
          {
            path: "biz.do",
            name: "manageBiz",
            component: ManageBiz,
          },
        ],
      },
      {
        path: "mypage",
        name: "mypage",
        children: [
          {
            path: "update.do",
            name: "update",
            component: MyPage,
          },
          {
            path: "withdraw.do",
            name: "withdraw",
            component: Withdraw,
          },
          {
            path: "companyWritePage.do",
            name: "companyWritePage",
            component: CompanySave,
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
