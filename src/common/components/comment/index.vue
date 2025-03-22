<template>
	<view class="hb-comment" v-if="loading">
		<!-- 阅读数-start -->
		<view>
			<img style="width: 14px; height: 14px;"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA0tJREFUWEftVk2IHUUQ/qp311NOksRT8JBDkARCfrxEDyLK+pe/DQkmJpBlZ7ofDwQ15iRocjYSSWAzU/OWd4hCMJiQH43xBz2YXCRivIgHQQ8SRPGUU/btfNLPnuU5O7OZlWz2kobh8aq/qvq6qrq6BEu8ZIn94wGBBUWg3W6v6vV62wFsILlGRNYA6AH4AcCPJH8mebPT6dxomtpGBJxz4wD2kny2oWHN81ybEJmXQKvVWpfn+VsAXi45vgPgj/D5rUfC91AJ54m83el0PLZy1RKw1u4GkAB4OGj+LSJXRORMkiSXq6xFUfSUiHi93SKyImB+BeBU9fMqnUoCcRy/IiIfFAoicp7kYVX9pUkKrLWrReRdkjsLvNfPsuxYWX8OAWvtOwCODACPqOrRJo7LmApbe1T17CDuPwSccy2SpwZYj2VZdr7K+fj4+IqRkZFVIjJD8ndV/asKdzcSswTiON4iIlcBLPOGROTFNE0/rTHqQ3motHdWVffU1YYx5utizxjzXJIk3te/nbDdbi/r9XpesCWAasNureV86VDVurqKRUSD7k8zMzPPT01N/dYHW2uPA3gtnDxL09TWnPwjX+F+j+Q1EfkCwC0ALwHYGnTeU9U3q/Sdc0oyDnvnVHWXOOdeIPlJEN4E8ExVPq21ywH8GXCXVHXboJM4jr8VkSe8bHp6emW32y2ws7Bg40sA68NhD3gCXZIHA2q07r4659aT9C3XL3+vi3D2BaVi26Sq31dFIY7jgyLSDXs3xFp7rci9MebJJEn8/zlrMQj00+ic20/ydAjJhTRNd9Tk/56ngOT2ogg/BjAWHB9X1TfuQxG+r6qv9wlMTEw8OjQ0dAXAY8HxYl/D68PDw6OTk5O3Z+9sq9UazfP8s+Lki9iIbpMczbLsej/tg6F2zr1K8kQhI3n/WnHhdDEfI5L7syz7cPDQlW2zHIl78RwDqCzu2oEkiqKnjTFfDbD9vwOJb9vHsiw7XHWz5h3JoijaZIzxz/PjJeVGIxnJb4wxJ9M0PVflfE4R1oGcc2Mk9wHYVYcpyS8BuKiqnbvhG03FhRHn3GaSG0muM8as9b8AjB/HRcR/35G8oKr+hWy0FkSgkcUFgh4QWPII/ANy0cUvD9WbkgAAAABJRU5ErkJggg==" />
			<span class="top-read">{{commentData.readNumer}}</span>
		</view>
		<!-- 阅读数-end -->
		<!-- 阅读数下边那条线-start -->
		<view class="seg_line_box">
			<view class="seg_line"></view>
			<view class="seg_dot"></view>
			<view class="seg_line"></view>
		</view>
		<!-- 阅读数下边那条线-end -->
		<!-- 评论主体-start -->
		<view class="comment-list" v-if="commentData.comment.length != 0">
			<!-- 评论主体-顶部数量及发表评论按钮-start -->
			<view class="comment-num">
				<view>共 {{commentData.commentSize}} 条评论</view>
				<view class="add-btn">
					<button type="primary" size="mini" @click="commentInput">发表评论</button>
				</view>
			</view>
			<!-- 评论主体-顶部数量及发表评论按钮-end -->
			<!-- 评论列表-start -->
			<view class="comment-box" v-for="(item, index) in commentData.comment">
				<view class="comment-box-item">
					<view>
						<image :src="item.avatar || emptyAvatar" mode="aspectFill" class="avatar"></image>
					</view>
					<view class="comment-main">
						<!-- 父评论体-start -->
						<view class="comment-main-top">
							<view class="nick-name-box">
								<view class="comLogo com1" v-if="index == 0">沙发</view>
								<view class="comLogo com2" v-if="index == 1">板凳</view>
								<view class="comLogo com3" v-if="index == 2">地板</view>
								<view class="comLogo com4" v-if="index > 2">{{index + 1}}楼</view>
								<view class="nick-name">{{item.nickname}}</view>
							</view>
							<view class="zan-box" @click="like(item.commentId)">
								<span :class="item.hasLike ? 'isLike' : 'notLike'">{{item.commentLikeCount == 0 ? '抢首赞' : item.commentLikeCount}}</span>
								<img style="width: 14px; height: 14px;" v-if="!item.hasLike"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAApVJREFUWEfFlz9oFEEUxr93SWEhFkIaBUljo4WgATEaiI0GwVLBQg2EzLd3hSBqLI2lRgWLY+ftSSQgggoWNv5pImLUwjQBg1goqCCIIBqwueSeTLg7Ln9Mcmdub7vdnZnvN9+8fe+toMWXtFgfDQGMjo52zM7OHgMwIyLTg4ODk41upG4A7/0OEbkPYGdFVEQuOOeuNQJRN4CqBvGw+3dm9kZEBsrCPSRf1gvRCIAFETPrjqLodZIkY2Z2SkQmnHMHUgMgOQ8fx3FvJpMZB/CDZEfqACEgi8XidwA/SW5uKkCN2AzJTYscmCTZ1VQA7/2AiNwSkefOuYNBLEmSnJnlATwgebypAKr6CMBRANdJng9i3vu8iORE5Mrc3NyTlQDM7HMul/tYO2bNX0GhUDhRKpXumtlvAPuiKJouOzBuZr117HyBU6sCqOpeAH0AhssiwyQvVwTjOO5va2s7vRaAGtCrJC+GOVUAVb1UTjDVDLd4URHJOuf8WsSWG5MkSbeZTYR3lc+4CpAkyUpWht3fI/m+UfEwL5/Pb2xvb59ZFkBV5zNchazsSBBeYPn/ABQKhZ5SqfQCwBTJXYuPoOkAqnoGwE0Ad0ieTB3Ae39bRPoBDJEcSR1AVd8C2CMifc65p6kCmJkkSfIHwAYAW0h+SxVAVXcDmDSzL1EUbasEc20eaGoQVuoIgMckj6QOoKo3AJwFMEJyqBUAIegOAegnOdYKgK8AtmYyma7aLjqVGPDebxeRDwB+AeggWUzVAVV1ABTAK5L7l+0HVPUTgM7Q7VQGhPJZe99oHagpw4dJPvsXQPixONeoyErzRGTKzB7W9hFLjiA8iOO4M7iw3hDZbLbq6pIeY73F6l1v1Zas3gXrHf8XhhNvMGSmtPYAAAAASUVORK5CYII=" />
								<img style="width: 14px; height: 14px;" v-else
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfVJREFUWEfFl79LHEEUx7/vclr4g51TLFQQW9FNDFhFBDvjtcF0gXSp5eYuWJlUAW9NIP9BIFUEOxFtTKF2FrezKFgkkEBS3h4SAtHbJ6vu5W5d1F3cm20WZt+b7+e9mTfzlqD5Ic36SATw+OPJQP2ft+ABJwQ+VFIcJA0kEYBpVfcAehKIMqHoFISVBCI2wOS76mi9g76HxTLwZiqybzcuRGwAc7WWB/NGWIhBu440ZlIHmFitLRPzm+tC9EtJY1gjAP9VMtelEQC2kuJR6gCm5X4BsBAWImDdluJZqgBjH/4MZr3TYzB6IoRWmHnzJgDK0g+1KL4128SqgnD9x432yn5NSfE88L0VYPx9rS/jYR6EJTCPJxQNu60oKV77gw2Ai/Ly1/ZKRElx8c20XL4n0ZZpgvkbAKbl7gCYDax0ALREmjJAo2SbM9A+AKLPqmC8aNkD4bVOMwPEKNlFUdYGkAE9rUhjSxvA2YOOoaPF7t+6AH4qKUauHURt3AObSoq8NgAGyo4UJW0ABH5py9wnbQAAppq76HYfRLXOXmPg4BWdasoA7yuZm47sB0zL9Vvt0TQvI/bqc06pfzsS4KHlWgwUUgKwmWjdKRhvI1q5/0P+T8dZ9jILTjH31X9PlKuNKzppXxDMFeV/a0eUVPSuftoBzgHKR/ohZwAugwAAAABJRU5ErkJggg==" />
							</view>
						</view>
						<view class="comment-main-content">
							{{item.commentContent.length > 60 ? item.commentContent.slice(0, 59) : item.commentContent}}
							<span v-if="item.commentContent.length > 60">
								{{item.hasShowMore ? item.commentContent.slice(59) : '...'}}
								<span class="foot-btn" @click="showMore(item.commentId)">
									{{item.hasShowMore ? '收起' : '展开'}}
								</span>
							</span>
						</view>
						<view class="comment-main-foot">
							<view class="foot-time">{{item.createTime}}</view>
							<view class="foot-btn" @click="reply(item.nickname,item.nickname,item.commentId, item.userId)">回复</view>
							<view class="foot-btn" v-if="false" @click="confirmDelete(item.commentId)">删除</view>
						</view>
						<!-- 父评论体-end -->
						<!-- 子评论列表-start -->
						<view class="comment-sub-box">
							<view class="comment-sub-item" v-for="each in item.children">
								<view>
									<image :src="each.avatar || emptyAvatar" mode="aspectFill" class="avatar">
									</image>
								</view>
								<view class="comment-main">
									<view class="sub-comment-main-top">
										<view class="nick-name">{{each.nickname}}</view>
										<view class="zan-box" @click="like(each.commentId)">
											<span :class="each.hasLike ? 'isLike' : 'notLike'">{{each.commentLikeCount == 0 ? '抢首赞' : each.commentLikeCount}}</span>
											<img style="width: 14px; height: 14px;" v-if="!each.false"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAApVJREFUWEfFlz9oFEEUxr93SWEhFkIaBUljo4WgATEaiI0GwVLBQg2EzLd3hSBqLI2lRgWLY+ftSSQgggoWNv5pImLUwjQBg1goqCCIIBqwueSeTLg7Ln9Mcmdub7vdnZnvN9+8fe+toMWXtFgfDQGMjo52zM7OHgMwIyLTg4ODk41upG4A7/0OEbkPYGdFVEQuOOeuNQJRN4CqBvGw+3dm9kZEBsrCPSRf1gvRCIAFETPrjqLodZIkY2Z2SkQmnHMHUgMgOQ8fx3FvJpMZB/CDZEfqACEgi8XidwA/SW5uKkCN2AzJTYscmCTZ1VQA7/2AiNwSkefOuYNBLEmSnJnlATwgebypAKr6CMBRANdJng9i3vu8iORE5Mrc3NyTlQDM7HMul/tYO2bNX0GhUDhRKpXumtlvAPuiKJouOzBuZr117HyBU6sCqOpeAH0AhssiwyQvVwTjOO5va2s7vRaAGtCrJC+GOVUAVb1UTjDVDLd4URHJOuf8WsSWG5MkSbeZTYR3lc+4CpAkyUpWht3fI/m+UfEwL5/Pb2xvb59ZFkBV5zNchazsSBBeYPn/ABQKhZ5SqfQCwBTJXYuPoOkAqnoGwE0Ad0ieTB3Ae39bRPoBDJEcSR1AVd8C2CMifc65p6kCmJkkSfIHwAYAW0h+SxVAVXcDmDSzL1EUbasEc20eaGoQVuoIgMckj6QOoKo3AJwFMEJyqBUAIegOAegnOdYKgK8AtmYyma7aLjqVGPDebxeRDwB+AeggWUzVAVV1ABTAK5L7l+0HVPUTgM7Q7VQGhPJZe99oHagpw4dJPvsXQPixONeoyErzRGTKzB7W9hFLjiA8iOO4M7iw3hDZbLbq6pIeY73F6l1v1Zas3gXrHf8XhhNvMGSmtPYAAAAASUVORK5CYII=" />
											<img style="width: 14px; height: 14px;" v-else
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfVJREFUWEfFl79LHEEUx7/vclr4g51TLFQQW9FNDFhFBDvjtcF0gXSp5eYuWJlUAW9NIP9BIFUEOxFtTKF2FrezKFgkkEBS3h4SAtHbJ6vu5W5d1F3cm20WZt+b7+e9mTfzlqD5Ic36SATw+OPJQP2ft+ABJwQ+VFIcJA0kEYBpVfcAehKIMqHoFISVBCI2wOS76mi9g76HxTLwZiqybzcuRGwAc7WWB/NGWIhBu440ZlIHmFitLRPzm+tC9EtJY1gjAP9VMtelEQC2kuJR6gCm5X4BsBAWImDdluJZqgBjH/4MZr3TYzB6IoRWmHnzJgDK0g+1KL4128SqgnD9x432yn5NSfE88L0VYPx9rS/jYR6EJTCPJxQNu60oKV77gw2Ai/Ly1/ZKRElx8c20XL4n0ZZpgvkbAKbl7gCYDax0ALREmjJAo2SbM9A+AKLPqmC8aNkD4bVOMwPEKNlFUdYGkAE9rUhjSxvA2YOOoaPF7t+6AH4qKUauHURt3AObSoq8NgAGyo4UJW0ABH5py9wnbQAAppq76HYfRLXOXmPg4BWdasoA7yuZm47sB0zL9Vvt0TQvI/bqc06pfzsS4KHlWgwUUgKwmWjdKRhvI1q5/0P+T8dZ9jILTjH31X9PlKuNKzppXxDMFeV/a0eUVPSuftoBzgHKR/ohZwAugwAAAABJRU5ErkJggg==" />
										</view>
									</view>
									<view class="comment-main-content">
										{{each.commentContent.length > 60 ? each.commentContent.slice(0, 59) : each.commentContent}}
										<span v-if="each.commentContent.length > 60">
											{{each.hasShowMore ? each.commentContent.slice(59) : '...'}}
											<span class="foot-btn" @click="showMore(each.id)">
												{{each.hasShowMore ? '收起' : '展开'}}
											</span>
										</span>
									</view>
									<view class="comment-main-foot">
										<view class="foot-time">{{each.createTime}}</view>
										<view class="foot-btn" @click="reply(item.nickname,each.nickname,item.commentId, item.userId)">
											回复</view>
										<view class="foot-btn" v-if="each.owner" @click="confirmDelete(each.commentId)">删除
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 子评论列表-end -->
					</view>
				</view>
			</view>
			<!-- 评论列表-end -->
		</view>
		<!-- 评论主体-end -->
		<!-- 无评论-start -->
		<view class="comment-none" v-else>
			暂无评论，<span @click="commentInput" style="color: #007AFF;">抢沙发</span>
		</view>
		<!-- 无评论-end -->
		<!-- 新增评论-start -->
		<view class="comment-submit-box" v-if="submit" @click="closeInput">
			<!-- 下边的click.stop.prevent用于让上边的click不传下去，以防点到下边的空白处触发closeInput方法 -->
			<view class="comment-add" @click.stop.prevent="stopPrevent" :style="'bottom:' + KeyboardHeight + 'px'">
				<view class="comment-submit">
					<view class="btn-click cancel" @click="closeInput">取消</view>
					<view>
						<view class="replayTag" v-show="showTag">
							<view>回复在 {{pUser}} 的评论下</view>
							<view @click="tagClose" class="replyTagClose">×</view>
						</view>
					</view>
					<view>
						<view class="btn-click" @click="add">发布</view>
					</view>
				</view>
				<textarea class="textarea" v-model="commentReq.content" :placeholder="placeholder" :adjust-position="false" :show-confirm-bar="false"
					@blur="blur" @focus="focusOn" :focus="focus" maxlength="800"></textarea>
			</view>
		</view>
		<!-- 新增评论-end -->
	</view>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUpdated, onUnmounted } from 'vue';
