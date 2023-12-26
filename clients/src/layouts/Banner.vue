<template>
    <div class="container-fluid bg-light">
	<div id="myCarousel" class="carousel slide" data-ride="carousel">
  		<ol class="carousel-indicators">
    		<li data-target="#myCarousel" data-slide-to="d1" class="active"></li>
    		<li data-target="#myCarousel" data-slide-to="d2"></li>
  		</ol>
  	<div class="text-center carousel-inner">
		<template v-if="$store.state.curShowPetType == 'd1'">
    		<div class="carousel-item active">
      			<img src="../assets/commonResource/bannerImage/dogBanner1.jpg" width="1230" height="500" alt="First slide">
    		</div>
    		<div class="carousel-item">
	      		<img src="../assets/commonResource/bannerImage/dogBanner2.jpg" width="1230" height="500" alt="Second slide">
    		</div>
		</template>
		<template v-else>
			<div class="carousel-item active">
      			<img src="../assets/commonResource/bannerImage/catBanner1.jpg" width="1230" height="500" alt="First slide">
    		</div>
    		<div class="carousel-item">
	      		<img src="../assets/commonResource/bannerImage/catBanner2.jpg" width="1230" height="500" alt="Second slide">
    		</div>
		</template>
  	</div>
  	<a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
    	<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    	<span class="sr-only">Previous</span>
  	</a>
  	<a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
    	<span class="carousel-control-next-icon" aria-hidden="true"></span>
    	<span class="sr-only">Next</span>
  	</a>
	</div>
</div>
</template>