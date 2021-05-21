<script>
  export let result;
  export let handleReset;
</script>
<style>
  .result-container {
    text-align: center;
    margin-top: 50px;
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .result {
    font-size: 56px;
    text-align: center;
  }

  .play-again {
    border-radius: 8px;
    padding: 15px 60px;
    margin-top: 16px;
    border: none;
    background: linear-gradient(hsl(0, 0%, 95.3%), hsl(0, 0%, 100%));
    cursor: pointer;
  }

  .play-again:focus {
    outline: 0;
  }

  .play-again span {
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1px;
    color: hsl(229, 24.8%, 30.8%);
  }

  @media screen and (min-width: 1024px) {
    .result-container {
      grid-column: 2 / 4;
      grid-row: 1 / auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
</style>
<div class="result-container">
  <div class="result"><span>{result}</span></div>
  <button class="play-again" on:click={handleReset}><span>PLAY AGAIN</span></button>
</div>