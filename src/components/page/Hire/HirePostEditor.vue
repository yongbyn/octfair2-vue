<template>
  <ContextBox>공고등록</ContextBox>
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
            />
          </td>
        </tr>

        <!-- 경력 여부와 경력 -->
        <tr>
          <th>경력 여부<span class="font-red">*</span></th>
          <td>
            <div class="checkbox-group-horizontal">
              <label>
                <input type="checkbox" name="expRequired" value="신입" />
                신입
              </label>
              <label>
                <input type="checkbox" name="expRequired" value="경력" />
                경력
              </label>
              <label>
                <input type="checkbox" name="expRequired" value="경력무관" />
                경력무관
              </label>
            </div>
          </td>
          <th>경력<span class="font-red">*</span></th>
          <td>
            <select id="expYears">
              <option value="1년이상">1년 이상</option>
              <option value="2년이상">2년 이상</option>
              <option value="3년이상">3년 이상</option>
              <option value="4년이상">4년 이상</option>
            </select>
          </td>
        </tr>

        <tr>
          <th>급여<span class="font-red">*</span></th>
          <td>
            <input type="text" id="salary" placeholder="급여를 입력하세요" />
          </td>
          <th>모집 인원<span class="font-red">*</span></th>
          <td>
            <input
              type="text"
              id="openings"
              placeholder="모집 인원을 입력하세요"
            />
          </td>
        </tr>
        <tr>
          <th>근무 지역<span class="font-red">*</span></th>
          <td>
            <input
              type="text"
              id="workLocation"
              placeholder="근무 지역을 입력하세요"
            />
          </td>
          <th>포지션 설명<span class="font-red">*</span></th>
          <td>
            <input
              type="text"
              id="posDescription"
              placeholder="포지션 설명을 입력하세요"
            />
          </td>
        </tr>
        <tr>
          <th>채용 기간<span class="font-red">*</span></th>
          <td colspan="3">
            <div class="hireDateGroup">
              <label>시작</label>
              <input type="datetime-local" id="startDate" />
              <label>~ 종료</label>
              <input type="datetime-local" id="endDate" />
            </div>
          </td>
        </tr>
        <tr>
          <th>채용 절차<span class="font-red">*</span></th>
          <td colspan="3">
            <div class="hiringProcText">
              <input
                type="text"
                id="hirProcess"
                placeholder="과정을 입력하세요"
              />
              <button id="btnHirProcess">절차등록</button>
              <button id="btnHirInit">절차초기화</button>
            </div>
          </td>
        </tr>
        <tr>
          <th>자격 조건<span class="font-red">*</span></th>
          <td colspan="3">
            <textarea
              id="reqQualifications"
              placeholder="자격 조건을 입력하세요"
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>우대 사항</th>
          <td colspan="3">
            <textarea
              id="prefQualifications"
              placeholder="우대 사항을 입력하세요"
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>업무</th>
          <td colspan="3">
            <textarea
              id="duties"
              placeholder="업무 내용을 입력하세요"
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>혜택 & 복지</th>
          <td colspan="3">
            <textarea
              id="benefits"
              placeholder="혜택 및 복지 내용을 입력하세요"
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>첨부파일</th>
          <td colspan="3">
            <input type="file" id="fileName" />
            <button id="btnDeleteFile">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="button-area">
      <button class="btn btn-primary">등록</button>
      <button class="btn btn-secondary">돌아가기</button>
    </div>
  </div>
</template>

<script setup></script>

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
}

input[type="datetime-local"] {
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
  gap: 20px;
}

.checkbox-group-horizontal label {
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap; /* 가로 정렬 강제 */
}

.hireDateGroup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 14px; /* 작게 표시 */
}

.hiringProcText {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px; /* 작게 표시 */
}

.hiringProcText #hirProcess {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
