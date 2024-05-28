<script setup lang="ts"></script>

<template>
  <div class="overlay">
    <div
      class="flex absolute justify-center items-center w-[6dvw] h-[6dvw] top-[calc(50%-3dvw)] left-[calc(50%-3dvw)]"
    >
      <div class="spinner-sector"></div>
      <div class="spinner-sector"></div>
      <div class="spinner-sector"></div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner-sector {
  border-radius: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 10px solid transparent;
  mix-blend-mode: overlay;
  z-index: 100;
}

.spinner-sector:nth-child(1) {
  border-top-color: var(--secondary);
  animation: spin 2s ease-out infinite;
}

.spinner-sector:nth-child(2) {
  border-top-color: var(--primary);
  animation: spin 2.5s ease-in infinite;
}

.spinner-sector:nth-child(3) {
  border-top-color: var(--accent);
  animation: spin 1.5s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
