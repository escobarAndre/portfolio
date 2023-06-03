<template>
  <div class="flex items-center justify-center h-full gap-[250px]">
    <div>
      <h3 class="font-[450] text-[#E5E9F0]">Hi all. I am</h3>
      <h1 class="text-[62px] text-[#E5E9F0] leading-[62px]">André Escobar</h1>
      <h2 class="text-[32px] text-[#4D5BCE]">> Front-end developer</h2>
    </div>
    <img
      src="@/assets/images/andre_escobar.jpeg"
      alt="Developer Picture"
      class="rounded-full h-[430px] z-10"
    />
  </div>
  <div class="green-blur" />
  <div class="blue-blur" />
</template>

<script setup>
import { createClient } from "pexels";

const client = createClient(
  "gjcwEzr7i1uBDoZGbatuIW8GNTMss9d61YrHDELGZGhB5mb4mO20pgnk"
);
</script>

<style scoped>
.green-blur {
  position: absolute;
  width: 454px;
  height: 492px;
  left: 50%;
  top: 15%;
  z-index: 5;

  background: #43d9ad;
  opacity: 0.4;
  filter: blur(87px);
  transform: rotate(-94.3deg);
}

.blue-blur {
  position: absolute;
  width: 454px;
  height: 492px;
  left: 65%;
  top: 30%;
  z-index: 4;

  background: #4d5bce;
  opacity: 0.4;
  filter: blur(87px);
  transform: rotate(13.51deg);
}
</style>
