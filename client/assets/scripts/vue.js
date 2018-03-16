new Vue({
    el: '#app',
    data: {
        postImages: [
            {
                id: '01',
                title: 'Broccoli House',
                image: 'https://wallpaperbrowse.com/media/images/750806.jpg',
                desc: 'This is a broccoli house',
                author: 'cecha'
            },
            {
                id: '02',
                title: 'Plane On a Forest',
                image: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=85740266a52ea733187e9775fdf8d2d5&w=1000&q=80',
                desc: 'Pesawatnya kevin rusak',
                author: 'kevin'
            },
            {
                id: '03',
                title: 'Plane On a Forest asasasa',
                image: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=85740266a52ea733187e9775fdf8d2d5&w=1000&q=80',
                desc: 'Pesawatnya kevin rusak lagi',
                author: 'kevin'
            },
            {
                id: '04',
                title: 'Plane On a Forest asasasa',
                image: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=85740266a52ea733187e9775fdf8d2d5&w=1000&q=80',
                desc: 'Pesawatnya kevin rusak lagi',
                author: 'cecha'
            }
        ],
        image: [],
        formData: new FormData(),
    },
    methods:{
        uploadtest:function(){
            if(this.image.length > 0){
                for(let i = 0; i < this.image.length; i++){
                    let file = this.image[i];
                    this.formData.append('image',file, file.name)
                }
            //     var formData = new FormData();

            // for (var i = 0; i < files.length; i++) {
            //     var file = files[i];
            //     formData.append('pictures', file, file.name);
            // }
            }
            console.log(this.formData)
            
            // this.formData.set('image', this.image)
            // console.log(this.formData)
            axios.post('http://localhost:3000/upload',this.formData)
        },
        ambilFileNya: function(event){
            let img = event.target.files
            console.log(img)
            Object.keys(img).forEach(value => {
                this.image.push(img[value])
            })
           
            console.log(this.image)
        }
    }
})