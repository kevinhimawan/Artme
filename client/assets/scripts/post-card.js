Vue.component ('post-card', {
    props: ['postimages'],
    template: `
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12" style="padding: 15px" v-for="content in postimages">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <h5 class="card-title" style="margin: auto">{{content.title}}</h5>
                        </div>
                        <img class="img-fluid" :src="content.file[1].path" alt="Card image cap" data-toggle="modal" :data-target="\'#\'+content._id">
                        <div class="card-body">
                            <p class="card-text">{{content.description}}</p>
                            <a href="#" class="card-link" style="color: gray">
                                <i class="fas fa-thumbs-up"></i>
                                <a href="#" class="card-link float-right" style="color: gray" data-toggle="modal" :data-target="\'#\'+content.user.username">{{content.user.username}}</a>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})

