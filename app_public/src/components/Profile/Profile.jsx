import React, { useContext, useRef } from 'react';

import img1 from '../../public/images/logo.png';

import './Profile.css';




export default function Profile() {

    // useRef instead of useState
   
    
    

    return (
        
           
        <section class="login pt-0 ">
            <nav class="navbar navbar-expand-lg navbar-light ">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><img src="images/logo.png" height="60px" width="60px" /></a>
                </div>
            </nav>


            <div class="create-img1">
                <div class="content">
                    <h1><span>FOODHUNTER</span></h1>
                    <span class="cen>">MANAGE YOUR PROFILE</span>

                </div>
                

            </div>

            


            <div class="container">

                <div class="col bg-white mt-5 mb-5">


                    <div class="row">
                        <div class="col-md-3 border-right">
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img class="rounded-circle mt-4" width="150px" src="images/File_000%20(1).jpeg"/>
                                <span class="font-weight-bold">Ananthu</span><span class="text-black-50">ananthu@gmail.com</span><span> </span>
                            </div>
                        </div>
                        <div class="col-md-5 border-right">
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h4 class="text-right">Profile Settings</h4>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="first name" value=""/></div>
                                    <div class="col-md-6"><label class="labels">LastName</label><input type="text" class="form-control" value="" placeholder="lastname"/></div>

                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-3"><label class="labels">Date Of Birth</label><input type="text" class="form-control" placeholder="day" value="" /></div>
                                    <div class="col-md-3"><label class="labels"></label><input type="text" class="form-control" value="" placeholder="month"/></div>
                                    <div class="col-md-3"><label class="labels"></label><input type="text" class="form-control" value="" placeholder="year"/></div>

                                </div>

                                <div class="row mt-3">

                                    <div class="col-md-12"><label class="labels">Mobnile Number</label><input type="text" class="form-control" placeholder="enter phone number" value=""/></div>
                                    <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder="enter email id" value=""/></div>

                                    <div class="col-md-12"><label class="labels">Address 1</label><input type="text" class="form-control" placeholder="enter address line 1" value=""/></div>
                                    <div class="col-md-12"><label class="labels">Address 2</label><input type="text" class="form-control" placeholder="enter address line 2" value=""/></div>
                                    <div class="col-md-12"><label class="labels">Region</label><input type="text" class="form-control" placeholder="Region/State/Province" value=""/></div>
                                    <div class="col-md-12"><label class="labels">City</label><input type="text" class="form-control" placeholder="City" value=""/></div>

                                    <div class="col-md-12"><label class="labels">Zip code</label><input type="text" class="form-control" placeholder="Zip code" value=""/></div>
                                    <div class="col-md-12"><label class="labels">Country</label><input type="text" class="form-control" placeholder="Country" value=""/></div>



                                    
                                </div>

                                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center experience"><span>Edit Bio</span><span class="border px-3 p-1 add-bio"><i class="fa fa-plus"></i>&nbsp;Bio</span>
                                </div>
                                <br/>
                                <div class="col-md-12">
                                    <label class="labels">Bio</label>
                                    <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>
                                </div> <br/>
                                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save bio</button></div>

                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div class="container">

                <div class="col bg-white mt-5 mb-5 ">
                    <div class="tabbable ">
                        <h4 class="text-left pt-5 pl-5">Posts</h4>
                        
                        <ul class="nav nav-tabs p-5">
                            <li class="active bg-white ">
                                <a href="#tab1" data-toggle="tab">Photos</a></li><span>...</span>
                            <li class="active ">
                                <a href="#tab2" data-toggle="tab">Videos</a></li>
                        </ul>
                        <div class="tab-content ">
                            <div class="tab-pane active" id="tab1">





                                <section class="gallery p-0 ">
                                    <div class="container-lg">
                                        <div class="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
                                            <div class="col">
                                                <img src="images/spaghetti-2931846_1920.jpg" width="200px" height="200px" class="gallery-item" alt="gallery"/>
                                            </div>
                                            <div class="col">
                                                <img src="images/spaghetti-2931846_1920.jpg" width="200px" height="200px" class="gallery-item" alt="gallery" class="gallery-item" alt="gallery"/>
                                            </div>
                                            <div class="col">
                                                <img src="images/spaghetti-2931846_1920.jpg" width="200px" height="200px" class="gallery-item" alt="gallery" class="gallery-item" alt="gallery"/>
                                            </div>
                                            <div class="col">
                                                <img src="images/spaghetti-2931846_1920.jpg" width="200px" height="200px" class="gallery-item" alt="gallery" class="gallery-item" alt="gallery"/>
                                            </div>
                                            <div class="col">
                                                <img src="images/eiliv-sonas-aceron-ZuIDLSz3XLg-unsplash.jpg" width="200px" height="200px" class="gallery-item" alt="gallery" class="gallery-item" alt="gallery"/>
                                            </div>
                                            <div class="col">
                                                <img src="images/eiliv-sonas-aceron-ZuIDLSz3XLg-unsplash.jpg" width="200px" height="200px" class="gallery-item" alt="gallery" class="gallery-item" alt="gallery"/>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="gallery-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                {/* <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> --> */}
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <img src="img/1.jpg" class="modal-img" alt="modal img" />
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>
                            <div class="tab-pane" id="tab2">
                                <p>Howdy, I'm in Section 2.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </section>
        
    )
}


