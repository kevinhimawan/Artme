new Vue({
    el: '#app',
    data: {
        postImages: [],
        image: [],
        formData: new FormData(),
        userid: ""
    },
    created:function(){
        axios.get('http://localhost:3000/home/')
        .then(response=>{
            this.postImages = response.data
            this.userid = localStorage.getItem('userid')
            console.log(response.data)
        })
    },
    methods:{
        uploadtest:function(){
            if(this.image.length > 0){
                for(let i = 0; i < this.image.length; i++){
                    let file = this.image[i];
                    this.formData.append('image',file, file.name)
                }
            }
            axios.post('http://localhost:3000/upload',this.formData)
        },
        ambilFileNya: function(event){
            let img = event.target.files
            Object.keys(img).forEach(value => {
                this.image.push(img[value])
            })
        },
        loginpage:function(){
            window.location.href = 'login.html'
        },

        likeFunction:function(postid,user,likelist){
            let data = {
                user: user,
                post: postid
            }
            const index = likelist.indexOf(this.userid)
            if(index === -1){
                axios.post('http://localhost:3000/home/like',data)
                .then(response=>{
                    window.location.href='index.html'
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                $('#validasi_like')
            }
            
        },
        logout:function(){
            localStorage.clear()
            window.location.href = 'login.html'
        }
    }
})