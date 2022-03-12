<template>
    <!-- 为了图片横着拉 -->
    <div class="swiper">
        <div class="swiper-wrapper">
            <!-- 插槽（坑） -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
    mounted() {
        this.$nextTick(() => {
            new Swiper(".swiper", {
                slidesPerView: 4,
            });
        });
    },
};
</script>