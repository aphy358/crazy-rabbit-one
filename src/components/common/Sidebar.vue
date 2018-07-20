<!-- 组件说明 -->
<template>
	<div class="sidebar">
		<div class="sidebar-btn">
			<el-button type="warning" icon="el-icon-star-off" circle @click="myConcern"></el-button>
			<el-button type="danger" icon="el-icon-arrow-up" circle @click="toTop"></el-button>
		</div>
		
		<div class="sidebar-spread">
			<div class="sidebar-gz">
				<div class="sidebar-gz-outer">
					<div class="sidebar-gz-inner">
						<div class="sidebar-gz-title">
							<h1>我的关注</h1>
							<i class="sidebar-gz-icon-hide el-icon-arrow-right" @click="hideConcern"></i>
						</div>
						
						<div class="sidebar-gz-no-content" v-if="concernList.length <= 0"></div>
						
						<div class="sidebar-gz-list" v-else>
							
							<el-scrollbar style="height: 100%;">
								<div class="sidebar-gz-item" v-for="o in concernList" :key="o.infoId">
									<el-card shadow="hover" :data-hotelid="o.infoId" :body-style="{ padding: '16px 10px',borderBottom: '1px dashed gainsboro'}">
										<a :href="'/#/hotelDetail?' + o.detailLink.split('?')[1]" target="_blank" class="sidebar-hotel-link">
											<div class="sidebar-gz-img">
												<img :src="o.picSrc" alt="">
											</div>
											<div class="sidebar-gz-info">
												<p class="sidebar-gz-hotel-name">{{ o.infoName }}</p>
												<p class="sidebar-gz-hotel-price" v-if="o.minPrice">
													{{ '￥' + o.minPrice + '起' }}
												</p>
												<p class="sidebar-gz-hotel-price" v-else>
													<span v-if="!priceList.hasOwnProperty(o.infoId)"><i class="el-icon-loading"></i>加载中</span>
													<span v-else>{{ priceList[o.infoId] === '暂无价格' ? priceList[o.infoId] : '￥' + priceList[o.infoId] + '起' }}</span>
												</p>
												<i :class="!heartList.hasOwnProperty(o.infoId) || heartList[o.infoId] === 1 ? 'icon-gz-on sidebar-gz-icon iconfont-icons iconfont-xinzang' : 'icon-gz-off sidebar-gz-icon iconfont-icons iconfont-xinzang'" :key="o.infoId" @click.prevent.prevent.self="switchHeart(o.infoId)"></i>
											</div>
										</a>
									</el-card>
								</div>
								
								
								<div class="sidebar-get-more" v-if="pageTotal > 1 && pageTotal !== pageNum" @click="getMyConcernList">
									加载更多
									<i class="get-more-gz el-icon-arrow-down"></i>
								</div>
								<div class="sidebar-get-more" v-else>
									没有更多了
								</div>
							</el-scrollbar>
						</div>
					
					</div>
				</div>
				<div class="sidebar-gz-mask" v-show="isShowConcern" @click="hideConcern"></div>
			</div>
		</div>
	</div>
</template>

