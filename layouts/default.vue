<template>
  <div class="h-screen w-screen bg-[#011627] overflow-hidden">
    <header
      class="h-14 pl-5 w-full border-b-[0.5px] border-[#1E2D3D] flex items-center justify-between text-[#607B96]"
    >
      <div class="flex items-center gap-20">
        <h1 class="cursor-default">andré escobar</h1>
        <div
          class="flex items-center divide-x-[0.5px] divide-[#1E2D3D] h-full border-x-[0.5px] border-[#1E2D3D]"
        >
          <div
            v-for="menuItem in menu"
            :key="`menu items key: ${menuItem.title}`"
            class="h-full flex flex-col justify-between pt-[3px] cursor-pointer"
          >
            <NuxtLink :to="`/${menuItem.page}`">
              <p class="px-6 leading-[50px]">
                {{ menuItem.title }}
              </p>
            </NuxtLink>
            <div
              class="w-full h-[3px] transition-all duration-200 ease-linear"
              :class="menuItem.currentTab() ? 'bg-[#FEA55F]' : 'bg-transparent'"
            />
          </div>
        </div>
      </div>
      <NuxtLink to="/contact">
        <p
          class="px-6 border-x-[0.5px] border-[#1E2D3D] leading-[56px] cursor-pointer"
        >
          _contact-me
        </p>
      </NuxtLink>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer
      class="h-14 pl-5 w-full border-t-[0.5px] border-[#1E2D3D] flex items-center justify-between text-[#607B96]"
    >
      <div class="flex items-center h-full">
        <p class="pr-5 cursor-default">find me in:</p>

        <template v-for="social in socials" :key="`social key: ${social.name}`">
          <div
            class="px-4 border-x-[0.5px] border-[#1E2D3D] h-full flex items-center"
          >
            <a :href="social.url" target="blank">
              <component :is="social.icon" />
            </a>
          </div>
        </template>
      </div>
      <div
        class="px-6 border-x-[0.5px] border-[#1E2D3D] leading-[56px] flex items-center gap-4 cursor-default"
      >
        @escobarAndre

        <Icon name="mdi:github" class="icon" />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "#components";

const route = useRoute();

const githubIcon = h(Icon, {
  name: "mdi:linkedin",
  style: "width: 24px; height: 24px",
});

const linkedinIcon = h(Icon, {
  name: "mdi:github",
  style: "width: 24px; height: 24px",
});

const menu = [
  {
    title: "_hello",
    currentTab: () => route.name === "hello",
    page: "hello",
  },
  {
    title: "_about_me",
    currentTab: () => route.name === "about",
    page: "about",
  },
  {
    title: "_projects",
    currentTab: () => route.name === "projects",
    page: "projects",
  },
];

const socials = ref([
  {
    name: "linkedin",
    icon: linkedinIcon,
    url: "https://www.linkedin.com/in/andreescobarms/",
  },
  {
    title: "github",
    icon: githubIcon,
    url: "https://github.com/escobarAndre",
  },
]);
</script>

<style scoped>
.main {
  width: 100%;
  height: calc(100% - 112px);
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
