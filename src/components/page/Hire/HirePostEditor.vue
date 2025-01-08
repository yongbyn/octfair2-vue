<template>
  <ContextBox>{{ !route.params.idx ? "공고 등록" : "공고 수정" }}</ContextBox>
  <div class="form-container">
    <table class="form-table">
      <tbody>
        <tr>
          <th>채용 제목<span class="font-red">*</span></th>
          <td colspan="3">
            <input
              type="text"
              id="title"
              placeholder="채용 제목을 입력하세요"
              v-model="postData.title"
            />
            <p v-if="validationErrors.title" class="textDanger">
              {{ validationErrors.title }}
            </p>
          </td>
        </tr>

        <tr>
          <th>경력 여부<span class="font-red">*</span></th>
          <td>
            <div class="checkbox-group-horizontal">
              <label>
                <input
                  type="checkbox"
                  value="신입"
                  :checked="postData.expRequired.includes('신입')"
                  @change="updateExpRequired('신입', $event)"
                />
                신입
              </label>
              <label>
                <input
                  type="checkbox"
                  value="경력"
                  :checked="postData.expRequired.includes('경력')"
                  @change="updateExpRequired('경력', $event)"
                />
                경력
              </label>
              <label>
                <input
                  type="checkbox"
                  value="경력무관"
                  :checked="postData.expRequired.includes('경력무관')"
                  @change="updateExpRequired('경력무관', $event)"
                />
                경력무관
              </label>
              <p v-if="validationErrors.expRequired" class="textDanger">
                {{ validationErrors.expRequired }}
              </p>
            </div>
          </td>
          <th>경력<span class="font-red">*</span></th>
          <td>
            <select
              id="expYears"
              v-model="postData.expYears"
              :disabled="!postData.expRequired.includes('경력')"
            >
              <option selected disabled>선택</option>
              <option value="1년이상">1년 이상</option>
              <option value="2년이상">2년 이상</option>
              <option value="3년이상">3년 이상</option>
              <option value="4년이상">4년 이상</option>
            </select>
            <p v-if="validationErrors.expYears" class="textDanger">
              {{ validationErrors.expYears }}
            </p>
          </td>
        </tr>

        <tr>
          <th>급여<span class="font-red">*</span></th>
          <td>
            <input
              type="text"
              id="salary"
              placeholder="급여를 입력하세요"
              v-model="postData.salary"
            />
            <p v-if="validationErrors.salary" class="textDanger">
              {{ validationErrors.salary }}
            </p>
          </td>
          <th>모집 인원<span class="font-red">*</span></th>
          <td>
            <input
              type="text"
              id="openings"
              placeholder="모집 인원을 입력하세요"
              v-model="postData.openings"
            />
            <p v-if="validationErrors.openings" class="textDanger">
              {{ validationErrors.openings }}
            </p>
          </td>
        </tr>
        <tr>
          <th>근무 지역<span class="font-red">*</span></th>
          <td>
            <input
              type="text"
              id="workLocation"
              placeholder="근무 지역을 입력하세요"
              v-model="postData.workLocation"
            />
            <p v-if="validationErrors.workLocation" class="textDanger">
              {{ validationErrors.workLocation }}
            </p>
          </td>
          <th>포지션 설명<span class="font-red">*</span></th>
          <td>
            <input
              type="text"
              id="posDescription"
              placeholder="포지션 설명을 입력하세요"
              v-model="postData.posDescription"
            />
            <p v-if="validationErrors.posDescription" class="textDanger">
              {{ validationErrors.posDescription }}
            </p>
          </td>
        </tr>
        <tr>
          <th>채용 기간<span class="font-red">*</span></th>
          <td colspan="3">
            <div class="hireDateGroup">
              <label>시작</label>
              <input type="date" id="startDate" v-model="postData.startDate" />
              <label>~ 종료</label>
              <input type="date" id="endDate" v-model="postData.endDate" />
            </div>
            <p v-if="validationErrors.hirePeriod" class="textDanger">
              {{ validationErrors.hirePeriod }}
            </p>
          </td>
        </tr>
        <tr>
          <th>채용 절차<span class="font-red">*</span></th>
          <td colspan="3">
            <div class="hiringProcText">
              <input
                type="text"
                id="hirProcess"
                placeholder="채용 절차를 입력 후 등록하세요"
                v-model="currentProc"
                @focus="clearCurrentProc"
              />
              <button id="btnHirProcess" @click="handlerHiringProc">
                절차등록
              </button>
              <button id="btnHirInit" @click="resetHiringProc">
                절차초기화
              </button>
            </div>
            <p v-if="validationErrors.hirProcess" class="textDanger">
              {{ validationErrors.hirProcess }}
            </p>
            <div>
              <p v-if="postData.hirProcess.length" class="postedHirProc">
                {{ postData.hirProcess }}
              </p>
              <p v-else class="textDanger">
                채용 절차에 대해 자세히 입력해주세요.
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <th>자격 조건<span class="font-red">*</span></th>
          <td colspan="3">
            <textarea
              id="reqQualifications"
              placeholder="자격 조건을 입력하세요"
              @input="autoHeight"
              v-model="postData.reqQualifications"
            ></textarea>
            <p v-if="validationErrors.reqQualifications" class="textDanger">
              {{ validationErrors.reqQualifications }}
            </p>
          </td>
        </tr>
        <tr>
          <th>우대 사항</th>
          <td colspan="3">
            <textarea
              id="prefQualifications"
              placeholder="우대 사항을 입력하세요"
              @input="autoHeight"
              v-model="postData.prefQualifications"
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>업무</th>
          <td colspan="3">
            <textarea
              id="duties"
              placeholder="업무 내용을 입력하세요"
              @input="autoHeight"
              v-model="postData.duties"
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>혜택 & 복지</th>
          <td colspan="3">
            <textarea
              id="benefits"
              placeholder="혜택 및 복지 내용을 입력하세요"
              @input="autoHeight"
              v-model="postData.benefits"
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>첨부파일</th>
          <td colspan="3">
            <label class="fileLabel" for="fileInput">파일 첨부하기(클릭)</label>
            <input
              type="file"
              id="fileInput"
              ref="fileInput"
              style="display: none"
              @change="handlerFileUpload"
            />

            <div class="fileInfo">
              <div v-if="postData.fileName">
                <label>{{ postData.fileName }}</label>
              </div>
              <div v-else>
                <label>{{
                  fileData ? fileData.name : "첨부된 파일 없음"
                }}</label>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="button-area">
      <button
        class="btn btn-primary"
        @click="!route.params.idx ? handlerPostCreate() : handlerPostUpdate()"
      >
        {{ !route.params.idx ? "등록" : "수정" }}
      </button>
      <button class="btn btn-secondary" @click="$router.go(-1)">
        돌아가기
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, watch } from "vue";

