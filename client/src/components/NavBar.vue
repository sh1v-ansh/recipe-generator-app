<script>

</script>

<template>
  <div class="navBar">
    <img src="../assets/Mealify_Color.png" width="30" height="30" class="logo" style="margin-left: 1%; margin-bottom: 0.5%;">
    <h6 style="margin-left: 8px; font-size: 13px; margin-top: 0; margin-bottom: 0; padding: 0;">Mealify</h6>
    <div class="nav-center" style="width: 100%;">
      <ul class="nav-list">
        <li><a class="hover-link">HOME</a></li>
        <li><a class="hover-link">RECIPES</a></li>
        <li><a class="hover-link">RECIPE GENERATOR</a></li>
        <li><a class="hover-link">CHEFS</a></li>
      </ul>
    </div>
  </div>
</template>

<style>
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 25px;
  box-shadow: 0px 7px 7px rgb(170, 170, 170);
  background-color: #F0EBE1;
  padding: 7px;
  max-width: 80%;
  margin: auto;
}

.logo {
  margin-right: auto;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  list-style-type: none;
  display: flex;
  gap: 20px;
  margin: 0 auto; /* Centers the nav list */
  padding: 0;
}

.hover-link {
  position: relative;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: small;
  cursor: pointer;
}

.hover-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #EE6352;
  opacity: 0;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  transform: scaleX(0);
  transform-origin: center;
}

.hover-link:hover::after {
  opacity: 1;
  transform: scaleX(1);
}
</style>