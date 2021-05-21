<script>
  import { isHost, userPicked, scoreCount, roomName } from '../store/store.js';
  import { db } from "../firebase.js";

  export let imgSource;
  export let name;
  export let winTo;
  export let whoPicked = undefined;
  export let isWinner;
  export let isChanging;
  export let isWaiting;

  const handleClick = async () => {
    if($userPicked.name == undefined) {
      userPicked.update(current => {
        current.name = name
        current.imgSource = imgSource
        current.winTo = winTo
        return current
      });
      try {
        let doc = $isHost? {hostPicked: name} : {visitorPicked: name}
        await db
          .collection("rooms")
          .doc($roomName)
          .update(doc);
      } catch (error) {
        console.error(error);
      }
    }
  } 
</script>
<style>
  .Token {
    cursor: pointer;
  }

  .Token.rock.not-selected {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .Token-circle {
    width: 130px;
    height: 125px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .Token-inner-circle {
    width: 100px;
    height: 95px;
    background: hsl(0, 0%, 95.3%);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -5.88px 0px 0px hsl(228, 23.2%, 78%);
    margin-top: 6.88px;
  }

  .Token.paper .Token-circle {
    background: hsl(230, 89%, 65%);
    box-shadow: 0px 5.88px 0px 0px hsl(229, 64.4%, 46.3%);
  }
  
  .Token.not-selected.paper .Token-circle:hover {
    box-shadow: 0px 5.88px 0px 0px hsl(229, 64.4%, 46.3%),
      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;
  }

  .Token.scissors .Token-circle {
    background: hsl(40, 84%, 53%);
    box-shadow: 0px 5.88px 0px 0px hsl(28, 76.1%, 44.3%);
  }
  
  .Token.not-selected.scissors .Token-circle:hover {
    box-shadow: 0px 5.88px 0px 0px hsl(28, 76.1%, 44.3%),
    rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;
  }

  .Token.rock .Token-circle {
    background: hsl(349, 70%, 56%);
    box-shadow: 0px 5.88px 0px 0px hsl(347, 75.4%, 35.1%);
  }
  
  .Token.not-selected.rock .Token-circle:hover {
    box-shadow: 0px 5.88px 0px 0px hsl(347, 75.4%, 35.1%),
      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;
  }

  .Token.empty .Token-inner-circle  {
    background: hsla(0, 0%, 0%, 0.1);
    box-shadow: none;
  }

  .Token.winner .Token-circle {
    box-shadow: rgba(255, 255, 255, 0.04) 0px 0px 0px 20px, 
      rgba(255, 255, 255, 0.04) 0px 0px 0px 50px,
      rgba(255, 255, 255, 0.02) 0px 0px 0px 80px;
    animation-name: animate;
    animation-duration: 600ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
  }

  .Token-circle.animate  {
    animation-name: animate;
    animation-duration: 1000ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite
  }
  
  .label {
    text-align: center;
    margin-top: 23px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1.88px;
    line-height: 32px;
  }

  @media screen and (min-width: 768px) {
    .Token-circle {
      width: 198px;
      height: 194px;
    }

    .Token-inner-circle {
      width: 152px;
      height: 144px;
    }

    .Token-icon {
      width: 70px;
    }

    .Token-inner-circle {
      box-shadow: 0px -9px 0px 0px hsl(228, 23.2%, 78%);
    }

    .Token.paper .Token-circle {
      box-shadow: 0px 9px 0px 0px hsl(229, 64.4%, 46.3%);
    }
    
    .Token.not-selected.paper .Token-circle:hover {
      box-shadow: 0px 9px 0px 0px hsl(229, 64.4%, 46.3%),
        rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;
    }

    .Token.scissors .Token-circle {
      box-shadow: 0px 9px 0px 0px hsl(28, 76.1%, 44.3%);
    }
    
    .Token.not-selected.scissors .Token-circle:hover {
      box-shadow: 0px 9px 0px 0px hsl(28, 76.1%, 44.3%),
      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;
    }

    .Token.rock .Token-circle {
      box-shadow: 0px 9px 0px 0px hsl(347, 75.4%, 35.1%);
    }
    
    .Token.not-selected.rock .Token-circle:hover {
      box-shadow: 0px 9px 0px 0px hsl(347, 75.4%, 35.1%),
        rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;
    }
  }

  @media screen and (min-width: 1024px) {
    .Token.selected .Token-circle {
      width: 292px;
      height: 287px;
    }

    .Token.selected .Token-inner-circle {
      width: 225px;
      height: 212px;
    }
    
    .Token.selected .Token-icon {
      width: 100px;
    }

    .Token.selected {
      display: flex;
      flex-direction: column-reverse;
    }

    .label {
      font-size: 24px;
      margin-bottom: 60px;
    }

    .Token.selected .Token-inner-circle {
      box-shadow: 0px -13.3px 0px 0px hsl(228, 23.2%, 78%);
    }

    .Token.paper.selected .Token-circle {
      box-shadow: 0px 13.3px 0px 0px hsl(229, 64.4%, 46.3%);
    }
 
    .Token.scissors.selected .Token-circle {
      box-shadow: 0px 13.3px 0px 0px hsl(28, 76.1%, 44.3%);
    }
    
    .Token.rock.selected .Token-circle {
      box-shadow: 0px 13.3px 0px 0px hsl(347, 75.4%, 35.1%);
    }

    .Token.winner .Token-circle {
      box-shadow: rgba(255, 255, 255, 0.04) 0px 0px 0px 50px, 
      rgba(255, 255, 255, 0.04) 0px 0px 0px 100px,
      rgba(255, 255, 255, 0.02) 0px 0px 0px 160px !important;
    }

  }

  .question-mark {
    font-size: 80px;
  }

  @keyframes animate {
    0% {
      transform: rotateY(0);
    }

    25% {
      transform: rotateY(90deg);
    }

    50% {
      transform: rotateY(180deg);
    }
    
    75% {
      transform: rotateY(270deg);
    }

    100% {
      transform: rotateY(360deg);
    }
  }
</style>
<div class="Token {name? name : "empty"} {whoPicked? "selected" : "not-selected"}" 
  class:winner={isWinner} on:click={handleClick}>
  <div class="Token-circle" class:animate={isChanging}>
    <div class="Token-inner-circle">
      {#if isWaiting}
        <span class="question-mark">?</span>
      {:else}
        <img src={imgSource} alt="" class="Token-icon">
      {/if}
    </div>
  </div>
  {#if whoPicked != undefined}
    <div class="label">
      {isWaiting? `WAITING FOR ${whoPicked} PICK` : `${whoPicked} PICKED`}
    </div>
  {/if}
</div>