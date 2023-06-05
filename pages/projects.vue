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
import ProjectCard from "@/components/atoms/projectCard.vue";
import { useAsyncState } from "@vueuse/core";

const { state: images } = useAsyncState(() =>
  Object.entries(
    import.meta.glob("@/assets/images/*.png*", { as: "url", eager: true })
  ).reduce(async (acc, [key, url]) => {
    const projectName = key.split("/").at(-1).split(".")[0];

    return {
      ...acc,
      [projectName]: url,
    };
  }, {})
);

const { state: repos } = useAsyncState(() =>
  fetch("https://api.github.com/users/escobarAndre/repos", {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  }).then((response) => response.json())
);

const currentOpenedFolderRepos = computed(() => {
  const reposToUse = currentOpenedFolder.value?.repos || [];

  return repos.value?.filter((repo) => reposToUse.includes(repo.name));
});

const folders = reactive([
  {
    id: useUniqueId("project-folders-"),
    title: "Vue",
    icon: "carbon:logo-vue",
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
    repos: ["portfolio"],
  },
]);

const openedFolders = computed(() =>
  folders.filter((folder) => Boolean(folder.isOpen))
);

const currentOpenedFolder = ref({
  repos: [],
});

onBeforeMount(() => {
  currentOpenedFolder.value = openedFolders.value.at(-1) || { repos: [] };
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
        "projects",
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
  },
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
                class: `py-2 flex items-center gap-2 cursor-pointer select-none w-min`,
                onClick: () => toggleFolder(folder.id),
              },
              [
                h(
                  "label",
                  {
                    class: "relative h-4 w-4 cursor-pointer",
                    onClick: () => toggleFolder(folder.id),
                  },
                  [
                    h("input", {
                      type: "checkbox",
                      checked: folder.isOpen,
                      onClick: () => toggleFolder(folder.id),
                      class: `accent-[#607B96] appearance-none h-4 w-4 relative cursor-pointer border border-[0.5px] border-[#607B96] ${
                        folder.isOpen ? "bg-[#607B96]" : "bg-transparent"
                      }`,
                    }),
                    folder.isOpen
                      ? h(Icon, {
                          name: "ic:baseline-check",
                          style: `width: 17px; height: 17px; color: white`,
                          class:
                            "cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                        })
                      : "",
                  ]
                ),
                h(Icon, {
                  name: folder.icon,
                  style: `width: 18px; height: 18px; color: #607B96`,
                  class: "cursor-pointer ml-3",
                }),
                h(
                  "p",
                  { class: `text-${folder.isOpen ? "white" : "[#607B96]"} ` },
                  folder.title
                ),
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
            class: `text-[#607B96] h-full w-full py-20 px-20 ${currentOpenedFolderRepos.value ? 'grid grid-cols-3' : 'flex items-center justify-center'}`,
          },
          currentOpenedFolderRepos.value?.map((repo, index) =>
            h(ProjectCard, {
              title: `Project ${index + 1}`,
              subTitle: repo.name,
              description: repo.description,
              imageURL: images.value?.[repo.name] || "",
              imageAlt: `image-project: ${index + 1}`,
              projectURL: repo.html_url,
            })
          ) || h(Icon, {
                          name: "svg-spinners:6-dots-scale",
                          style: `width: 33px; height: 33px; color: white`,
                          class:
                            "animate-spin",
                        })
        );
      },
    },
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
