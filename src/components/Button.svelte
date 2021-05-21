<script>
  export let label;
  export let classes;
</script>

<style>
  .span-2 {
    grid-column: 1 / span 2;
  }

  .w-full {
    width: 100%;
  }
  
  .self-center {
    justify-self: center;
  }
  
  .self-right {
    justify-self: end;
  }
  
  button {
    margin-bottom: 30px;
  }
  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    padding: 10px;
    background: #1f3757;
    border: 2px solid #15263c;
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
  }

  button::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #354b67;
    border-radius: inherit;
    box-shadow: 0 0 0 2px #15263c;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }

  button:hover {
    background: #15263c;
    transform: translate(0, 0.25em);
  }

  button:hover::before {
    box-shadow: 0 0 0 2px #15263c;
    transform: translate3d(0, 0.5em, -1em);
  }

  button:active {
    background: #15263c;
    transform: translate(0em, 0.75em);
  }

  button:active::before {
    box-shadow: 0 0 0 2px #15263c;
    transform: translate3d(0, 0, -1em);
  }
</style>

<button class={classes} on:click>{label}</button>