<template>
  <template v-if="layout === 'admin'">
    <div class="min-h-screen">
      <AdminLayout>
        <template #body>
          <RouterView />
        </template>
      </AdminLayout>
    </div>
  </template>
  <template v-else>
    <template v-if="noHeader">
      <div class="min-h-screen">
        <RouterView />
      </div>
    </template>
    <template v-else>
      <div class="min-h-screen">
        <MainLayout>
          <template #body>
            <RouterView />
          </template>
        </MainLayout>
      </div>
    </template>
  </template>
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