import { queryAllCommentByArticle } from '@/api/comment.ts';
import { onLaunch, onShow, onHide, onLoad } from "@dcloudio/uni-app";
const props = defineProps({
  cmData: {
    type: Object,
    default: null
  },
  deleteTip: {
    type: String,
    default: '操作不可逆，如果评论下有子评论，也将被一并删除，确认？'
  },
  articleId: {
	type: Number,
	default: 0
  }
});
const emit = defineEmits(['del', 'add', 'like', 'focusOn']);

const emptyAvatar = ref("http://117.72.78.239:9000/zjyminio/defaultAvatar.webp");
const commentData = ref(null);
const placeholder = ref("请输入评论");
const commentReq = ref({ pId: null, content: null, commentContent: null });
const pUser = ref(null);
const showTag = ref(false);
const focus = ref(false);
const submit = ref(false);
const KeyboardHeight = ref(0);
let loading = ref(false);


watch(
  () => props.cmData,
  (newVal) => {
    init(newVal);
  },
  { immediate: true }
);

onMounted(() => {
	console.log('文章id', props.articleId);
	uni.$on('fetchDataOperation', (data) => {
		console.log('fetchDataOperation', data);
		if(data === 1){
			init();
		}
	})
  uni.onKeyboardHeightChange(res => {
    KeyboardHeight.value = res.height;
  });
});

