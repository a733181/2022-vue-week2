const app = Vue.createApp({
  data() {
    return {
      email: {
        isValue: false,
        value: '',
      },
      password: {
        isValue: false,
        value: '',
      },
      token: '',
    };
  },
  methods: {
    submitForm() {
      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValue = true;
        return;
      }
      if (this.password.value === '') {
        this.password.isValue = true;
        return;
      }

      axios
        .post('https://vue3-course-api.hexschool.io/v2/admin/signin', {
          username: this.email.value,
          password: this.password.value,
        })
        .then((res) => {
          // console.log(res.data);
          this.token = res.data.token;
          const expired = new Date(res.data.expired).toUTCString();
          document.cookie = `token=${this.token};expires=${expired};`;
          window.location = 'products.html';
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
});

app.mount('#app');
