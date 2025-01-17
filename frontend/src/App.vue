<template>
  <div>
    <div v-if="layout === 'admin'" class="min-h-screen">
      <AdminLayout>
        <template #body>
          <RouterView />
        </template>
      </AdminLayout>
    </div>
    <div v-else>
      <div v-if="noHeader" class="min-h-screen">
        <RouterView />
      </div>
      <div v-else class="min-h-screen">
        <MainLayout>
          <template #body>
            <RouterView />
          </template>
        </MainLayout>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import MainLayout from './views/Layouts/Layout.vue'
import AdminLayout from './views/AdminLayouts/AdminLayout.vue'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

const route = useRoute()
const layout = computed(() => route.meta.layout || 'default')
const noHeader = computed(() => route.meta.noHeader)
</script>
