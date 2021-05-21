<script>
  import Hashids from 'hashids';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications/src'
  import Button from "./Button.svelte";
  import { playerName, roomName, isHost, opponentName } from '../store/store.js';
  import { db } from "../firebase.js";

  let name;
  let joinRoomName;

  function handlePlayerNameSubmit() {
    if(name) {
      name = name.trim();
      if (name == '') {
        notifier.danger("Your username is empty!")
        return;
      }
      $playerName = name;
    } else {
      notifier.danger("Your username is empty!")
    }
  }

  const handleCreateRoom = async () => {
    try {
      var hashids = new Hashids($playerName, 8)
      let roomNameToCreate = hashids.encode(1, 2);
      
      await db
        .collection("rooms")
        .doc(roomNameToCreate)
        .set({ hostName: $playerName, hostScore: 0, createdAt: Date.now() });
      $isHost = true;
      $roomName = roomNameToCreate;
      console.log("Room created: ", $roomName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinRoomSubmit = async () => {
    if(joinRoomName) {
      joinRoomName = joinRoomName.trim();
      if (joinRoomName == '') {
        notifier.danger("The room name is empty!")
        return;
      }
      try {
        await db
          .collection("rooms")
          .doc(joinRoomName)
          .update({ visitorName: $playerName, visitorScore: 0, modifiedAt: Date.now() });
        $isHost = false;
        $roomName = joinRoomName;
      } catch (error) {
        console.log(error.code);
        console.error(error);
        if(error.code = "not-found") {
          console.log("room not found!!");
        }
      }
    } else {
      notifier.danger("The room name is empty!")
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
  }
  
  .options-container {
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    grid-column-gap: 30px;
    grid-row-gap: 10px;
    margin-top: 20px;
  }

  .span-2 {
    grid-column: 1 / span 2;
  }
  
  input {
    margin-bottom: 30px;
  }

  input {
    height: fit-content;
    align-self: center;
    border-radius: 0.75em;
    border: 0;
    padding: 10px;
    transform: translateY(5px);
  }

  input:focus {
    outline: 0;
  }
</style>

<NotificationDisplay />
<div class="container">
  <h1>Hi {$playerName}</h1>
  <div class="options-container">
    <label for="name" class="span-2">You can change your username:</label>
    <input id="name" autocomplete="off" placeholder="Type your username here..." bind:value={name} />
    <Button classes="self-right w-full" on:click={handlePlayerNameSubmit} label="Change Name" />
    <label for="room" class="span-2">You can join to a game room:</label>
    <input id="room" autocomplete="off" placeholder="Type room name here..." bind:value={joinRoomName} />
    <Button classes="self-right w-full" on:click={handleJoinRoomSubmit} label="Join Room" />
    <Button classes="span-2 self-center" on:click={handleCreateRoom} label="Create Room" />
  </div>
</div>

