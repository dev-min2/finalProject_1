<template>
    <section class="pt-2 pb-4">
		<div class="container px-4 px-lg-5 mt-3">
			<h3>리뷰 작성</h3>
			<form @submit.prevent="uploadProduct" ref="uploadForm" class="row">
				<table class="table">
					<tr>
						<th>상품이름</th>
						<td colspan="2"><input type="text" name="productName" class="form-control" v-model="noticeBoardInfo.title"></td>
					</tr>
					<tr>
						<th>별점</th>
						<td>
							<select v-model="noticeBoardInfo.sel" class="form-select" aria-label="Default select example">
                                <option v-for="sub in subCodes" :value="sub.sub_code" :key="sub.sub_code" >{{sub.sub_code_name}}</option>
							</select>
						</td>
					</tr>
					<tr ref="target">
						<th>내용</th>
						<td colspan="2">
							<TextEditor v-if="curModifyForm == false" 
								:boardType="'notice'" :userNo="$store.state.userNo" :randBoardValue="randNoticeValue" :curTimeVal="curTimeVal" ref="editor"/>
							<TextEditor v-else-if="curModifyForm == true && noticeBoardInfo.html !== null" 
								:html="noticeBoardInfo.html" :boardType="'notice'" :userNo="$store.state.userNo" :randBoardValue="randNoticeValue" :curTimeVal="curTimeVal" ref="editor"/>
						</td>
					</tr>
						<tr>
							<th>파일 첨부</th>
							<td colspan="2">
								<InsertAttachFileList v-if="curModifyForm == false" 
									:attachFileList="null" :boardNo="''" :boardType="'notice'" :userNo="$store.state.userNo" :randBoardValue="randNoticeValue" :curTimeVal="curTimeVal" />
								<InsertAttachFileList v-else-if="curModifyForm == true && realAttachFileNameList !== null" 
									:attachFileList="realAttachFileNameList" :boardNo="boardNo" :boardType="'notice'" :userNo="$store.state.userNo" :randBoardValue="randNoticeValue" :curTimeVal="curTimeVal" />
							</td>
						</tr>
					<tr>
						<td colspan="2" style="text-align:center;">
							<input v-if="curModifyForm == false" type="submit" value="저장" class="btn btn-primary mx-3" @click="registPost">
							<input v-else type="submit" value="수정" class="btn btn-primary mx-3" @click="modifyPost">
							<router-link class="btn btn-warning" to="/notice">작성취소</router-link>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</section>
</template>