<script>
  import Velocity from 'velocity-animate'
  import { addDays } from '../../util.js'
  import { _scrollTop } from '../../store/util.js'
  
  export default {
    name: '',
    
    data() {
      return {
        isShowConcern: false,
        pageNum: 0,
        
        concernList: [],
        pageTotal : 0,
        
        //每个对象中key为酒店id，value为是否已关注（0为未关注，1为已关注）
        heartList: {},
        
        priceList: {},
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      myConcern(){
        //重置数据
        this.concernList = [];
        this.heartList = {};
        this.priceList = {};
        this.pageNum = 0;
        
        this.getMyConcernList();
        
        this.isShowConcern = true;
        
        Velocity(document.querySelector('.sidebar-gz-outer'), { right : 0 })
      },
      
      hideConcern(){
        this.isShowConcern = false;
        Velocity(document.querySelector('.sidebar-gz-outer'), { right : '-300px' })
      },
      
      switchHeart(key){
        let params = {
          categoryId: 0,
          infoId: key
        };
        let _this = this;
        
        if (!this.heartList.hasOwnProperty(key) || this.heartList[key] === 1){
          this.$api.common.syncRemoveFavorite(params).then(res => {
            if (res.returnCode === 1){
              _this.heartList[key] = 0;
              _this.heartList = Object.assign({}, _this.heartList)
            }else{
              _this.$message.error(res.returnMsg);
            }
          })
        }else{
          this.$api.common.syncSaveFavorite(params).then(res => {
            if (res.returnCode === 1){
              _this.heartList[key] = 1;
              _this.heartList = Object.assign({}, _this.heartList)
            }else{
              _this.$message.error(res.returnMsg);
            }
          });
        }
      },
      
      getMyConcernList(){
        let params = {
          categoryId: 0,
          pageNum: this.pageNum + 1,
          pageSize: 8
        };
        this.pageNum += 1;
        
        let _this = this;
        this.$api.common.syncGetFavoriteList(params).then(res => {
          _this.concernList = _this.concernList.concat(res.dataList);
          _this.pageTotal = res.pageTotal;
          
          _this.getPrice();
        })
      },
      
      getPrice(){
        let _this = this;
        
        this.concernList.forEach(function (v, i) {
          if (!v.minPrice){
            let params = {
              hotelId: v.infoId,
              checkInDate: addDays(new Date(), 0),
              checkOutDate: addDays(new Date(), 1),
              roomNum: 1,
              adultNum: 2,
              childrenNum: 0,
              childrenAgesStr: ''
            };
  
            _this.$api.common.syncGetHotelPriceList(params).then(res => {
              if (res.returnCode === 1){
                if (res.data.hasOwnProperty('priceMin') && res.data.priceMin !== 0 ){
                  _this.priceList[v.infoId] = res.data.priceMin;
                }else{
                  _this.priceList[v.infoId] = '暂无价格';
                }
              }else{
                _this.priceList[v.infoId] = '暂无价格';
              }
  
              _this.priceList = Object.assign({}, _this.priceList)
            })
          }
          
        })
      },
  
      toTop(){
        Velocity(document.querySelector('.el-scrollbar__view'), 'scroll', {container: document.querySelector('.el-scrollbar__wrap')})
      }
    }
  }
</script>

<style lang="scss">
	.sidebar{
		
		.el-card{
			border: none;
			
			&:hover{
				background-color: #eef2dc;
			}
		}
	}
	
	.el-scrollbar__wrap {
		overflow-x: hidden;
	}
</style>
<style scoped lang="scss">
	@import "../../assets/jl_sprites";
	@import "../../assets/font/iconfont.css";
	
	
	.sidebar{
		position: fixed;
		bottom: 120px;
		right: 20px;
		z-index: 10000;
	}
	
	.sidebar-btn{
		width: 40px;
	}
	
	.el-button+.el-button{
		margin-left: 0;
		margin-top: 10px;
	}
	
	// 我的关注
	.sidebar-gz-outer{
		position: fixed;
		width: 300px;
		height: 100%;
		top: 0;
		right: -300px;
		//right: 0;
		background-color: #fff;
		box-shadow: 0 0 5px #e3e3e3;
		z-index: 10001;
		
		@at-root .sidebar-gz-inner{
			height: 100%;
			background: white;
			
			@at-root .sidebar-gz-title{
				height: 60px;
				line-height: 60px;
				border-bottom: solid 1px #ccc;
				box-sizing: border-box;
				
				h1{
					float: left;
					font-size: 18px;
					font-weight: normal;
					margin-left: 20px;
					letter-spacing: 2px;
				}
				
				@at-root .sidebar-gz-icon-hide{
					float: right;
					margin-right: 20px;
					margin-top: 18px;
					font-size: 18px;
					border-radius: 50%;
					color: #ffffff;
					width: 24px;
					height: 24px;
					line-height: 24px;
					text-align: center;
					background-color: #9baec9;
					font-weight: bold;
					
					&:hover{
//						@include right-circle2;
						background-color: #d2c8c2;
					}
				}
			}
			
			@at-root .sidebar-gz-no-content{
				@include jl_sprites;
				@include noConcern;
				margin: 50px 10px;
			}
			
			@at-root .sidebar-gz-list{
				height: 93.3%;
				overflow: auto;
				
				@at-root .sidebar-gz-item{
					&:hover{
						background-color: #f6efb8;
					}
					
					.sidebar-hotel-link{
						color: #000;
						&:hover{
							text-decoration: none;
						}
						
						@at-root .sidebar-gz-content-wrap{
							
							@at-root .sidebar-gz-img{
								float: left;
								width: 80px;
								height: 60px;
								overflow: hidden;
								
								img{
									float: left;
									width: 100%;
								}
							}
							
							@at-root .sidebar-gz-info{
								position: relative;
								height: 60px;
								font-size: 14px;
								margin-left: 90px;
								
								@at-root .sidebar-gz-hotel-name{
									max-height: 42px;
									overflow: hidden;
									color: #5d81b3;
									padding-left: 10px;
									
									&:hover{
										text-decoration: none;
									}
								}
								
								@at-root .sidebar-gz-hotel-price{
									position: absolute;
									left: -3px;
									bottom: 0;
									color: #886c5b;
									padding-left: 10px;
									
									.price-loading{
										width: 20px;
										height: 20px;
										margin-left: 6px;
										float: right;
									}
								}
								
								@at-root .sidebar-gz-icon{
									position: absolute;
									right: 3px;
									bottom: 0;
									font-size: 24px;
									&.icon-gz-on{
										color: #ef9a96;
									}
									&.icon-gz-off{
										/*@include jl_sprites;
										@include gz4;*/
										color: #dddddd;
									}
								}
							}
						}
					}
				}
				
				@at-root .sidebar-get-more{
					height: 70px;
					line-height: 70px;
					text-align: center;
					font-size: 16px;
					color: #3399ff;
					cursor: pointer;
					
					&:hover{
						color: #e01b12;
					}
					
					.get-more-gz{
						display: inline-block;
						margin: 2px 0;
					}
				}
				
				@at-root .sidebar-no-more{
					height: 70px;
					line-height: 70px;
					text-align: center;
					font-size: 16px;
				}
			}
			
			
		}
	}
	
	.sidebar-gz-mask{
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: .5;
		background-color: #000000;
	}
</style>