onUnmounted(() => {
    uni.$off('fetchDataOperation', handleFetchDataOperation);
});

async function init(newVal) {
  let res = await queryAllCommentByArticle(props.articleId)
  console.log('评论res -->',res);
  if( res.msg == "ok" ){
	res.data.comment = getTree(res.data.comment)
	commentData.value = res.data
	loading.value = true
  }
}

function reply(pUserVal, reUser, pId, toUserId) {
	console.log('pUserVal', pUserVal, 'reUser', reUser, 'pId', pId, 'toUserId', toUserId);
  pUser.value = pUserVal;
  commentReq.value.pId = pId;
  commentReq.value.content = reUser ? `@${reUser} ` : '';
  commentReq.value.commentContent = reUser ? `@${reUser} ` : '';
  showTag.value = true;
  // 获取当前评论的userId
  commentReq.value.toUserId = reUser ? toUserId : null;
  console.log('当前评论', commentReq.value);
  commentInput();
}

function getTree(data) {
    let result = [];
    let map = {};
    data.forEach(item => {
        map[item.commentId] = item;
    });
    data.forEach(item => {
        let parent = map[item.commentRootId];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

function confirmDelete(commentId) {
  uni.showModal({
    title: '警告',
    content: props.deleteTip,
    confirmText: '确认删除',
    success: (res) => {
      if (res.confirm) {
        emit('del', commentId);
      }
    }
  });
}

function add() {
  if (!commentReq.value.content || commentReq.value.content.length < 2) {
    uni.showToast({ title: '评论内容过短', duration: 2000 });
    return;
  }
  console.log('commentReq', commentReq.value);
  emit('add', commentReq.value);
//   init();
  closeInput();
}

function like(commentId) {
  emit('like', commentId);
}

function addComplete() {
  commentReq.value.content = null;
  tagClose();
  closeInput();
}

function likeComplete(commentId) {
  commentData.value.comment.forEach(comment => {
    if (comment.commentId === commentId) {
      comment.hasLike = !comment.hasLike;
      comment.hasLike ? comment.likeNum++ : comment.likeNum--;
    }
    comment.children?.forEach(child => {
      if (child.commentId === commentId) {
        child.hasLike = !child.hasLike;
        child.hasLike ? child.likeNum++ : child.likeNum--;
      }
    });
  });
}

function deleteComplete(commentId) {
  commentData.value.comment = commentData.value.comment.filter(comment => {
    if (comment.commentId === commentId) return false;
    comment.children = comment.children.filter(child => child.commentId !== commentId);
    return true;
  });
}

function showMore(commentId) {
  commentData.value.comment.forEach(comment => {
    if (comment.commentId === commentId) {
      comment.hasShowMore = !comment.hasShowMore;
    }
    comment.children?.forEach(child => {
      if (child.commentId === commentId) {
        child.hasShowMore = !child.hasShowMore;
      }
    });
  });
}

function blur() {
  focus.value = false;
}

function focusOn() {
  emit('focusOn');
}

function tagClose() {
  showTag.value = false;
  pUser.value = null;
  commentReq.value.pId = null;
}

function commentInput() {  
  submit.value = true;
  nextTick(() => {
    focus.value = true;
  });
}

function closeInput() {
	commentReq.value.content = null;
	commentReq.value.pId = null;
	commentReq.value.commentContent = null;
	commentReq.value.toUserId = null;
	commentReq.value.toUserNam = null;
	commentReq.value.commentId = null;
  	focus.value = false;
  	submit.value = false;
}
</script>


<style lang="scss" scoped>
	.hb-comment {
        height: 100%;
        overflow-y: scroll;
		padding: 10rpx;
		scrollbar-width: none;
	}

	.hb-comment::-webkit-scrollbar {
		display: none;
	}

	.top-read {
		font-size: 28rpx;
		padding-left: 10rpx;
		color: #999999;
	}

	.seg_line_box {
		display: flex;
		height: 5rpx;
		justify-content: space-between;
		margin: 5rpx 0;
	}

	.seg_line {
		width: 45%;
		border-bottom: 1rpx solid #e1e1e1;
	}

	.seg_dot {
		width: 8%;
		border-bottom: 5rpx dotted #dbdbdb;
	}

	.comment-num {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}

	.comment-box {
		padding: 10rpx 0;
	}

	.comment-box-item {
		display: flex;
	}

	.comment-main {
		padding-left: 20rpx;
	}

	.comment-main-top {
		width: 600rpx;
		padding-top: 6rpx;
		display: flex;
		justify-content: space-between;
	}

	.sub-comment-main-top {
		width: 510rpx;
		padding-top: 6rpx;
		display: flex;
		justify-content: space-between;
	}

	.avatar {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.nick-name-box {
		display: flex;
		align-items: center;
	}

	.comLogo {
		margin-right: 18rpx;
		font-size: 22rpx;
		border-radius: 10rpx;
		padding: 5rpx 15rpx;
		color: #FFFFFF;
	}

	.com1 {
		background-color: #d218b1;
	}

	.com2 {
		background-color: #f19c0b;
	}

	.com3 {
		background-color: #c8da85;
	}

	.com4 {
		background-color: #bfd0da;
	}

	.nick-name {
		color: #2d8cf0;
	}

	.isLike {
		font-size: 28rpx;
		padding-right: 10rpx;
		color: #2d8cf0;
	}

	.notLike {
		font-size: 28rpx;
		padding-right: 10rpx;
		color: #999999;
	}

	.comment-main-content {
		padding: 10rpx 10rpx 10rpx 0;
	}

	.comment-main-foot {
		display: flex;
		font-size: 22rpx;
	}

	.replayTag {
		color: #909399;
		margin-bottom: 5px;
		border: 1px solid #c8c9cc;
		background-color: #f4f4f5;
		border-radius: 3px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16rpx;
		padding: 5px 10px;
	}

	.replyTagClose {
		font-size: 20px;
		line-height: 12px;
		padding: 0 0 2px 5px;
	}

	.foot-btn {
		padding-left: 10rpx;
		color: #007AFF;
	}

	.comment-sub-box {
		padding: 20rpx 0;
	}

	.comment-sub-item {
		display: flex;
	}

	.comment-none {
		padding: 20rpx;
		width: 100%;
		text-align: center;
		color: #999999;
	}

	.comment-submit-box {
		position: fixed;
		display: flex;
		align-items: flex-end;
		z-index: 9900;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.5);
		width: 100%;
	}

	.comment-add {
		position: fixed;
		background-color: #FFFFFF;
		width: 100%;
		padding: 5rpx;
		border: 1px solid #ddd;
		transition: .3s;
		-webkit-transition: .3s;
	}

	.btn-click {
		color: #007AFF;
		font-size: 28rpx;
		padding: 10rpx;
	}

	.cancel {
		color: #606266;
	}

	.textarea {
		height: 100px;
		padding: 16rpx;
		width: 100%;
	}

	.comment-submit {
		padding: 5rpx 20rpx 0 20rpx;
		border-bottom: 1px dashed #ddd;
		width: calc(100% - 40rpx);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
