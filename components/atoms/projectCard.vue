<template>
  <div>
    <h1 class="text-base text-[#5565E8] font-bold flex items-center gap-2 pb-2">
      {{ title }}

      <span class="text-[#607B96] font-light"> // {{ subTitle }} </span>
    </h1>
    <div
      class="border border-[0.5px] border-[#1E2D3D] rounded-[15px] h-[315px] w-[370px]"
    >
      <img :src="imageURL" :alt="imageAlt" class="h-[145px] rounded-t-[15px] w-full" />

      <div class="h-[calc(100%-145px)] w-full p-6 flex flex-col justify-between">
        <h2 class="text-sm text-[#607B96] pb-3">{{ description }}</h2>

        <a
          :href="projectURL"
          target="_blank"
          class="rounded-md py-2 px-6 w-min whitespace-nowrap text-white flex items-center justify-center bg-[#607B96]"
        >
          view-project
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
    subTitle: string;
    description: string;
    imageURL: string;
    imageAlt: string;
    projectURL: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped></style>
