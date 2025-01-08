<template>
     <ContextBox>지원자 관리</ContextBox>
    <ApplicantStatusSearch/>
    <ApplicantBody/>
</template>
<script setup>
const provideVal=ref()
provide("provideVal",provideVal)
const provideMDVal=ref()
provide("provideMDVal",provideMDVal)
</script>
