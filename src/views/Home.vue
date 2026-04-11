<script setup>
import HeroSection from "../components/HeroSection.vue";
import About from "../components/About.vue";
import AppLayout from "../layouts/AppLayout.vue";
import Class from "../components/Class.vue";
import Features from "../components/Features.vue";
</script>

<template>
  <AppLayout>
    <HeroSection />
    <About />
    <Class />
    <Features />
  </AppLayout>
</template>