<template>

    <ApplicantSearch />
    <ApplicantMain/>

</template>
<script setup>
import ApplicantSearch from "../../components/page/Applicant/ApplicantSearch.vue";
import ApplicantMain from "../../components/page/Applicant/ApplicantMain.vue";    

import { provide ,ref} from "vue";

const proValue=ref();

provide("proValue",proValue)
    
    

</script>
