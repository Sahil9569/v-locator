<template>
    <v-container class="maxWidth special-section">
        <v-row class="justify-center">
            <v-col cols="12" lg="8" sm="10" data-aos="fade-up" data-aos-duration="500">
                <h2 class="text-center mb-4  sectionTitle font-weight-bold">
                    Our <span class="text-primary">Special Dishes</span>
                </h2>
            </v-col>
        </v-row>
        <div class="d-flex justify-center"><v-chip class="bg-primary text-white">Delicous Memory</v-chip></div>
        <v-row class="mt-10">
            <v-col cols="12" md="4" class="opening-column mb-lg-0 mb-5">
                <div class="inner-box-mnu wow slideInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" style="visibility: visible; animation-duration: 1500ms; animation-delay: 0ms; animation-name: slideInLeft;">
                    <div class="title-box-mn">Opening Hours</div>
                    <ul>
                        <li>Monday — Friday<br>9:00 am - 23:00 pm</li>
                        <li>Saturday<br>10:00 am - 22:00 pm</li>
                        <li>Sunday<br>10:00 am - 21:00 pm</li>
                        <li>Note: V Locator Restaurant is closed on holidays.</li>
                        <li class="number-mnu">0844.335.1211</li>
                    </ul>
                </div>
            </v-col>
            <v-col cols="12" md="8" class="dishes-column-mnu">
                <div class="inner-box-mnu">
                    <div class="special-dish-mnu pb-8 mb-10">
                        <div class="inner-content-mnu">
                            <v-row class="align-center">
                                <v-col cols="12" lg="8" md="7" class="content-column order-2 order-md-1 text-md-start text-center">
                                    <h3 class="mb-4 text-3">Honey Strawberry</h3>
                                    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor nequeu tellus rhoncus ut eleifend nibh porttitor ut in nulla enim hasellus mirolestie magna non lorem ipsum dolor site amet.</p>
                                </v-col>
                                <v-col class="image-column order-1 order-md-2" col="12" md="5" lg="4">
                                    <div class="inner">
                                        <figure class="image-box">
                                            <img src="http://www.d.commonsupport.com/artica/wp-content/uploads/2017/01/special-1.jpg" alt="">
                                            <!--Overlay Box-->
                                            <div class="overlay-box">
                                                <div class="price">$50.35</div>
                                            </div>
                                        </figure>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                    <div class="special-dish-mnu">
                        <div class="inner-content-mnu">
                            <v-row class="align-center ">
                                <v-col class="image-column" cols="12" md="5" lg="4">
                                    <div class="inner">
                                        <figure class="image-box">
                                            <img src="http://www.d.commonsupport.com/artica/wp-content/uploads/2017/01/special-1.jpg" alt="">
                                            <!--Overlay Box-->
                                            <div class="overlay-box">
                                                <div class="price">$50.35</div>
                                            </div>
                                        </figure>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="7" lg="8" class="content-column text-md-start text-center">
                                    <h3 class="mb-4 text-3">Honey Strawberry</h3>
                                    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor nequeu tellus rhoncus ut eleifend nibh porttitor ut in nulla enim hasellus mirolestie magna non lorem ipsum dolor site amet.</p>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<style>
.special-dish-mnu:not(:last-child) {
    position: relative;
    border-bottom: 1px dashed #d5d5d5;
}
.special-dish-mnu .image-column{
	position:relative;
	margin-bottom:0px;
}

.special-dish-mnu .image-column .inner{
	position:relative;
}

.special-dish-mnu .inner-content-mnu:hover .image-column .inner .image-box .overlay-box{
	opacity:1;
}

.special-dish-mnu .image-column .inner .image-box{
	position:relative;
	width:206px;
	border-radius:50%;
	overflow:hidden;
    margin:0 auto;
}

.special-dish-mnu .image-column .inner .image-box .overlay-box{
	position:absolute;
	content:'';
	left:0px;
	top:0px;
	width:100%;
	height:100%;
	display:block;
	text-align:center;
	border-radius:50%;
	background-color:rgba(64,180,15,0.6);
	-moz-transition:all 500ms ease;
	-webkit-transition:all 500ms ease;
	-ms-transition:all 500ms ease;
	-o-transition:all 500ms ease;
	transition:all 500ms ease;
	opacity:0;
}
.special-dish-mnu .image-column .inner .image-box img{
	width:100%;
	display:block;
}
.special-dish-mnu .image-column .inner .image-box .overlay-box .price{
	position:relative;
	width:100%;
	height:100%;
	display:block;
	color:#ffffff;
	font-size:24px;
	line-height:200px;
	font-weight:700;
}
.special-section .opening-column{
	position:relative;
	padding-right:45px;
	margin-bottom:50px;
}
.special-section .opening-column .inner-box-mnu{
	position:relative;
	padding:32px 30px;
	background-size:cover;
	outline: 1px dashed #818181;
	outline-offset: -30px;
	background:url(http://www.d.commonsupport.com/artica/wp-content/themes/arctica/images/background/opening-bg.jpg);
}

.opening-column .inner-box-mnu .title-box-mn{
	position:relative;
	font-size:14px;
	color:rgb(64,180,15);
	margin-top:-4px;
	min-height:42px;
	text-align:center;
	line-height: 32px;
	margin-bottom:50px;
	background:url(http://www.d.commonsupport.com/artica/wp-content/themes/arctica/images/resource/title-bg.png) center top no-repeat;
}

.opening-column .inner-box-mnu ul{
	position:relative;
	text-align:center;
    list-style-type: none;
}

.opening-column .inner-box-mnu ul li{
	color:#ffffff;
	font-size:14px;
	margin-bottom:26px;
}

.opening-column .inner-box-mnu ul .number-mnu{
	color:rgb(64,180,15);
	font-size:25px;
	font-weight:700;
	margin:60px 0px 25px 0px;
	/* font-family: 'Dancing Script', cursive; */
}

.dishes-column-mnu{
	position:relative;
}

.dishes-column-mnu .inner-box-mnu{
	position:relative;
	padding-left:40px;
}
</style>