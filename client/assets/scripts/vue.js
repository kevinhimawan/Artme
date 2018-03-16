new Vue({
    el: '#app',
    data: {
        postImages: [],
        image: [],
        formData: new FormData(),
        userid: "",
        categories: [],
        title: "",
        description: "",
        getCategory: "",
        username: "",
        email: "",
        password: ""
    },
    created:function(){
        axios.get('http://35.197.143.172/home/')
        .then(response=>{
            this.postImages = response.data
            this.userid = localStorage.getItem('userid')
            axios.get('http://35.197.143.172/home/getcategory')
            .then(response=>{
                this.categories = response.data
                console.log(this.postImages)
            })
        })
    },
    methods:{
        uploadPost:function(){
            if(this.image.length > 0){
                for(let i = 0; i < this.image.length; i++){
                    let file = this.image[i];
                    this.formData.append('image',file, file.name)
                }
            }

            let formData = this.formData
            formData.append('title',this.title)
            formData.append('user',this.userid)
            formData.append('category',this.getCategory)
            formData.append('description',this.description)
            axios.post('http://35.197.143.172/home/createPost',formData,
            { headers: {
              'Content-type': 'multipart/form-data',
              }
            })
            .then(response=>{
                this.formData = new FormData()
                window.location.href = 'index.html'

            })
            .catch(err=>{
                console.log('errpr')
                this.formData = new FormData()
                window.location.href = 'index.html'
            })
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
                axios.post('http://35.197.143.172/home/like',data)
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