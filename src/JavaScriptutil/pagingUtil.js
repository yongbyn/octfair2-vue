// 한페이지당 5개의 게시글을 보여 주어야 한다.
// totalRows 는 백에서 받는 걸로 계속 똑같은 총 로우수이다.
export const paginCalculation = (
  currentPage,
  totalCount,
  pageRow,
  blockPage,
  pageFunc,
  exParams
) => {
  console.log(`  currentPage:  ${currentPage}  
totalCount: ${totalCount} 
pageRow: ${pageRow}
blockPage: ${blockPage} 
pageFunc: ${pageFunc}
exParams: ${exParams} `);

  totalCount = parseInt(totalCount);

  pageRow = parseInt(pageRow);
  blockPage = parseInt(blockPage);

  var totalPage = Math.ceil(totalCount / pageRow);
  if (totalPage == 0) {
    totalPage = 1;
  }

  // 현재 페이지가 전체 페이지 수보다 크면 전체 페이지 수로 설정
  if (currentPage > totalPage) {
    currentPage = totalPage;
  }

  // 현재 페이지의 처음과 마지막 글의 번호 가져오기.
  var startCount = (currentPage - 1) * pageRow;
  var endCount = startCount + pageRow;

  // 시작 페이지와 마지막 페이지 값 구하기.
  let startPage = Math.floor((currentPage - 1) / blockPage) * blockPage + 1;
  let endPage = startPage + blockPage - 1;

  // 마지막 페이지가 전체 페이지 수보다 크면 전체 페이지 수로 설정
  if (endPage > totalPage) {
    endPage = totalPage;
  }

  console.log(`  startPage:  ${startPage}  endPage: ${endPage}  `);

  // 추가 파라미터가 있는 경우 함수 호출 파라미터로 적용
  // var sExParam = exParams == undefined ? "" : ',"' + exParams.join('","') + '"';

  // var pagingHtml = "<div class='paging'>";
  // pagingHtml +=
  //   "<a class='first' href='javascript:" +
  //   pageFunc +
  //   "(1" +
  //   sExParam +
  //   ")'><span class='hidden'>맨앞</span></a>";
  // pagingHtml +=
  //   "<a class='pre' href='javascript:" +
  //   pageFunc +
  //   "(" +
  //   (startPage - 1 == 0 ? 1 : startPage - 1) +
  //   sExParam +
  //   ")'><span class='hidden'>이전</span></a>";

  // for (var i = startPage; i <= endPage; i++) {
  //   if (i > totalPage) {
  //     break;
  //   }

  // if (i > startPage) {
  //   firstPage = "";
  // }

  // if (i == currentPage) {
  //   pagingHtml += "<strong>" + i + "</strong>";
  // } else {
  //   pagingHtml +=
  //     " <a href=javascript:" +
  //     pageFunc +
  //     "(" +
  //     i +
  //     sExParam +
  //     ")>" +
  //     i +
  //     "</a>";
  // }
  //}

  // pagingHtml +=
  //   "<a class='next' href='javascript:" +
  //   pageFunc +
  //   "(" +
  //   (endPage + 1 > totalPage ? totalPage : endPage + 1) +
  //   sExParam +
  //   ")'><span class='hidden'>다음</span></a>";
  // pagingHtml +=
  //   "<a class='last' href='javascript:" +
  //   pageFunc +
  //   "(" +
  //   totalPage +
  //   sExParam +
  //   ")'><span class='hidden'>맨뒤</span></a>";
  // pagingHtml += "</div>";

  return 1;
};
