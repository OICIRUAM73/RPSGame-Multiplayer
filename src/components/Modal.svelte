<style>
  .Modal {
    position: relative;
  }
  .Modal-overlay {
    background-color: hsla(0, 0%, 0%, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    cursor: pointer;
  }
</style>

<div class="Modal">
  <div class="Modal-overlay" />
  <slot />
</div>