import request from '@/utils/request'
// 题目 ----------------------------------------------------------------
/**
 * 题目列表
 */
export function getQuestionListApi({ page, type, title }) {
  return request({
    url: '/admin/s/question',
    method: 'get',
    params: { page, type, title }
  })
}
/**
 * 新建题目
 * type 题目类型:  radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
 * value:
 * value.options ["",""] 选项
 * value.value   number  答案
 */
export function addQuestionApi(options) {
  const data = {}
  data.title = options.title
  data.remark = options.remark
  data.type = options.type
  data.value = options.value
  return request({
    url: '/admin/s/question/save',
    method: 'post',
    data
  })
}
/**
 * 更新题目
 * type 题目类型:  radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
 * value:
 * value.options ["",""] 选项
 * value.value   number  答案
 */
export function updateQuestionApi(options) {
  const data = {}
  data.id = options.id
  data.title = options.title
  data.remark = options.remark
  data.type = options.type
  data.value = options.value
  return request({
    url: '/admin/s/question/update',
    method: 'post',
    data
  })
}
/**
 * 删除题目
 * @param {Array} ids
 */
export function deleteQuestionByIdsApi(ids) {
  return request({
    url: '/admin/s/question/delete',
    method: 'post',
    data: { ids }
  })
}
// 试卷 ----------------------------------------------------------------
/**
 * 试卷列表
 */
export function getTestpaperListApi({ page, title }) {
  return request({
    url: '/admin/s/testpaper',
    method: 'get',
    params: { page, title }
  })
}
/**
 * 新建试卷
 * title: 试卷名称
 * total_score: 总分
 * pass_score: 及格分
 * expire: 考试时间
 * status: 状态  0禁用,1启用
 * questions: Object 题目列表
   {
    questions_question_id:题目id
    questions_score:题目分数
   }
 *
 */
export function addTestpaperApi(options) {
  const data = {}
  data.title = options.title
  data.total_score = options.total_score
  data.pass_score = options.pass_score
  data.expire = options.expire
  data.status = options.status
  data.questions = options.questions
  // data.questions_question_id = options.questions_question_id
  // data.questions_score = options.questions_score
  return request({
    url: '/admin/s/testpaper/save',
    method: 'post',
    data
  })
}
/**
 * 更新试卷
 * type 题目类型:  radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
 * value:
 * value.options ["",""] 选项
 * value.value   number  答案
 */
export function updateTestpaperApi(options) {
  const data = {}
  data.id = options.id
  data.title = options.title
  data.total_score = options.total_score
  data.pass_score = options.pass_score
  data.expire = options.expire
  data.status = options.status
  data.questions = options.questions
  // data.questions_question_id = options.questions_question_id
  // data.questions_score = options.questions_score
  return request({
    url: '/admin/s/testpaper/update',
    method: 'post',
    data
  })
}
/**
 * 删除试卷
 * @param {Array} ids
 */
export function deleteTestpaperByIdsApi(ids) {
  return request({
    url: '/admin/s/testpaper/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 查看试卷详情
 */
export function getTestpaperByIdsApi(id) {
  return request({
    url: '/admin/s/testpaper/read',
    method: 'get',
    params: { id }
  })
}
// ----------------------------------------------------------------
// 考试管理列表
//  回答状态：0否1是
//  阅卷状态：0否1是
export function getUserTestListApi({ page, answer_status, read_status }) {
  return request({
    url: '/admin/s/user_test',
    method: 'get',
    params: { page, answer_status, read_status }
  })
}
// 删除考试管理
export function deleteUserTestByIdsApi(ids) {
  return request({
    url: '/admin/s/user_test/delete',
    method: 'post',
    data: { ids }
  })
}
// 查看考试管理详情
export function getUserTestByIdApi(id) {
  return request({
    url: '/admin/s/user_test/read',
    method: 'get',
    params: { id }
  })
}
// 设置考试管理阅卷状态
export function getUserTestReadApi({ id, scores }) {
  return request({
    url: '/admin/s/user_test/update_readstatus',
    method: 'get',
    params: { id, scores }
  })
}
// ----------------------------------------------------------------
// 社区模块
/**
 * 新增社区
 */
export function addBbsApi(options) {
  const data = {}
  data.title = options.title
  data.status = options.status
  return request({
    url: '/admin/s/bbs/save',
    method: 'post',
    data
  })
}
/**
 * 更新社区
 */
export function updateBbsApi(options) {
  const data = {}
  data.id = options.id
  data.title = options.title
  data.status = options.status
  return request({
    url: '/admin/s/bbs/update',
    method: 'post',
    data
  })
}
/**
 * 社区列表
 */
export function getBbsListApi(page) {
  return request({
    url: '/admin/s/bbs',
    method: 'get',
    params: { page }
  })
}
/**
 * 显示/隐藏社区
 * 状态：0禁用1启用
 */
export function setBbsStatusApi({ id, status }) {
  return request({
    url: '/admin/s/bbs/updatestatus',
    method: 'post',
    data: { id, status }
  })
}
/**
 *删除社区
 */
export function deleteBbsByIdsApi(ids) {
  return request({
    url: '/admin/s/bbs/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 给社区分配管理员
 */
export function setBbsManagerApi({ id, user_ids }) {
  return request({
    url: '/admin/s/bbs/setmanagers',
    method: 'post',
    data: { id, user_ids }
  })
}
/**
 * 帖子列表
 */
export function getPostListApi({ page, bbs_id }) {
  return request({
    url: '/admin/s/post',
    method: 'get',
    params: { page, bbs_id }
  })
}
/**
 * 取消/置顶帖子
 */
export function setPostTopStatusApi({ id, is_top }) {
  return request({
    url: '/admin/s/post/updateistop',
    method: 'post',
    data: { id, is_top }
  })
}
/**
 * 删除帖子
 */
export function deletePostByIdApi({ ids, bbs_id }) {
  return request({
    url: '/admin/s/post/delete',
    method: 'post',
    data: { ids, bbs_id }
  })
}
/**
 * 帖子评论列表
 */
export function getPostCommentApi({ page, post_id }) {
  return request({
    url: '/admin/s/post_comment',
    method: 'get',
    params: { page, post_id }
  })
}
/**
 * 删除评论
 */
export function deletePostCommentByIdApi({ ids, bbs_id }) {
  return request({
    url: '/admin/s/post_comment/delete',
    method: 'post',
    data: { ids, bbs_id }
  })
}
