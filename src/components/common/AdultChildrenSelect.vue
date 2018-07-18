
<!-- 成人小孩选择 -->
<template>
  <el-popover
    :width="356"
    style="width: 130px;"
    placement="bottom-start"
    v-model="visible" >

    <!-- 成人小孩选择组件模板 -->
    <section class="ac-select-wrap">
        <div class="ac-select-row">
            <div class="ac-select-item-wrap">
                <label class="ac-select-item-label">成人</label>
                <el-select 
                  v-model="getAdultNum" 
                  size="mini" 
                  style="width: 60px;" >
                    <el-option
                      v-for="item in adultOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                <span class="ac-select-note-text">18岁及以上</span>
            </div>

            <div class="ac-select-item-wrap m-l">
                <label class="ac-select-item-label">小孩</label>
                <el-select 
                  v-model="getChildrenNum" 
                  size="mini" 
                  style="width: 60px;" >
                    <el-option
                      v-for="item in ChildrenOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                <span class="ac-select-note-text">0-17岁</span>
                <el-tooltip class="item" effect="dark" placement="right-end" popper-class="age-notify-popper" visible-arrow="false">
                  <div slot="content">18周岁及以上为成人，<br>0-17周岁未成年请参照各酒店入住政策。</div>
                  <i class="ac-select-info"></i>
                </el-tooltip>
            </div>
        </div>

        <el-collapse-transition>
          <div v-if="getChildrenNum > 0" class="ac-select-row row-two">
              <div class="ac-select-item-wrap">
                  <label class="ac-select-item-label">儿童入住时年龄</label>
                  <div class="ac-select-children-age-wrap">
                      <el-select 
                        v-model="childAge1" 
                        size="mini" 
                        style="width: 68px;"
                        @change="setChildrenStr()" >
                          <el-option
                            v-for="item in ChildrenAgeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>

                      <el-select 
                        v-if="getChildrenNum > 1"
                        v-model="childAge2" 
                        size="mini" 
                        style="width: 68px;"
                        @change="setChildrenStr()" >
                          <el-option
                            v-for="item in ChildrenAgeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>

                      <el-select 
                        v-if="getChildrenNum > 2"
                        v-model="childAge3" 
                        size="mini" 
                        style="width: 68px;"
                        @change="setChildrenStr()" >
                          <el-option
                            v-for="item in ChildrenAgeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>
                  </div>
              </div>
          </div>
        </el-collapse-transition>

    </section>

    <el-input
      size="small"
      slot="reference"
      placeholder="成人小孩"
      class="adult-children-input"
      suffix-icon="el-icon-arrow-down"
      readonly
      v-model="getAdultChildrenText" >
    </el-input>

  </el-popover>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      visible: false,

      adultOptions: [
        { value: '1', label: '1人' },
        { value: '2', label: '2人' },
        { value: '3', label: '3人' },
        { value: '4', label: '4人' },
        { value: '5', label: '5人' },
        { value: '6', label: '6人' },
        { value: '7', label: '7人' },
      ],
      ChildrenOptions: [
        { value: '0', label: '0人' },
        { value: '1', label: '1人' },
        { value: '2', label: '2人' },
        { value: '3', label: '3人' },
      ],
      ChildrenAgeOptions: [
        { value: '0', label: '<1岁' },
        { value: '1', label: '1岁' },
        { value: '2', label: '2岁' },
        { value: '3', label: '3岁' },
        { value: '4', label: '4岁' },
        { value: '5', label: '5岁' },
        { value: '6', label: '6岁' },
        { value: '7', label: '7岁' },
        { value: '8', label: '8岁' },
        { value: '9', label: '9岁' },
        { value: '10', label: '10岁' },
        { value: '11', label: '11岁' },
        { value: '12', label: '12岁' },
        { value: '13', label: '13岁' },
        { value: '14', label: '14岁' },
        { value: '15', label: '15岁' },
        { value: '16', label: '16岁' },
        { value: '17', label: '17岁' },
      ],
      childAge1: '0',
      childAge2: '0',
      childAge3: '0',
    }
  },

  computed: {
    // 获取成人数
    getAdultNum: {
      get: function () {
        return +this.$store.state.adultNum
      },
      set: function (newValue) {
        this.$store.commit('setCommonState', {t: 'adultNum', v: newValue})
      }
    },

    // 获取小孩数
    getChildrenNum: {
      get: function () {
        return +this.$store.state.childrenNum
      },
      set: function (newValue) {
        this.childAge1 = '0'
        this.childAge2 = '0'
        this.childAge3 = '0'

        this.$store.commit('setCommonState', {t: 'childrenNum', v: newValue})
        this.setChildrenStr()
      }
    },

    // 根据成人数和小孩数，计算出 input 框该显示的文字，如：'2成人，1小孩'
    getAdultChildrenText(){
      return `${this.$store.state.adultNum}成人，${this.$store.state.childrenNum}小孩`
    },
  },
  
  methods: {
    // 设置小孩年龄字符串，如：'1,0,1'
    setChildrenStr(){
      let ageArr = [this.childAge1, this.childAge2, this.childAge3]

      // 这里要根据小孩数改变小孩年龄数组的长短
      ageArr.length = this.getChildrenNum

      this.$store.commit('setCommonState', {t: 'childrenStr', v: ageArr.join(',')})
    },
  },

  created(){
    // 初始化每个小孩的年龄
    let ageArr = this.$store.state.childrenStr.split(',')
    this.childAge1 = ageArr[0] || '0'
    this.childAge2 = ageArr[1] || '0'
    this.childAge3 = ageArr[2] || '0'
  }
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">
.adult-children-input{
  .el-input__inner{
    cursor: pointer;
  }
}

