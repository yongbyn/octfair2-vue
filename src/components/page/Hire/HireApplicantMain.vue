<template>
  <div class="divPostList">
    <div class="topBtnArea">
      <h4 id="top-post-title">{{ selectedTitle }}</h4>
      <div class="select-container">
        <select
          id="post-title"
          v-model="selectedTitle"
          @change="updateHirProcess"
        >
          <option
            v-for="post in Mdetail"
            :key="post.postIdx"
            :value="post.title"
          >
            {{ post.title }}
          </option>
        </select>
        <select id="post-hir-Process" v-model="selectedProcesses">
          <option
            v-for="(process, index) in splitHirProcess"
            :key="index"
            :value="process"
          >
            {{ process }}
          </option>
        </select>
      </div>
    </div>
    <table>
      <colgroup>
        <col width="40%" />
        <col width="40%" />
        <col width="20%" />
      </colgroup>
      <thead>
        <tr>
          <td colspan="3">지원자 {{ applicantCount }}명</td>
        </tr>
      </thead>
      <tbody>
        <template v-if="applicantList.length > 0">
          <tr v-for="applicant in applicantList" :key="applicant.appId">
            <td>
              이름 : {{ applicant.name }} <br />
              이력서 :
              <span
                id="resume"
                style="cursor: pointer; font-weight: bold"
                @click="handlerModal(applicant.resIdx, applicant.loginId)"
                >{{ applicant.resTitle }} <br
              /></span>

              지원 날짜 : {{ applicant.applyDate }}
            </td>
            <td>
              학력 : {{ applicant.grdStatus }} <br />
              전화번호 : {{ applicant.phone }} <br />
              이메일 : {{ applicant.email }}
            </td>
            <template v-if="applicant.viewed === 1">
              <template v-if="applicant.status === '불합격'">
                <td>
                  <b-button
                    id="superPass"
                    @click="handlerSuperPass(applicant.loginId)"
                    >재심사</b-button
                  >
                </td>
              </template>
              <template v-else-if="applicant.status !== '최종합격'">
                <td>
                  <b-button id="pass" @click="handlerPass(applicant.loginId)">{{
                    selectedProcess ===
                    splitHirProcess[splitHirProcess.length - 3]
                      ? "합격"
                      : "통과"
                  }}</b-button>
                  <b-button id="fail" @click="handlerFail(applicant.loginId)"
                    >탈락</b-button
                  >
                </td>
              </template>
            </template>
            <template v-else> <td>이력서를 클릭해주세요.</td> </template>
          </tr>
        </template>
        <template v-else>
          <tr>
            지원자가 없습니다.
          </tr>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="applicantCount"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>

  <CommonModalFrame>
    <ResumeDetail :resIdx="resIdx" />
  </CommonModalFrame>
</template>

<script setup>
import axios from "axios";
import { useModalStore } from "../../../stores/modalState";
import { useUserInfo } from "../../../stores/userInfo";
import Pagination from "../../common/Pagination.vue";

const { user } = useUserInfo();
const cPage = ref(1);

const Mdetail = ref({});
const router = useRouter();
const selectedTitle = ref("");
const splitHirProcess = ref([]);
const selectedProcesses = ref([]);
const selectedProcess = ref("");
const applicantList = ref({});
const applicantCount = ref(0);
const resIdx = ref("");
const modalStore = useModalStore();

const searchList = async () => {
  const selectedPost = Mdetail.value.find(
    (post) => post.title === selectedTitle.value
  );

  const requestBody = {
    keyword: selectedProcess.value,
    loginId: user.loginId,
    postIdx: selectedPost.postIdx,
    firstProc: splitHirProcess.value[0],
    currentPage: cPage.value,
    pageSize: 5,
  };

  const result = await axios.post(
    "/prx/api/manage-hire/applicantList.do",
    requestBody
  );
  applicantList.value = result.data.list;
  applicantCount.value = result.data.count;
};

