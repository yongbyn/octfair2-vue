<template>
    
  <QnaSerchWrite />
  <QnaMain />
</template>

<script setup>
import QnaSerchWrite from "../../components/page/Qna/QnaSerchWrite.vue";

import QnaMain from "../../components/page/Qna/QnaMain.vue";
const providedValue = ref();
const providedChangeType=ref();
provide("providedQnaValue", providedValue);
provide("providedChangeType", providedChangeType);
</script>
