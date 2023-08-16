<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <pre class="px-4">{{ JSON.stringify(user, null, 2) }}</pre>
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);

const { useAuthUser } = useAuth();
const user = useAuthUser();
</script>
