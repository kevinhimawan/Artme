new Vue({
    el: '#loginPage',
    data:{
        username: '',
        email:'',
        password: '',
    },
    created:function(){
        const token = localStorage.getItem('token')
        if(token){
            window.location.href = 'index.html'
        }
    },
    methods:{
        login:function(){
            let userLogin = {
                username: this.username,
                password: this.password
            }
            console.log(userLogin);
            axios.post('http://35.197.143.172/login/login',userLogin)
            .then(response=>{
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('userid',response.data.userid)

                window.location.href = 'index.html'
            })
            .catch(err=>{
                // console.log(err)
            })
        },
        signUp:function() {
            let data = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            console.log(data)
            axios.post('http://35.197.143.172/login/create', data)
                .then(response=>{
                    alert('signup berhasil')
                    window.location.href='login.html'
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
})