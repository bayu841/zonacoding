import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

// Admin Views
import AdminLayout from "../views/admin/Layout.vue";
import AdminDashboard from "../views/admin/Dashboard.vue";

// Users
import UserList from "../views/admin/users/UserList.vue";

// Courses
import CourseList from "../views/admin/courses/CourseList.vue";
import CourseCreate from "../views/admin/courses/CourseCreate.vue";
import CourseEdit from "../views/admin/courses/CourseEdit.vue";

// Mentors
import MentorList from "../views/admin/mentors/MentorList.vue";
import MentorVerification from "../views/admin/mentors/MentorVerification.vue";
import MentorDetail from "../views/admin/mentors/MentorDetail.vue";

// Transactions
import TransactionList from "../views/admin/transactions/TransactionList.vue";
import TransactionDetail from "../views/admin/transactions/TransactionDetail.vue";

// Settings
import SettingsGeneral from "../views/admin/settings/General.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
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
      { path: "courses/create", name: "admin.courses.create", component: CourseCreate },
      { path: "courses/edit/:courseId", name: "admin.courses.edit", component: CourseEdit },

      // Mentors Management
      { path: "mentors", name: "admin.mentors.list", component: MentorList },
      {
        path: "mentors/verification",
        name: "admin.mentors.verification",
        component: MentorVerification,
      },
      {
        path: "mentors/:mentorId",
        name: "admin.mentors.detail",
        component: MentorDetail,
      },

      // Transactions Management
      {
        path: "transactions",
        name: "admin.transactions.list",
        component: TransactionList,
      },
      {
        path: "transactions/:transactionId",
        name: "admin.transactions.detail",
        component: TransactionDetail,
      },

      // Settings
      {
        path: "settings/general",
        name: "admin.settings.general",
        component: SettingsGeneral,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
