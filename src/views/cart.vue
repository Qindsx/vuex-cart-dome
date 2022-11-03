<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="cartProducts" style="width: 100%">
      <el-table-column width="55">
        <template v-slot:header>
          <el-checkbox
            :value="isAllChecked"
            @change="updateProductChecked"
            size="mini"
          >
          </el-checkbox>
        </template>
        <!--
          @change="updateProductChecked"  默认参数：更新后的值
          @change="updateProductChecked(productId, $event)"  123, 原来那个默认参数
            当你传递了自定义参数的时候，还想得到原来那个默认参数，就手动传递一个 $event
         -->
        <template v-slot="scope">
          <el-checkbox v-model="scope.row.isChecked"> </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品"> </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="count" label="数量">
        <template v-slot="scope">
          <el-input-number
            :min="1"
            v-model="scope.row.count"
            @change="changeProductCount(scope.row.id)"
            size="mini"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="小计"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="removeCart(scope.row.id)" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>
        已选 <span>{{ totalCount }}</span> 件商品，总价：<span>{{
          totalPrice
        }}</span>
      </p>
      <el-button @click="changBack" type="danger">返回</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "Cart",
  computed: {
    ...mapState("cart", ["cartProducts"]),
    ...mapGetters("cart", ["totalCount", "totalPrice"]),
    isAllChecked() {
      return (
        this.cartProducts.length !== 0 &&
        this.cartProducts.every(item => item.isChecked)
      );
    }
  },
  methods: {
    ...mapMutations("cart", ["changeProductCount", "removeCart"]),
    updateProductChecked() {
      console.log(this.cartProducts);
      this.cartProducts.forEach(item => {
        item.isChecked = !item.isChecked;
      });
    },
    changBack(){
      console.log('123123');
      this.$router.go(-1)
    }
  }
};
</script>

<style></style>
