new Vue({
    el: '#loginPage',
    data:{
        username: '',
        password: '',
    },
    methods:{
        login:function(){
            let userLogin = {
                username: this.username,
                password: this.password
            }
            console.log(userLogin);
            axios.post('http://localhost:3000/login/login',userLogin)
            .then(response=>{
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('userid',response.data.userid)

                window.location.href = 'index.html'
            })
            .catch(err=>{
                // console.log(err)
            })
        }
    }
})