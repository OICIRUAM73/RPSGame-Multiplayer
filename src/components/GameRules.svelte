<script>
  import { showModal } from '../store/store.js';
  import GameRulesImage from '../../public/images/image-rules.svg';
  import GameRulesClose from '../../public/images/icon-close.svg';
  let handleClick = () => showModal.update(current => !current);
</script>
<style>
  .Share {
    position: fixed;
    background-color: white;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 9;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;
    background: white;
    padding: 4em 0px;
  }

  h2 {
    font-size: 32px;
    font-weight: 700;
    line-height: 32px;
    color: hsl(229, 24.8%, 30.8%);
  }
  
  .close {
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    .Share {
      border-radius: 8px;
      background-color: white;
      width: 336px;
      height: 352px;
      position: fixed;
      z-index: 9;
      padding: 32px;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-200px, -208px);
    }

    h2 {
      text-align: left;
    }

    .rules {
      margin-top: 55px;
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 38px;
      margin-right: 32px;
    }
  }

</style>

<div class="Share">
  <h2>RULES</h2>
  <img class="rules" src={GameRulesImage} alt="">
  <img class="close" src={GameRulesClose} alt="" on:click={handleClick}>
</div>