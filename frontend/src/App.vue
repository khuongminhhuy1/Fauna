<template>
  <template v-if="noHeader">
    <div class="min-h-screen">
      <RouterView />
    </div>
  </template>
  <template v-else>
    <div class="min-h-screen bg-white">
      <Layout>
        <template #body>
          <RouterView />
        </template>
      </Layout>
    </div>
  </template>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import Layout from './views/Layouts/Layout.vue'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

const route = useRoute()
const noHeader = computed(() => route.meta.noHeader)
</script>
