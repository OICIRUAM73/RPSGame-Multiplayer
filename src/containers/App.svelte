<script>
  import { onMount } from 'svelte';
  import { blur } from 'svelte/transition';
  import { opponentName, roomName, showModal, opponentScore, playerScore } from '../store/store.js';
  import Header from '../components/Header.svelte';
  import Main from '../components/Main.svelte';
  import Game from '../components/Game.svelte';
  import Rules from '../components/Rules.svelte';
  import GameRules from '../components/GameRules.svelte';
  import Modal from '../components/Modal.svelte';
  import Lobby from '../components/Lobby.svelte';

  if($roomName === undefined) {
    console.log("room vacia");
    $opponentScore = 0;
    $playerScore = 0;
    $opponentName = undefined;
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap');

  :global(html) {
    height: 100%;
  }

  :global(body) {
    background-image: radial-gradient(circle at center top, rgb(31, 55, 87) 20%, rgb(19, 21, 55) 100%);
    height: 100%;
    color: white;
    font-family: 'Barlow Semi Condensed', sans-serif;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  :global(h1, h2, h3) {
    margin: 0;
    padding: 0;
  }
</style>

{#if $showModal}
  <div transition:blur={{duration:90}}>
    <Modal>
      <GameRules />
    </Modal>
  </div>
{/if}
{#if $roomName === undefined}
  <Lobby />
{:else}
  <h3>Current Room: {$roomName} {$opponentName? "- Opponent: " + $opponentName : ""}</h3> 
  <Header></Header>
  <Main>
    <Game />
  </Main>
  <Rules/>
{/if}