<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
       <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @change="changeStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @change="changeEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads">{{head.label}}</th>
        </tr>
        <tr v-for="item in tableData">
         	<td v-for="head in tableHeads">
         		{{item[head.key]}}
         	</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/selection.vue'
import VDatePicker from '../components/datePicker.vue'
import _ from 'lodash'
export default {
  components: {
    VSelection,
    VDatePicker
  },
   methods:{
    	productChange(obj){
    		this.productId=obj.value
    		this.getTableData()
    	},
    	changeStartDate(date){
    		this.startDate=date;
    		this.getTableData()
    	},
    	changeEndDate(date){
    		this.endDate=date;
    		this.getTableData()
    	},
    	getTableData(){
    		let reqParam={
    			query:this.query,
    			productId:this.productId,
    			startDate:this.startDate,
    			endDate:this.endDate,
    		}
    		this.$http.post('/api/getOrderList',reqParam)
    		.then((res)=>{
    			this.tableData=res.data.list
    		},(err)=>{

    		})
    	}
    },
    mounted(){
    	this.getTableData()
    },
   watch:{
   		query(){
   			this.getTableData()
   		}
   },
  data () {
    return {
    	tableData:[],
	    productId:0,
	    query:'',
	    endDate:'',
	    startDate:'',
	    products: [
	        {
	          label: '数据统计',
	          value: 0
	        },
	        {
	          label: '数据预测',
	          value: 1
	        },
	        {
	          label: '流量分析',
	          value: 2
	        },
	        {
	          label: '广告发布',
	          value: 3
	        }],
	      tableHeads: [
	        {
	          label: '订单号',
	          key: 'orderId'
	        },
	        {
	          label: '购买产品',
	          key: 'product'
	        },
	        {
	          label: '版本类型',
	          key: 'version'
	        },
	        {
	          label: '有效时间',
	          key: 'period'
	        },
	        {
	          label: '购买日期',
	          key: 'date'
	        },
	        {
	          label: '数量',
	          key: 'buyNum'
	        },
	        {
	          label: '总价',
	          key: 'amount'
	        }]
	    }
	}
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
