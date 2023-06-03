<template>
 
  <component is="script" language="javascript">
    function printArray(array) { array.forEach((item) => console.log(item)); }
    const numbers = [1, 2, 3, 4, 5]; printArray(numbers);
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

function a(value) {
  return value + 2;
}
</script>
