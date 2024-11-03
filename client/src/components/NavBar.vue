<script>

</script>

<template>
<div>
    <div class="navBar">
        <ul style="list-style-type: none;" class="nav-list">
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
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(195, 195, 195);
  border-radius: 25px; /* rounded corners */
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1); /* shadow effect */
  padding: 10px 20px; /* padding inside the navbar */
  background-color: #F0EBE1;
  width: 200%; /* makes the navbar just big enough for its content */
  margin: auto; /* centers the navbar on the page */
}

.nav-list {
  list-style-type: none; /* removes bullet points */
  padding: 0;
  margin: 0;
  display: flex; /* makes the list items horizontal */
  gap: 20px; /* space between items */
}

.hover-link {
  text-decoration: none;
  color: black;
  font-weight: medium; /* makes the text bold */
  font-size: small;
}

.hover-link:hover {
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-decoration-color: red;
  color: black;
  cursor: pointer;
}
</style>