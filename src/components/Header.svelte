<script>
  import {playerScore, opponentScore, playerName, opponentName} from '../store/store.js';
</script>
<style>
  p {
    margin: 0;
  }
  .Header {
    height: 17vh;
    padding: 3vh;
    padding-bottom: 0;
  }
  .Header-container {
    border: 3px solid hsl(217, 16%, 45%);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }

  .Header-title {
    padding: 24px;
    text-align: left;
  }

  .Header-title h1 {
    display:table-caption;
    font-weight: 700;
    font-size: 21px;
    line-height: 16px;
    box-shadow: 0 3px 3px 0 hsla(0, 0%, 0%, 0.2);
  }

  .Header-score-container {
    background-image: radial-gradient(hsl(0, 0%, 95.3%), hsl(0, 0%, 100%));
    border-radius: 4px;
    box-shadow: 0 3px 3px 0 hsla(0, 0%, 0%, 0.2);
    margin: 12px;
    padding: 10px 23px;
  }

  .Header-score-container span {
    color: hsl(229, 64.4%, 46.3%);
    font-weight: 600;
    font-size: 10px;
    letter-spacing: 1.56px;
    display: block;
  }
  .Header-score-container .score {
    font-weight: 700;
    font-size: 40px;
    line-height: 40px;
    color: hsl(246, 10.6%, 36.9%);
    margin: 0;
    letter-spacing: 0px;
    text-align: center;
  }

  .Header-score {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 440px) {
    .Header-score-container {
      padding: 10px 8px;
    }
  }
  @media screen and (min-width: 768px) {
    .Header {
      display: inline-block;
      min-width: 700px;
      /* padding: 48px 0px; */
    }

    .Header-container {
      border-radius: 15px;
    }

    .Header-title h1 {
      font-size: 30px;
      line-height: 25px;
    }

    .Header-score-container {
      padding: 15px 40px;
      border-radius: 6px;
      margin: 15px 20px;
    }

    .Header-score-container .score {
      font-size: 55px;
      line-height: 55px;
    }

    .Header-score-container span {
      font-size: 13px;
      letter-spacing: 2px;
    }
  }

  /* @media screen and (min-width: 1024px) {
    .Header {
      padding: 48px 0px 0px 0px;
    }
  } */
</style>
<div class="Header">
  <div class="Header-container">
    <div class="Header-title">
      <h1>ROCK PAPER SCISSORS</h1>
    </div>
    <div class="Header-score">
      <div class="Header-score-container">
        <span><p>YOUR</p> SCORE</span>
        <p class="score">{$playerScore}</p>
      </div>
      <div class="Header-score-container">
        <span><p>OPPONENT</p> SCORE</span>
        <p class="score">{$opponentScore}</p>
      </div>
    </div>
  </div>
</div>