<div class="main">
  <div class="info center center-align">
    <h1 class="center-align">Haze</h1>

    <p>Haze is a fun text editor for everyone. (I had fun making it)</p>
    <div class="btns">
      <a href="https://github.com/bethropolis/haze-editor/" target="_blank">
        <button class="fill"> Github </button>
      </a>
    </div>
  </div>

  <div class="img" />
</div>

<style>
  .main {
    position: relative;
    height: 100%;
    display: grid;
    place-content: center;
  }
  .img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background-image: url(/public/img.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  h1 {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-family: sans-serif;
  }
</style>
