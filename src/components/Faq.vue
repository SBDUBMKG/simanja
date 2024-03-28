<template>
    <article class="question">
        <header>
            <h5 @click="expanded = !expanded" class="question-title">
            {{ title }}
            </h5>
            <button class="btn" @click="expanded = !expanded">
                <svg v-show="expanded" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" ></path></svg>
                <svg v-show="!expanded" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" ></path></svg>
            </button>
        </header>
      <div :style="contentStyle" class="content">
        <p :style="infoStyle" class="info">{{ info }}</p>
      </div>
    </article>
</template>
  
<script>
import { ref, computed } from "vue";
  
export default {
    name: "FaqComponent",
    props: {
        title: String,
        info: String,
    },
    setup() {
        const expanded = ref(false)
        const contentStyle = computed(() => {
            return { "max-height": expanded.value ? "150px" : 0 }
        })
  
        const infoStyle = computed(() => {
            return { opacity: expanded.value ? 1 : 0 }
        })
  
        return { expanded, contentStyle, infoStyle }
    }
}
</script>
  
<style scoped>
  .question {
    padding: 1rem 1.5rem;
    border: 2px solid #eae6eb;
    margin-bottom: 1rem;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  .question h5 {
    text-transform: none;
    line-height: 1.5;
    color: hsl(209, 61%, 16%);
  }
  .question p {
    color: hsl(209, 34%, 30%);
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
  .question header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .question header h5 {
    margin-bottom: 0;
  }
  .btn {
    background: transparent;
    border-color: transparent;
    width: 2rem;
    height: 2rem;
    background: #eae6eb;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #b4345c;
    cursor: pointer;
    margin-left: 1rem;
    align-self: center;
    min-width: 2rem;
    z-index: 1;
    padding: 5px;
  }
  
  .question-title {
    cursor: pointer;
  }
  
  .content {
    max-height: 0;
    transition: max-height 0.5s ease-out;
  }
  .info {
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
</style>
  