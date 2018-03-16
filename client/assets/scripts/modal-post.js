Vue.component("modal-post", {
  props: ["postimages"],
  template: `
  <div class="container">
    <div class="asal" v-for="content in postimages">
        <div class="modal fade" v-bind:id="content.id" tabindex="-1" role="dialog" aria-labelledby="PostModalLongTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="row">
                        <div class="col-md-8 p-auto">
                            <img class="img-fluid" :src="content.image" alt="" srcset="">
                        </div>
                        <div class="col-md-4">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-md-8">NAMA USER</div>
                                        <div class="col-md-4">
                                            <img class="img-fluid" src="https://mir-s3-cdn-cf.behance.net/user/115/149498.53abdaff21602.jpg" alt="">
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">{{content.title}}</li>
                                <li class="list-group-item">
                                    <button type="button" class="btn btn-primary btn-sm">Share Button</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 pt-2">
                            <h3 class="pl-2">Description</h3>
                            <p class="px-2">{{content.desc}}</p>
                        </div>
                    </div>
                    <ul class="list-unstyled border-top">
                        <li class="media p-2">
                            <img class="mr-3 img-fluid" style="width:50px;height:auto" src="https://mir-s3-cdn-cf.behance.net/user/115/9178452157975.5a85a66eefb5f.jpg"
                                alt="Generic placeholder image">
                            <div class="media-body">
                                <h5 class="mt-0 mb-1">Nama User</h5>
                                precise and perfect detailing... just loved it..
                            </div>
                        </li>
                        <li class="media p-2">
                            <img class="mr-3 img-fluid" style="width:50px;height:auto" src="https://mir-s3-cdn-cf.behance.net/user/115/9178452157975.5a85a66eefb5f.jpg"
                                alt="Generic placeholder image">
                            <div class="media-body">
                                <h5 class="mt-0 mb-1">Nama User</h5>
                                precise and perfect detailing... just loved it..
                            </div>
                        </li>
                        <li class="media p-2">
                            <img class="mr-3 img-fluid" style="width:50px;height:auto" src="https://mir-s3-cdn-cf.behance.net/user/115/9178452157975.5a85a66eefb5f.jpg"
                                alt="Generic placeholder image">
                            <div class="media-body">
                                <h5 class="mt-0 mb-1">Nama User</h5>
                                precise and perfect detailing... just loved it..
                            </div>
                        </li>
                        <li class="media p-2">
                            <img class="mr-3 img-fluid" style="width:50px;height:auto" src="https://mir-s3-cdn-cf.behance.net/user/115/9178452157975.5a85a66eefb5f.jpg"
                                alt="Generic placeholder image">
                            <div class="media-body">
                                <h5 class="mt-0 mb-1">Nama User</h5>
                                precise and perfect detailing... just loved it..
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
  </div>`
});