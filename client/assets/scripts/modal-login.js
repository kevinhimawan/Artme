Vue.component ('modal-login', {
    template: `
    <div class="modal fade" id="LoginModalCenter" tabindex="-1" role="dialog" aria-labelledby="LoginModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="background-color: #d3d3d3;">
                <div class="modal-header">
                    <h4 class="modal-title" id="LoginModalCenterTitle">Login To Your Account</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body" style="background-color: #fff">
                    <p class="text-center">Login Here</p>
                </div>
            </div>
        </div>
    </div>
    `
})