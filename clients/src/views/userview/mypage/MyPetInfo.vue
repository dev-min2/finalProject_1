<template>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <div class="px-4 py-1 my-3 text-center">
                    <h2 class="fw-bold mb-3">내 반려동물 정보</h2>
                </div>
                <div class="d-flex justify-content-center">
                    <c:choose>
                        <c:when test="${!empty pet }">
                            <table class="table w-75">
                                <tr>
                                    <th>이름</th>
                                    <th>반려동물종류</th>
                                    <th>반려동물생일</th>
                                    <th>성별</th>
                                </tr>
                                <tr>
                                    <td>${pet.petName }</td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${pet.petType == '0'}">
                                                강아지
                                            </c:when>
                                            <c:otherwise>
                                                고양이
                                            </c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>
                                        <fmt:formatDate value="${pet.petBirth}" pattern="yyyy-MM-dd"></fmt:formatDate>
                                    </td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${pet.petGender == '0'}">
                                                수컷
                                            </c:when>
                                            <c:otherwise>
                                                암컷
                                            </c:otherwise>
                                        </c:choose>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <div class="d-grid gap-2">
                                            <button type="button" class="btn text-white"
                                                style="background-color: #9999FF;"
                                                onclick="location.href='myPetForm.do'">내 반려동물 추가등록하기</button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </c:when>
                        <c:otherwise>
                            <div class="px-4 py-1 my-3 text-center">
                                <h2 class="fw-bold mb-3">아직 등록된 반려동물정보가 없습니다</h2>
                                <button type="button" onclick="location.href='myPetForm.do'">내 반려동물 등록하기</button>
                            </div>
                        </c:otherwise>
                    </c:choose>

                </div>
            </div>
        </main>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>