.ac-select-wrap{
  .el-input__inner{
    font-size: 14px;
    padding: 0 10px;
    border-radius: 0;
  }
  
  .el-input--suffix .el-input__inner {
    padding-right: 25px;
    text-align: center;
  }
  
  .el-input__suffix{
    right: 0;
  }

  .el-select{
    margin: 0 5px;
  }
}

.el-select-dropdown__item{
  padding: 0 10px!important;
}

.age-notify-popper{
  &.el-tooltip__popper.is-dark{
    background: #7ea5f4;
  }

  &.el-tooltip__popper[x-placement^=right] .popper__arrow, &.el-tooltip__popper[x-placement^=right] .popper__arrow::after{
    border-right-color: #7ea5f4!important;
  }

  &.el-tooltip__popper[x-placement^=left] .popper__arrow, &.el-tooltip__popper[x-placement^=left] .popper__arrow::after{
    border-left-color: #7ea5f4!important;
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/jl_sprites.scss";

.ac-select-wrap{
    font-size: 14px;
    min-width: 376px;
    min-width: 386px\9;
    max-height: 137px;
    background: white;
    box-shadow: 0 1px 5px #ababab;
    overflow: hidden;
    z-index: 9999;

    @at-root .ac-select-row{
        margin: 0 10px;
        padding: 20px 0;
        overflow: hidden;

        @at-root .ac-select-item-wrap{
            float: left;
            
            &.m-l{
                margin-left: 25px;
            }

            .select{
                width: 50px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #aaa;
                transition: all 0.2s linear 0s;
                cursor: context-menu;

                &.ac-select-children-age{
                    width: 60px;
                }

                &:hover,
                &:active,
                &:focus{
                    border-color: rgb(100, 191, 224);
                    box-shadow: 0 0 5px rgb(100, 191, 224);
                }
            }
            
            @at-root .ac-select-note-text{
                color: #aaa;
            }

            @at-root .ac-select-info{
                @include jl_sprites;
                @include info_logo;
                position: relative;
                display: inline-block;
                top: 2px;
                margin-left: 2px;
            }
            
            @at-root .ac-select-children-age-wrap{
                display: inline-block;
                margin-left: 20px;

                .drag-down-wrap{
                    margin-left: 5px;
                }
            }
        }

        &.row-two{
            border-top: 1px dashed #aaa;
        }

    }
}
</style>