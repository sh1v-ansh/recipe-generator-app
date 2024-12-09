<template>
    <div class="profile-card">
        <div class="profile-image">
            <img src="https://picsum.photos/id/102/300/200" alt="Profile Image" class="profile-image" />
        </div>
        <div class="profile-content">
            <div class="profile-picture-container">
                <img src="https://cdn.studioramsay.com/uploads/_1000x1000_crop_center-center_none/GRBlueTshirt-modified_2021-12-09-233128_yyzl.jpeg?v=1729864532" alt="Profile" class="profile-picture" />
            </div>
            <h3 class="profile-title">{{ name }}</h3>
            <p class="profile-description">{{ description }}</p>
            <div class="profile-footer">
                <button class="view-button">View Profile</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
defineProps({
    profileId: String,
    name: String,
    description: String,
    background: String, //Background image for the card
    profilePicture: String, //Circular profile image
});
</script>

<style scoped>
.profile-card {
    display: flex;
    position: relative;
    width: 427px;
    height: 360px;
    flex-direction: column;
    background-color: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.profile-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.profile-picture-container {
    position: absolute;
    left: 16%;
    transform: translate(-50%, -80%); 
    z-index: 10; 
}

.profile-picture {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
}

.profile-content {
    padding: 15px;
    text-align: left;
    position: relative;
    height: 50%;
}

.profile-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
}

.profile-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
}

.profile-footer {
    display: flex;
    justify-content: right;
    padding: 8px 15px;
}

.view-button {
    background-color: transparent;
    border: 1.5px solid #262522;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    color: #262522;
    right: 15px;
    padding: 12px 24px;
    cursor: pointer;
    text-transform: uppercase;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.view-button:hover {
    background-color: #9FDC26;
}
</style>
  