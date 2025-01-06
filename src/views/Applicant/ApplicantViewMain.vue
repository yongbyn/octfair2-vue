<template>
    <ApplicantSearch2/>
    <ApplicantBody/>
</template>
<script setup>


const provideVal=ref()
provide("provideVal",provideVal)
const provideMDVal=ref()
provide("provideMDVal",provideMDVal)
</script>
