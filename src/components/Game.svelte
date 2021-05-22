<script>
  import { onMount } from 'svelte';
  import firebase from "firebase/app";
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications/src'
  import { db } from "../firebase.js";
  import { isHost, opponentName, playerScore, roomName, opponentScore, playerName } from "../store/store.js";
  import tokens from '../model/tokens';
  import Token from './Token.svelte';
  import Result from './Result.svelte';
  import Button from './Button.svelte';
  import { userPicked, initUserPicked } from '../store/store.js';

  let housePicked = {};
  let playerInGame = false;
  let opponentInGame = false;
  let waitingOpponentPick = true;
  $: console.log($opponentName);
  /*
  db.collection("tasks")
    .orderBy("createdAt", "asc")
    .onSnapshot((querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      tasks = [...docs];
      console.log(tasks);
    });
  */
  db.collection("rooms")
    .doc($roomName)
    .onSnapshot((doc) => {
      if(!doc.data()) {
        $roomName = undefined;
      } else {
        if(!doc.data().visitorName) {
          $opponentName = undefined;
        } else if(doc.data().visitorName && !$opponentName) {
          $opponentName = $isHost? doc.data().visitorName : doc.data().hostName;
          if($isHost) notifier.success($opponentName + " has joined the room!")
        }
        playerInGame = $isHost? doc.data().hostInGame || false : doc.data().visitorInGame || false;
        opponentInGame = $isHost? doc.data().visitorInGame || false : doc.data().hostInGame || false;
        if($isHost) {
          if(doc.data().hostScore) $playerScore = doc.data().hostScore;
          if(doc.data().visitorScore) $opponentScore = doc.data().visitorScore;
        } else {
          if(doc.data().visitorScore) $playerScore = doc.data().visitorScore;
          if(doc.data().hostScore) $opponentScore = doc.data().hostScore;
        }
        if(playerInGame && opponentInGame ) {
          let housePickedName = $isHost? doc.data().visitorPicked : doc.data().hostPicked;
          let housePickedToken = tokens.find(element => element.name === housePickedName);
          waitingOpponentPick = housePickedToken? false : true;
          housePicked = housePickedToken || {};
          if(housePicked.name) isHouseTokenPicked = true;
        }
      }
    });

  const handleStartGame = async () => {
    try {
      await db
        .collection("rooms")
        .doc($roomName)
        .update({ hostInGame: true, visitorInGame: true });
      console.log("Room created: ", $roomName);
    } catch (error) {
      console.error(error);
    }
  };

  $: isUserTokenPicked = $userPicked.name !== undefined;

  let isHouseTokenPicked = false;
  let gameFinished = false;
  let win = false;
  let isDraw = false;
  let isChanging = false;
  function pickHouseToken() {
    isChanging = true;
    let a = 0;
    let interval = setInterval(function() {
      getRandomToken();
      a = a + 1;
      if(a == 20) {
        clearInterval(interval);
        isHouseTokenPicked = true;
        isChanging = false;
      }
    }, 200);
  }

  function getRandomToken() {
    let selected = tokens[Math.floor(Math.random() * 3)];
    housePicked = selected;
  }

  $: if(isHouseTokenPicked & isUserTokenPicked) calculateResult();

  const calculateResult = async () => {
    if($userPicked.name == housePicked.name) {
      isDraw = true;
    } else {
      win = $userPicked.winTo == housePicked.name;
      if($isHost) {
        let resultDoc = win? {hostScore: $playerScore + 1} : {visitorScore: $opponentScore + 1}
         try {
          await db
            .collection("rooms")
            .doc($roomName)
            .update(resultDoc);
          console.log("Room created: ", $roomName);
        } catch (error) {
          console.error(error);
        }
      }
    }
    gameFinished = true;
  }

  //$: if(($userPicked.name !== undefined) && (housePicked.name == undefined)) pickHouseToken()

  const handleReset = async () => {
    initUserPicked();
    housePicked = {};
    isHouseTokenPicked = false;
    gameFinished = false;
    win = false;
    isDraw = false;
    try {
      let inGameDoc = $isHost? {hostInGame : false} : {visitorInGame: false}
      await db
        .collection("rooms")
        .doc($roomName)
        .update({ ...inGameDoc,
          hostPicked: firebase.firestore.FieldValue.delete() , 
          visitorPicked: firebase.firestore.FieldValue.delete() 
        });
    } catch (error) {
      console.error(error);
    }
  }

  const copyLink = () => {
    var copyText = document.getElementById("roomLink");
    console.log("copyText",copyText)
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
     notifier.success("Link Copied!")
  }

  onMount(async () => {
    try {
      await db
        .collection("rooms")
        .doc($roomName)
        .update({ 
          hostInGame: false, visitorInGame: false,
          hostPicked: firebase.firestore.FieldValue.delete() , 
          visitorPicked: firebase.firestore.FieldValue.delete()
        });
    } catch (error) {
      console.error(error);
    }
  });