const router = useRouter();
const route = useRoute();
const postData = ref({ expRequired: [], expYears: "", hirProcess: "" });
const currentProc = ref("");
const fileData = ref("");
const validationErrors = ref({});

const validateField = (field, value) => {
  switch (field) {
    case "title":
      return value && typeof value === "string" && value.trim()
        ? ""
        : "채용 제목을 입력하세요.";
    case "expRequired":
      return value && Array.isArray(value) && value.length
        ? ""
        : "경력 여부를 선택하세요.";
    case "expYears":
      return postData.value.expRequired.includes("경력") &&
        (!value || !value.trim())
        ? "경력 연수를 선택하세요."
        : "";
    case "salary":
      return value && typeof value === "string" && !isNaN(Number(value.trim()))
        ? ""
        : "급여를 숫자로 입력하세요.";
    case "openings":
      return value && typeof value === "string" && Number(value.trim()) > 0
        ? ""
        : "모집 인원을 숫자로 입력하세요.";
    case "workLocation":
      return value && typeof value === "string" && value.trim()
        ? ""
        : "근무 지역을 입력하세요.";
    case "posDescription":
      return value && typeof value === "string" && value.trim()
        ? ""
        : "포지션 설명을 입력하세요.";
    case "hirePeriod":
      return postData.value.startDate && postData.value.endDate
        ? ""
        : "채용 기간을 설정하세요.";
    case "hirProcess":
      return postData.value.hirProcess && postData.value.hirProcess.trim()
        ? ""
        : "채용 절차를 등록하세요.";
    case "reqQualifications":
      return value && typeof value === "string" && value.trim()
        ? ""
        : "자격 조건을 입력하세요.";
    default:
      return "";
  }
};

const validateForm = () => {
  const errors = {};

  const fields = [
    "title",
    "expRequired",
    "expYears",
    "salary",
    "openings",
    "workLocation",
    "posDescription",
    "hirePeriod",
    "hirProcess",
    "reqQualifications",
  ];

  fields.forEach((field) => {
    errors[field] = validateField(field, postData.value[field]);
  });

  validationErrors.value = errors;

  // 유효하지 않은 필드가 있으면 false 반환
  return Object.values(errors).every((error) => !error);
};

const resetPostData = () => {
  postData.value = {
    expRequired: [],
    expYears: "",
    hirProcess: "",
    title: "",
    salary: "",
    openings: "",
    workLocation: "",
    posDescription: "",
    startDate: "",
    endDate: "",
    reqQualifications: "",
    prefQualifications: "",
    duties: "",
    benefits: "",
    fileName: "",
  };
};

const updateExpRequired = (value, event) => {
  const isChecked = event.target.checked;

  // expRequired가 배열인지 확인
  if (!Array.isArray(postData.value.expRequired)) {
    postData.value.expRequired =
      typeof postData.value.expRequired === "string"
        ? postData.value.expRequired.split(",")
        : [];
  }

  if (isChecked) {
    // 체크된 경우, 배열에 값 추가
    if (!postData.value.expRequired.includes(value)) {
      postData.value.expRequired.push(value);
    }
  } else {
    // 체크 해제된 경우, 배열에서 값 제거
    postData.value.expRequired = postData.value.expRequired.filter(
      (item) => item !== value
    );
  }
};

