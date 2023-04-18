<template>
  <div class="h-full w-full">
    <div class="flex">
      <div
        v-for="header in headers"
        :key="header.id"
        class="header"
        :class="header.classes"
      >
        <component :is="header.content" />
      </div>
    </div>

    <div class="flex h-[calc(100%-40px)]">
      <section
        v-for="main in mains"
        :key="main.id"
        class="section"
        :class="main.classes"
      >
        <component :is="main.content" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "#components";

const folders = reactive([
  {
    id: useUniqueId("about-folders-"),
    title: "bio",
    isOpen: true,
    files: [
      {
        id: useUniqueId("about-files-"),
        icon: "",
        title: "index",
        content: "",
      },
    ],
  },
  {
    id: useUniqueId("about-folders-"),
    title: "education",
    isOpen: true,
    files: [
      {
        id: useUniqueId("about-files-"),
        icon: "",
        title: "",
        content: "",
      },
    ],
  },
  {
    id: useUniqueId("about-folders-"),
    title: "experience",
    isOpen: false,
    files: [
      {
        id: useUniqueId("about-files-"),
        icon: "",
        title: "",
        content: "",
      },
    ],
  },
]);

const openedFolders = computed(() =>
  folders.filter((folder) => Boolean(folder.isOpen))
);

function closeFolder(folderId) {
  const folderIndex = folders.findIndex((folder) => folder.id === folderId);

  folders[folderIndex].isOpen = false;
}

function toggleFolder(folderId) {
  const folderIndex = folders.findIndex((folder) => folder.id === folderId);

  folders[folderIndex].isOpen = !folders[folderIndex].isOpen;
}

const headers = shallowRef([
  {
    id: useUniqueId("about-header-"),
    classes: "min-w-[225px]",

    content: h(
      "div",
      {
        class: "text-white flex items-center gap-2 h-full px-4 cursor-default",
      },
      [
        h(Icon, {
          name: "ic:baseline-arrow-drop-down",
          style: "width: 24px; height: 24px",
        }),
        "personal-info",
      ]
    ),
  },
  {
    id: useUniqueId("about-header-"),
    classes: "w-[45%]",
    content: {
      render() {
        return h(
          "div",
          {
            class: "flex h-full",
          },
          openedFolders.value.map((folder) =>
            h(
              "div",
              {
                class:
                  "w-min h-full px-4 text-[#607B96] flex items-center gap-8 justify-start border-r-[0.5px] border-[#1E2D3D]",
              },
              [
                h("p", { class: "text-sm" }, folder.title),
                h(Icon, {
                  name: "ic:round-close",
                  style: "width: 16px; height: 16px",
                  class: "cursor-pointer",
                  onClick: () => closeFolder(folder.id),
                }),
              ]
            )
          )
        );
      },
    },
  },
  {
    id: useUniqueId("about-header-"),
    classes: "w-[42%]",
    content: h(),
  },
]);

const mains = ref([
  {
    id: useUniqueId("about-main-"),
    classes: "min-w-[225px]",
    content: h(
      "ul",
      {
        class: "pl-4 pr-2 py-2",
      },
      folders.map((folder) =>
        h(
          "li",
          {
            class: `text-${
              folder.isOpen ? "white" : "[#607B96]"
            } py-2 flex items-center gap-4 cursor-pointer select-none w-min`,
            onClick: () => toggleFolder(folder.id)
          },
          [
            folder.isOpen
              ? h(Icon, {
                  name: "ic:baseline-keyboard-arrow-down",
                  style: "width: 24px; height: 24px",
                  class: "cursor-pointer",
                })
              : h(Icon, {
                  name: "ic:baseline-keyboard-arrow-right",
                  style: "width: 24px; height: 24px",
                  class: "cursor-pointer",
                }),
            h("p", folder.title),
          ]
        )
      )
    ),
  },
  {
    id: useUniqueId("about-main-"),
    classes: "w-[45%]",
    content: h("p"),
  },
  {
    id: useUniqueId("about-main-"),
    classes: "w-[42%]",
    content: h("p"),
  },
]);
</script>

<style lang="postcss" scoped>
section {
  @apply h-full border-r-[0.5px] border-[#1E2D3D];
}
.header {
  @apply h-10 border-b-[0.5px] border-r-[0.5px] border-[#1E2D3D];
}
</style>
