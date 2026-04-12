import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import ClasIndex from "../views/ClasIndex.vue";
import Faq from "../views/Faq.vue";
import News from "../views/News.vue";
import ErrorView from "../views/ErrorView.vue";

import LoginView from "../components/auth/LoginView.vue";
import RegisterView from "../components/auth/RegisterView.vue";

// Admin Views
import AdminLayout from "../views/admin/Layout.vue";
import AdminDashboard from "../views/admin/Dashboard.vue";

// Users
import UserList from "../views/admin/users/UserList.vue";

// Courses
import CourseList from "../views/admin/courses/CourseList.vue";
import CourseCreate from "../views/admin/courses/CourseCreate.vue";
import CourseEdit from "../views/admin/courses/CourseEdit.vue";
import CategoryList from "../views/admin/categories/CategoryList.vue";
import ManageTransaction from "../views/admin/transactions/TransactionList.vue";
import AdminSettings from "../views/admin/Settings.vue";

// Mentors
import MentorList from "../views/admin/mentors/MentorList.vue";
import MentorVerification from "../views/admin/mentors/MentorVerification.vue";
import MentorDetail from "../views/admin/mentors/MentorDetail.vue";

// Transactions
import TransactionList from "../views/admin/transactions/TransactionList.vue";
import TransactionDetail from "../views/admin/transactions/TransactionDetail.vue";

// Settings
import SettingsGeneral from "../views/admin/settings/General.vue";

// Shared Views
import SharedLeaderboard from "../views/shared/Leaderboard.vue";

// ========================
// Mentor Views
// ========================
import MentorLayout_M from "../views/mentor/Layout.vue";
import MentorDashboard_M from "../views/mentor/Dashboard.vue";

import CourseList_M from "../views/mentor/courses/CourseList.vue";
import UploadMaterial_M from "../views/mentor/courses/UploadMaterial.vue";
import UploadQuiz_M from "../views/mentor/courses/UploadQuiz.vue";

// Mentor Students
import StudentList_M from "../views/mentor/students/StudentList.vue";

// Mentor Transactions
import TransactionList_M from "../views/mentor/transactions/TransactionList.vue";

// Mentor Settings
import Settings_M from "../views/mentor/settings/Settings.vue";
import AssignmentReview_M from "../views/mentor/assignments/AssignmentReview.vue";

// ========================
// Student Views
// ========================
import StudentLayout from "../views/student/Layout.vue";
import StudentDashboard from "../views/student/Dashboard.vue";
import ExploreCourses from "../views/student/ExploreCourses.vue";
import MyCourses from "../views/student/MyCourses.vue";
import LearningRoom from "../views/student/LearningRoom.vue";
import Certificates from "../views/student/Certificates.vue";
import StudentSettings from "../views/student/Settings.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/class",
    name: "class",
    component: ClasIndex,
  },
  {
    path: "/faq",
    name: "faq",
    component: Faq,
  },
  {
    path: "/news",
    name: "news",
    component: News,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/news",
    name: "news",
    component: News,
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      // Dashboard
      { path: "", name: "admin.dashboard", component: AdminDashboard },

      // Users Management
      { path: "users", name: "admin.users.list", component: UserList },

      // Courses Management
      { path: "courses", name: "admin.courses.list", component: CourseList },
      {
        path: "courses/create",
        name: "admin.courses.create",
        component: CourseCreate,
      },
      {
        path: "courses/edit/:courseId",
        name: "admin.courses.edit",
        component: CourseEdit,
      },
      {
        path: "categories",
        name: "admin.categories.list",
        component: CategoryList,
      },

      // Mentors Management
      { path: "mentors", name: "admin.mentors.list", component: MentorList },
      {
        path: "mentors/verification",
        name: "admin.mentors.verification",
        component: MentorVerification,
      },

      // Students
      { path: "students", name: "admin.students.list", component: UserList },

      // Transactions
      {
        path: "transactions",
        name: "admin.transactions.list",
        component: ManageTransaction,
      },

      // System Settings
      { path: "settings", name: "admin.settings", component: AdminSettings },

      {
        path: "mentors/:mentorId",
        name: "admin.mentors.detail",
        component: MentorDetail,
      },

      // Leaderboard
      {
        path: "leaderboard",
        name: "admin.leaderboard",
        component: SharedLeaderboard,
      },
    ],
  },
  {
    path: "/mentor",
    component: MentorLayout_M,
    children: [
      // Dashboard
      { path: "", name: "mentor.dashboard", component: MentorDashboard_M },

      // Courses Management
      { path: "courses", name: "mentor.courses.list", component: CourseList_M },
      {
        path: "courses/:courseId/upload-material",
        name: "mentor.courses.upload-material",
        component: UploadMaterial_M,
      },
      {
        path: "courses/:courseId/upload-quiz",
        name: "mentor.courses.upload-quiz",
        component: UploadQuiz_M,
      },

      // Assignments
      {
        path: "assignments",
        name: "mentor.assignments.review",
        component: AssignmentReview_M,
      },

      // Students
      {
        path: "students",
        name: "mentor.students.list",
        component: StudentList_M,
      },

      // Transactions
      {
        path: "transactions",
        name: "mentor.transactions.list",
        component: TransactionList_M,
      },

      // Leaderboard
      {
        path: "leaderboard",
        name: "mentor.leaderboard",
        component: SharedLeaderboard,
      },

      // Settings
      { path: "settings", name: "mentor.settings", component: Settings_M },
    ],
  },
  {
    path: "/student",
    component: StudentLayout,
    children: [
      { path: "", name: "student.dashboard", component: StudentDashboard },
      { path: "explore", name: "student.explore", component: ExploreCourses },
      { path: "courses", name: "student.courses.list", component: MyCourses },
      {
        path: "courses/:courseId/learn",
        name: "student.learning",
        component: LearningRoom,
      },
      {
        path: "leaderboard",
        name: "student.leaderboard",
        component: SharedLeaderboard,
      },
      {
        path: "certificates",
        name: "student.certificates",
        component: Certificates,
      },
      {
        path: "settings",
        name: "student.settings",
        component: StudentSettings,
      },
    ],
  },
  {
    path: "/403",
    name: "Forbidden",
    component: ErrorView,
    props: { code: 403 }
  },
  {
    path: "/404",
    name: "NotFound",
    component: ErrorView,
    props: { code: 404 }
  },
  {
    path: "/500",
    name: "ServerError",
    component: ErrorView,
    props: { code: 500 }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