const resetHiringProc = () => {
  postData.value.hirProcess = "";
};

const clearCurrentProc = () => {
  currentProc.value = "";
};

const handlerHiringProc = () => {
  if (typeof postData.value.hirProcess !== "string") {
    postData.value.hirProcess = ""; // 초기에 문자열로 초기화 안하면 undefined오류 발생함
  }

  if (currentProc.value.trim() !== "") {
    // 현재 hirProcess가 비어 있거나 공백인 경우
    if (!postData.value.hirProcess || postData.value.hirProcess.trim() === "") {
      postData.value.hirProcess = currentProc.value.trim(); // 첫 값 추가
    } else {
      // 기존 값이 있을 경우 " → "로 연결
      postData.value.hirProcess += ` → ${currentProc.value.trim()}`;
    }

    currentProc.value = ""; // 입력 필드 초기화
  }
};

const hirePostSearchApi = async (idx) => {
  await axios
    .post("/prx/api/manage-hire/post-detail", { postIdx: idx })
    .then((res) => {
      postData.value = res.data.payload;

      if (typeof postData.value.expRequired === "string") {
        postData.value.expRequired = postData.value.expRequired.split(",");
      }

      if (!postData.value.hirProcess) {
        postData.value.hirProcess = "";
      }
    });
};

const handlerPostCreate = async () => {
  if (!validateForm()) {
    alert(Object.values(validationErrors.value).find((error) => error));
    return;
  }

  const textData = {
    ...postData.value,
    expRequired: Array.isArray(postData.value.expRequired)
      ? postData.value.expRequired.join(",")
      : "",
  };

  const formData = new FormData();
  fileData.value && formData.append("attachFile", fileData.value);
  formData.append(
    "postContent",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );
  await axios
    .post("/prx/api/manage-hire/post-new", formData)
    .then(
      (res) => console.log(res),
      alert("공고가 등록되었습니다."),
      resetPostData(),
      router.push({
        name: "hire-post",
      })
    )
    .catch((err) => console.log("err : ", err));
};

const handlerPostUpdate = async () => {
  if (!validateForm()) {
    alert(Object.values(validationErrors.value).find((error) => error));
    return;
  }

  const textData = {
    ...postData.value,
    expRequired: Array.isArray(postData.value.expRequired)
      ? postData.value.expRequired.join(",")
      : "",
    postIdx: route.params.idx,
    appStatus: "대기중",
  };

  const formData = new FormData();
  fileData.value && formData.append("attachFile", fileData.value);
  formData.append(
    "postContent",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );

  await axios
    .post("/prx/api/manage-hire/post-update", formData)
    .then((res) => console.log(res)),
    alert("공고가 수정되었습니다."),
    router.push({
      name: "hire-post",
    });
};

const handlerFileUpload = (e) => {
  const fileInfo = e.target.files;

  const fileInfoSplit = fileInfo[0].name.split(".");

  const fileExtension = fileInfoSplit[1].toLowerCase();

  fileData.value = fileInfo[0];
};

const autoHeight = (e) => {
  const textarea = e.target;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

onMounted(() => {
  if (!route.params.idx) {
    resetPostData();
  } else {
    hirePostSearchApi(route.params.idx);
  }
});

watch(
  () => route.params.idx,
  (newIdx) => {
    if (!newIdx) {
      resetPostData();
    } else {
      hirePostSearchApi(newIdx);
    }
  }
);
</script>

<style scoped>
.form-container {
  background-color: #f7f7f7;
  padding: 20px;
  margin: 0 auto;
  border-radius: 8px;
  max-width: 1200px;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  vertical-align: middle;
}

th {
  background-color: #eaeaea;
  font-weight: bold;
  text-align: center;
}

textarea,
input[type="text"],
select {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

input[type="date"] {
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

.checkbox-group-horizontal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.checkbox-group-horizontal label {
  white-space: nowrap; /* 가로 정렬 강제 */
}

.checkbox-group-horizontal input {
  resize: none;
}

.hireDateGroup {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.hireDateGroup label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hiringProcText {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}

.hiringProcText #hirProcess {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#hirProcessText {
  width: 60%;
  background-color: transparent;
  border-width: 0;
  justify-content: center;
}

.postedHirProc {
  padding-top: 1rem;
  text-align: center;
  word-break: break-word;
}

.textDanger {
  color: red;
  text-align: center;
}

textarea {
  resize: none;
}

button {
  padding: 6px 12px;
  margin: 5px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.font-red {
  color: #fe1414;
}

.button-area {
  text-align: center;
  margin-top: 20px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
