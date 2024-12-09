<template>
  <div class="navBar">
    <img src="../assets/Mealify_Color.png" width="30" height="30" class="logo">
    <h6 class="logo-text">Mealify</h6>
    <div class="nav-center">
      <ul class="nav-list">
        <li><router-link to="/recipes" class="hover-link" active-class="router-link-active">RECIPES</router-link></li>
        <li><router-link to="/recipe-generator" class="hover-link" active-class="router-link-active">RECIPE
            GENERATOR</router-link></li>
        <li><router-link to="/chefs" class="hover-link" active-class="router-link-active">CHEFS</router-link></li>
      </ul>
    </div>
    <div class="profile-dropdown">
      <img src="../assets/default_profile.jpg" alt="Profile" class="profile-icon" @click="toggleDropdown" />
      <ul v-if="isDropdownOpen" class="dropdown-menu">
        <li @click="goToProfile">Profile</li>

        <li @click="goToPreferences">Preferences</li>

        <li @click="handleAuth">Logout</li>
      </ul>
    </div>
    <button v-else @click="handleAuth" class="btn-login">
      Log In
    </button>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'vue-router';

const router = useRouter();


const isDropdownOpen = ref(false);
const isLoggedIn = ref(false);
const user = ref<any>(null);


const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};


const goToProfile = () => {
  console.log('Navigating to Profile...');
  router.push('/profile');
};


const goToPreferences = () => {
  console.log('Navigating to Preferences...');
  router.push('/preferences');
};


const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('authToken');
    isLoggedIn.value = false;
    user.value = null;
    console.log('User logged out');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};


const handleAuth = async () => {
  const token = localStorage.getItem('authToken');

  if (token) {

    logout();
  } else {

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;


      const idToken = await userData.getIdToken();


      localStorage.setItem('authToken', idToken);


      isLoggedIn.value = true;
      user.value = userData;

      const requestBody = {
        uid: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
      };

      const response = await fetch('http://localhost:3000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User logged in successfully', data);
      } else {
        console.error('Failed to log user in:', await response.text());
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      user.value = user;
    } else {
      isLoggedIn.value = false;
      user.value = null;
    }
  });
});
</script>



<style scoped>
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 25px;
  box-shadow: 0px 7px 7px rgb(38, 37, 34, 0.24);
  background-color: #F0EBE1;
  padding: 7px;
  max-width: 80%;
  margin: auto;
}

.logo {
  margin-left: 1%;
  margin-bottom: 0.5%;
  margin-right: auto;
}

.logo-text {
  margin-left: 8px;
  font-size: 13px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
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
  margin: 0;
  padding: 0;
}

.hover-link {
  position: relative;
  text-decoration: none;
  opacity: 0.6;
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

.router-link-active {
  color: black;
  opacity: 1;

}

.router-link-active::after {
  content: "";
  opacity: 1;
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #EE6352;
  transform: scaleX(1);
}

.profile-dropdown {
  position: relative;
  margin-right: 1%;
}

.profile-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-icon:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dropdown-menu {
  position: absolute;
  top: 35px;
  right: 0;
  background-color: #F0EBE1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 150px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* Light gray border */
}

.dropdown-menu li {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-menu li:hover {
  background-color: rgba(159, 220, 38, 0.3);
}

.dropdown-menu li:last-child {
  border-top: 1px solid #ddd;
}

.btn-login {
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 15px;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #357ae8;
}
</style>