const getMdetail = async () => {
  const result = await axios.post("/prx/api/manage-hire/applicant.do", {
    loginId: user.loginId,
  });

  Mdetail.value = result.data.MDetail;

  if (Mdetail.value.length > 0) {
    // selectedTitle.value = Mdetail.value[0].title;
    splitHirProcess.value = Mdetail.value[0].hirProcess.split(" → ");
  }
};

const updateHirProcess = () => {
  const selectedPost = Mdetail.value.find(
    (post) => post.title === selectedTitle.value
  );

  if (selectedPost) {
    splitHirProcess.value = selectedPost.hirProcess.split(" → ");
    splitHirProcess.value.push("최종합격", "불합격");

    selectedProcesses.value = splitHirProcess.value[0] || [];
    // selectedProcess.value = selectedProcesses.value;
  } else {
    splitHirProcess.value = [];
    selectedProcesses.value = [];
    selectedProcess.value = "";
  }
};

const viewUpdateApi = async (loginId) => {
  const selectedPost = Mdetail.value.find(
    (post) => post.title === selectedTitle.value
  );
  const requestBody = { loginId: loginId, postIdx: selectedPost.postIdx };

  await axios
    .post("/prx/api/manage-hire/viewUpdate.do", requestBody)
    .then((res) => console.log(res));
};

const handlerModal = (idx, loginId) => {
  viewUpdateApi(loginId);
  modalStore.modalState = true;
  resIdx.value = idx;
  searchList();
};

const handlerPass = async (loginId) => {
  const selectedPost = Mdetail.value.find(
    (post) => post.title === selectedTitle.value
  );

  const currentIndex = splitHirProcess.value.indexOf(selectedProcess.value);
  const nextProcess =
    currentIndex < splitHirProcess.value.length - 1
      ? splitHirProcess.value[currentIndex + 1]
      : null;

  if (!nextProcess) alert("다음 채용과정이 없습니다.");

  const requestBody = {
    loginId: loginId,
    postIdx: selectedPost.postIdx,
    keyword: nextProcess,
  };
  const result = await axios.post(
    "/prx/api/manage-hire/statusUpdate.do",
    requestBody
  );
  if (result.data.result === "success") {
    if (nextProcess === "최종합격") {
      alert("합격 처리 되었습니다.");
    } else {
      alert("통과 처리 되었습니다.");
    }
    searchList();
  }
};

const handlerFail = async (loginId) => {
  const selectedPost = Mdetail.value.find(
    (post) => post.title === selectedTitle.value
  );

  const requestBody = {
    loginId: loginId,
    postIdx: selectedPost.postIdx,
    keyword: "불합격",
  };
  const result = await axios.post(
    "/prx/api/manage-hire/statusUpdate.do",
    requestBody
  );
  if (result.data.result === "success") {
    alert("불합격 처리 되었습니다.");
  }
  searchList();
};

const handlerSuperPass = async (loginId) => {
  const selectedPost = Mdetail.value.find(
    (post) => post.title === selectedTitle.value
  );

  const nextProcess = splitHirProcess.value[0];
  const requestBody = {
    loginId: loginId,
    postIdx: selectedPost.postIdx,
    keyword: nextProcess,
  };
  const result = await axios.post(
    "/prx/api/manage-hire/statusUpdate.do",
    requestBody
  );
  if (result.data.result === "success") {
    alert("재심사 처리 되었습니다.");
  }
  searchList();
};

watch(
  () => selectedProcesses.value,
  (newVal) => {
    selectedProcess.value = newVal;

    if (selectedTitle.value && selectedProcess.value) {
      searchList();
    }
  }
);

onActivated(() => {
  getMdetail();
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    // text-align: center;
  }

  thead {
    background-color: #2676bf;
    color: #ddd;
  }

  /* 이력서 올렸을 때 */
  .resume {
    cursor: pointer;

    &:hover {
      font-weight: bold;
      text-decoration: underline;
      color: blue;
    }
  }

  button {
    margin: 3px 6px;
  }
}

.topBtnArea {
  padding-top: 30px;
  display: flex;
  justify-content: space-between; /* 왼쪽-오른쪽으로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
}

.select-container {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

select {
  width: 100px;
}
</style>
