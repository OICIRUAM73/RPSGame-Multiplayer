<script>
  import { blur } from 'svelte/transition';
  import { showModal } from '../store/store.js';
  import Modal from './Modal.svelte';
  let isModal = true;

  let handleClick = () => showModal.update(current => !current);
</script>
<style>
  /* .Rules {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  } */

  .Rules {
    height: 12vh;
    text-align: center;
  }

  .Rules-container {
    border: 1px solid hsl(0, 0%, 100%);
    border-radius: 8px;
    padding: 10px 37px;
    cursor: pointer;
    color: hsl(0, 0%, 100%);
    display: inline-block;
    text-align: center;
  }

  .Rules-container h2 {
    font-size: 16px;
    letter-spacing: 2.5px;
    font-weight: 600;
  }

  .Rules-container:hover {
    color: hsl(217, 16%, 45%);
    background: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 100%);
  }

  @media screen and (min-width: 768px) {
    .Rules {
      right: 0;
      left: auto;
      transform: none;
      position: fixed;
    }

    .Rules-container {
      margin: 0px 20px 20px;
    }
  }

  @media screen and (min-width: 1024px) {
    .Rules-container {
      margin: 0px 30px 30px;
    }
  }
</style>

<div class="Rules">
  <div class="Rules-container" on:click={handleClick}>
      <h2>RULES</h2>
  </div>
</div>