</script>
<style>
  .Tokens {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    justify-items: center;
    position: relative;
    gap: 30px 50px;
  }

  .Tokens .line {
    position: absolute;
    background: rgb(15,31,59);
    width: 200px;
    height: 14px;
    top: 58px;
    z-index: -1;
    display: block;
  }

  .Tokens .line:before,
  .Tokens .line:after {
    content: "";
    position: absolute;
    background: rgb(15,31,59);
    height: 14px;
    left: 0;
    top: 0;
    width: 200px;
  }

  .Tokens .line:before {
    transform: rotate(60deg);
    transform-origin: left top;
  }
  .Tokens .line:after {
    transform: rotate(-60deg);
    transform-origin: right top;
  }

  @media screen and (min-width: 768px) {
    .Tokens {
      gap: 50px 50px;
      margin: 0;
    }

    .Tokens .line {
      width: 300px;
      top: 90px;
    }

    .Tokens .line:before,
    .Tokens .line:after {
      width: 300px;
    }
  }

  @media screen and (min-width: 1024px) {
    .Tokens.picked {
      grid-template-columns: 320px 320px;
    }

    .Tokens.finished {
      grid-template-columns: 300px 110px 110px 300px;
    }

  }

</style>

<NotificationDisplay />
{#if $opponentName === undefined}
<div>
  <h3>Waiting for your opponent...</h3>
  <p>
    Room Link:  <input id="roomLink" type="text" value={window.location.href + "?r=" + $roomName}>
  </p>
  <Button on:click={copyLink} label="Copy Room Link" />
</div>
{:else}
  {#if !playerInGame}
    {#if opponentInGame}
      <div>
        <h3>Waiting for your opponent...</h3>
        <p>
          Room Link:  <input id="roomLink" type="text" value={window.location.href + "?r=" + $roomName}>
        </p>
        <Button on:click={copyLink} label="Copy Room Link" />
      </div>
    {:else}
      {#if $isHost}
        <Button on:click={handleStartGame} label="Start Game" />
      {:else}
        <h3>Waiting for host to start the game...</h3>
      {/if}
    {/if}
  {:else}
    <div class="Game">
      <div class="Tokens" class:picked={isUserTokenPicked} class:finished={gameFinished}>
        {#if isUserTokenPicked}
          <Token {...$userPicked} whoPicked="You" isWinner={gameFinished && win && !isDraw}/>
          <Token {...housePicked} whoPicked={$opponentName} isWinner={gameFinished && !win && !isDraw} {isChanging} isWaiting={waitingOpponentPick}/>
        {:else}
          <span class="line"></span>
          {#each tokens as item}
            <Token {...item}/>
          {/each}
        {/if}
        {#if gameFinished}
          <Result result={isDraw? "DRAW" : win ? "YOU WIN" : "YOU LOSE"} {handleReset} />
        {/if}
      </div>
    </div>
  {/if}
{/if}