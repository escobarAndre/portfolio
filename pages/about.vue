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
        <!-- {{ main }} -->
        <component :is="main.content" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "#components";
import { bio, experience, education } from "@/utils/about-me-contents";

const folders = reactive([
  {
    id: useUniqueId("about-folders-"),
    title: "bio",
    isOpen: true,
    color: "#E99287",
    files: [
      {
        id: useUniqueId("about-files-"),
        icon: "",
        title: "index",
        content: "",
      },
    ],
    content: bio,
  },
  {
    id: useUniqueId("about-folders-"),
    title: "education",
    isOpen: false,
    color: "#43D9AD",
    files: [
      {
        id: useUniqueId("about-files-"),
        icon: "",
        title: "",
        content: "",
      },
    ],
    content: education,
  },
  {
    id: useUniqueId("about-folders-"),
    title: "experience",
    isOpen: false,
    color: "#3A49A4",
    files: [
      {
        id: useUniqueId("about-files-"),
        icon: "",
        title: "",
        content: "",
      },
    ],
    content: experience,
  },
]);

const openedFolders = computed(() =>
  folders.filter((folder) => Boolean(folder.isOpen))
);

const currentOpenedFolder = ref({
  content: [],
});

onBeforeMount(() => {
  currentOpenedFolder.value = openedFolders.value.at(-1) || { content: [] };
});

function getFolderIndex(folderId) {
  return folders.findIndex((folder) => folder.id === folderId);
}

function closeFolder(folderId) {
  const folderIndex = getFolderIndex(folderId);

  folders[folderIndex].isOpen = false;

  currentOpenedFolder.value = openedFolders.value.at(-1) || { content: [] };
}

function toggleFolder(folderId) {
  const folderIndex = getFolderIndex(folderId);

  folders[folderIndex].isOpen = !folders[folderIndex].isOpen;

  currentOpenedFolder.value = openedFolders.value.length
    ? folders[folderIndex]
    : { content: [] };
}

function setCurrentFolder(folderId) {
  const folderIndex = getFolderIndex(folderId);

  currentOpenedFolder.value = folders[folderIndex];
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
    classes: "w-[87%]",
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
                  "w-min h-full px-4 text-[#607B96] flex items-center gap-8 justify-start border-r-[0.5px] border-[#1E2D3D] select-none",
              },
              [
                h(
                  "p",
                  {
                    class: "text-sm cursor-pointer",
                    onClick: () => setCurrentFolder(folder.id),
                  },
                  folder.title
                ),
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
  }
  // 	{
  // 		id: useUniqueId("about-header-"),
  // 		classes: "w-[42%]",
  // 		content: {
  //     render() {
  //       return h(CodeSnipet)
  //     }
  //   },
  // 	},
]);

const mains = shallowRef([
  {
    id: useUniqueId("about-main-"),
    classes: "min-w-[225px]",
    content: {
      render() {
        return h(
          "ul",
          {
            class: "pl-4 pr-2 py-2",
          },
          folders.map((folder) => {
            return h(
              "li",
              {
                class: `text-${
                  folder.isOpen ? "white" : "[#607B96]"
                } py-2 flex items-center gap-4 cursor-pointer select-none w-min`,
                onClick: () => toggleFolder(folder.id),
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
                h(Icon, {
                  name: "material-symbols:folder-rounded",
                  style: `width: 20px; height: 20px; color: ${folder.color}`,
                  class: "cursor-pointer",
                }),
                h("p", folder.title),
              ]
            );
          })
        );
      },
    },
  },
  {
    id: useUniqueId("about-main-"),
    classes: "w-[87%]",
    content: {
      render() {
        return h(
          "div",
          {
            class: "text-[#607B96] py-6 px-9",
          },
          currentOpenedFolder.value.content.map((content, index) =>
            h("p", { class: "flex items-center gap-8" }, [
              h("span", { class: "w-6 text-center" }, index + 1),
              !content ? h("div", ["*", h("br")]) : `* ${content}`,
            ])
          )
        );
      },
    },
  },
  // {
  // 	id: useUniqueId("about-main-"),
  // 	classes: "w-[42%]",
  // 	content: h("p", {class: 'bg-red-500'}),
  // },
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
