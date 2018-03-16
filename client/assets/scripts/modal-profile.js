Vue.component('modal-profile', {
  props: ["postimages"],
  template: `
  <div class=container>
      <div v-for="post in postimages">
            <div class="modal fade" :id="post.user.username" tabindex="-1" role="dialog" aria-labelledby="ProfileModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-3" v-for="postdetail in postimages" v-if="postdetail.author === post.author">
                                    <div class="card">
                                    
                                        <img class="card-img-top" :src="postdetail.file[1].path" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">{{postdetail.id}}</h5>
                                            <p class="card-text">{{postdetail.desc}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>`
});
