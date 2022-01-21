const app = Vue.createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2/api/',
      products: '',
      index: null,
    };
  },
  computed: {
    productDetail() {
      const products = this.products[this.index];
      return products;
    },
  },
  methods: {
    checkLogin() {
      axios
        .post(`${this.url}user/check`)
        .then(() => {
          this.getProductsData();
        })
        .catch(() => {
          window.location = 'index.html';
        });
    },
    getProductsData() {
      axios
        .get(`${this.url}tita/admin/products/all`)
        .then((res) => {
          const { products } = res.data;
          this.products = products;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    productView(index) {
      this.index = index;
    },
  },
  created() {
    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common.Authorization = cookieToken;
    this.checkLogin();
  },
});

app.mount('#app');
