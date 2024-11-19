<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="logo-section">
              <img src="../assets/Mealify_BW.png" width="30" height="30" class="logo" />
              <span class="brand-name">Mealify</span>
            </div>
            <nav class="footer-nav">
              <li class="nav-item"><router-link to="/recipes" class="hover-link-footer">RECIPES</router-link></li>
              <li class="nav-item"><router-link to="/recipe-generator" class="hover-link-footer">RECIPE GENERATOR</router-link></li>
              <li class="nav-item"><router-link to="/chefs" class="hover-link-footer">CHEFS</router-link></li>
            </nav>
        </div>
        <div class="copyright">
          Group 8 CS320 project - 2024 Mealify.
        </div>
    </footer>
</template>

<script>
export default {
  name: "footerBar",
};
</script>

<style scoped>
.router-link-active {
  color: #262522;
  opacity: 1;
}

.footer {
  background-color: #262522;
  color: #F0EBE1; 
  padding: 24px 0px 24px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 32px;
  margin: 0px 55px 0px 55px;
}

.footer-container {
  position: relative;
  width: 90%;
  max-width: 1200px;
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.brand-name {
  font-size: 13px;
  color: F0EBE1;
}

.footer-nav {
  display: flex; 
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  gap: 20px; 
  list-style: none; 
}

.nav-item {
  display: flex;
  align-items: center; 
  font-size: 16px;
}

.nav-item:not(:last-child)::after {
  content: "";
  height: 100%;
  opacity: 0.18;
  width: 1px;
  background-color: rgba(240, 235, 225, 0.6); 
  margin-left: 10px;
}

.hover-link-footer {
  color: #F0EBE1;
  text-decoration: none;
  font-weight: bold;
  font-size: small;
  text-decoration: none;
  transition: color 0.3s;
}

.hover-link-footer:hover {
  color: rgba(159, 220, 38, 1);
}

.copyright {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  width: 100%;
  border-top: 1px solid rgb(240, 235, 225, 0.18);
  opacity: 0.60;
  gap: 15px;
  padding-top: 10px;
}
</style>