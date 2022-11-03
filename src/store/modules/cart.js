const state = {
  cartProducts: []
};
const getters = {
  // totalCount
  totalCount(state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0);
  },
  // totalPrice

  totalPrice(state) {
    let totalPrice = state.cartProducts.reduce(
      (sum, prod) => sum + prod.totalPrice,
      0
    );

    totalPrice = Number(totalPrice).toFixed(2);
    console.log(totalPrice);
    return totalPrice;
  }
};
const mutations = {
  addToCart(state, product) {
    // 1 购物车中没有该商品。把该商品添加到数组中，添加count, totalPrice
    // 2 有该商品就让商品的count加以1，选中,计算小计
    const prod = state.cartProducts.find(item => item.id === product.id);
    if (prod) {
      prod.count += 1;
      prod.isChecked = true;
      prod.totalPrice = prod.count * prod.price;
      prod.totalPrice.toFixed(2);
    } else {
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      });
    }
    console.log(state.cartProducts);
  },
  removeCart(state, prodId) {
    const prodIndex = state.cartProducts.find(item => item.id === prodId);
    prodIndex !== -1 && state.cartProducts.splice(prodIndex, 1);
    console.log(state.cartProducts);
  },
  changeProductCount(state, prodId) {
    const prod = state.cartProducts.find(item => item.id === prodId);
    if (prod) {
      prod.totalPrice = Number((prod.price * prod.count).toFixed(2));
    }
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
