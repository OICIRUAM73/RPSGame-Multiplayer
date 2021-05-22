<script>
  import { blur } from "svelte/transition";
  import firebase from "firebase/app";
  import { db } from "../firebase.js";
  import {
    isHost,
    opponentName,
    roomName,
    showModal,
    opponentScore,
    playerScore,
    playerName,
  } from "../store/store.js";
  import Header from "../components/Header.svelte";
  import Main from "../components/Main.svelte";
  import Game from "../components/Game.svelte";
  import Rules from "../components/Rules.svelte";
  import GameRules from "../components/GameRules.svelte";
  import Modal from "../components/Modal.svelte";
  import Lobby from "../components/Lobby.svelte";

  if ($roomName === undefined) {
    console.log("room vacia");
    $opponentScore = 0;
    $playerScore = 0;
    $opponentName = undefined;
  }

  const handleLeaveRoom = async () => {
    try {
      if ($isHost) {
        await db
          .collection("rooms")
          .doc($roomName)
          .delete()
          .then(() => {
            restoreEmptyState();
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      } else {
        await db
          .collection("rooms")
          .doc($roomName)
          .update({
            visitorInGame: firebase.firestore.FieldValue.delete(),
            visitorScore: firebase.firestore.FieldValue.delete(),
            visitorName: firebase.firestore.FieldValue.delete(),
          })
          .then(() => {
            restoreEmptyState();
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const restoreEmptyState = () => {
    $roomName = undefined;
    $playerScore = 0;
    $opponentName = undefined;
    $opponentScore = 0;
    $isHost = false;
    window.location.href = "/";
  };

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

  .leave-room {
    text-decoration: underline;
    cursor: pointer;
  }
</style>

{#if $showModal}
  <div transition:blur={{ duration: 90 }}>
    <Modal>
      <GameRules />
    </Modal>
  </div>
{/if}
{#if $roomName === undefined}
  <Lobby />
{:else}
  <h3>
    Current Room: {$roomName}
    {$opponentName ? "- Opponent: " + $opponentName : ""} -
    <span class="leave-room" on:click={handleLeaveRoom}>
      {$isHost ? "Delete room" : "Leave room"}</span
    >
  </h3>
  <Header />
  <Main>
    <Game />
  </Main>
  <Rules />
{/if}
