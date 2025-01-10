<template>
  <button @click="getResumeFnc">이력서정보 내놔</button>
  <template v-if="isSuccess">
    {{ fullInfo.careerList }}
    <div class="resumeWrapper">
      <div class="resumeArea">
        <div class="resumeAreaGrid1">
          <div class="sameLeftCss">
            <h3>Experience</h3>
            <div class="sectionArea">
              <template v-if="fullInfo.careerList == 0">
                <div class="defaultList" v-for="idx in 3" :key="idx">
                  비고:{{ idx }}
                </div>
              </template>
            </div>
          </div>

          <div class="sameLeftCss">
            <h3>Education</h3>
            <div class="sectionArea">
              <template v-if="fullInfo.educationList == 0">
                <div class="defaultList" v-for="idx in 3" :key="idx">
                  비고:{{ idx }}
                </div>
              </template>
            </div>
          </div>

          <div class="sameLeftCss">
            <h3>Skill</h3>
            <div class="sectionArea">
              <template v-if="fullInfo.skillList == 0">
                <div class="defaultList" v-for="idx in 3" :key="idx">
                  비고:{{ idx }}
                </div>
              </template>
            </div>
          </div>

          <div class="sameLeftCss"></div>

          <div class="sameLeftCss"></div>
        </div>
        <div class="resumeAreaGrid2">
          <div class="sameRightCss applicantImgae">
            <div>
              <img :src="sadd" />
            </div>
            <h5>이름 : {{ fullInfo.resume.userNm }}</h5>
          </div>
          <div class="addressArea">
            <div class="sameRightCss">
              <h3>ABout Me</h3>
              <h5>{{ fullInfo.resume.resTitle }}</h5>
            </div>
            <div class="sameRightCss">
              <h3>Concat</h3>
              <h5>{{ fullInfo.resume.phone }}</h5>
              <h5>{{ fullInfo.resume.email }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useApplicantResumeListQuery } from "../../../hook/Applicant/useApplicantResumeListQuery";
import sadd from "../../../ImageApplicant/saddfrog.jpg";

const { params } = useRoute();

const resIdx = params.resIdx;

const fullInfo = ref({});

const { data: resumeFullList, isSuccess } = useApplicantResumeListQuery(resIdx);

const getResumeFnc = async () => {
  let res1;
  let res2;
  let res3;
  let res4;
  try {
    res1 = await axios.post("/prx/api/apply/resumeDetail", {
      resIdx: params.resIdx,
    });
    res2 = await axios.post("/prx/api/apply/careerList", {
      resIdx: params.resIdx,
    });
    res3 = await axios.post("/prx/api/apply/educationList", {
      resIdx: params.resIdx,
    });
    res4 = await axios.post("/prx/api/apply/skillList", {
      resIdx: params.resIdx,
    });

    fullInfo.value.resume = res1.data.payload;
    fullInfo.value.careerList = res2.data.payload;
    fullInfo.value.educationList = res3.data.payload;
    fullInfo.value.skillList = res4.data.payload;
  } catch (err) {
    //데이터는 모두 한번에 정확히 와야한다. 실패하면 리패치 함수를 추가한다.
  }
};
</script>

<style scoped>
.resumeWrapper {
  max-width: 986px;
  height: 100vh;

  display: flex;
  justify-content: center;
}

.resumeArea {
  width: 95%;
  height: 100%;
  padding: 20px 20px;

  display: grid;
  grid-template-columns: 55% 45%;
}

.resumeAreaGrid1 {
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.resumeAreaGrid2 {
  width: 100%;
  background: #ebebeb;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

img {
  border-radius: 40px 40px 40px 40px;
  width: 60%;
  height: 100%;
}

.applicantImgae {
  width: 100%;
  height: 30%;
  text-align: center;
}

.sameRightCss {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
}

.sectionAreaa {
  padding-left: 20px;
}

.defaultList {
  padding: 20px 20px;
  font-size: 20px;
  font-weight: 500;
}

.ex01 {
  box-shadow: 5px 5px gray;
}

.resumeWrapper {
  box-shadow: 5px 5px 5px gray;
  box-shadow: inset 5px 5px 5px gray;
}
</style>
