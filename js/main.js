

//  about section tabs 
(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {

        //   if event.target contains 'tab-item' class and not contains 'active' class 

        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            // console.log("event.target contains 'tab-item' class and not contains 'active' class");

            // console.log(event.target);
            const target = event.target.getAttribute("data-target");
            // console.log(target);
            //deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // activate new 'tab-item'
            event.target.classList.add("active", "outer-shadow");
            //deactivate existing active 'tab-item'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            //activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }

    })
})();


function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}

// ----------------------------------------------portfolio filter and popup --------------------------------------
//    fat arrow fn 
(() => {

    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item");
    // console.log(portfolioItems)   
    //    output 6 nodelist 
    popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screensots;


    //filter portfolio items

    filterContainer.addEventListener("click", (event) => {
        // console.log(event.target)
        // output:- get the value of tab 
        // console.log(event.target.classList)

        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {
            // console.log("true"); 
            // output:- return without all 

            //deactivate existing active 'filter-item'

            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            // activate new 'filter item'

            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            //   console.log(target); 
            //    output:- get  particular value of tab 
            portfolioItems.forEach((item) => {
                //   console.log(item)
                //   output:-get all data tabs 
                // console.log(item.getAttribute("data-category"))
                // output:- get  particular value of tab
                if (target === item.getAttribute("data-category") || target === 'all') {
                    // console.log(item.classList)
                    item.classList.remove("hide");
                    item.classList.add("show");

                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })

        }
        else {
            // console.log("false");
        }
    })


    portfolioItemsContainer.addEventListener("click", (event) => {
        //   console.log(event.target);
        //    output:- get the tab images click on view product 
        // console.log(event.target.closest(".portfolio-item-inner"))
        //  output:- get  portfolioItem innr div 
        {
            const portfolioItem = event.target.closest(".portfolio-item-inner").
                parentElement;
            //  console.log(parentElement); 
            //  console.log(portfolioItem);
            //  output:- get  portfolioItem innr div 


            // get the portfolioItem index

            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

            //  console.log(itemIndex);
            //  output:-get the portfolioItem index 


            screensots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // console.log(screensots);
            // output:- get ss images particular project vice 

            //   convert scrrenshots to array 
            screensots = screensots.split(",");
            if (screensots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            // console.log(screensots);
            //   output:- get array of ss 

            slideIndex = 0;
            popupToggle();
            popupSlidershow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlidershow() {
        const imgSrc = screensots[slideIndex];
        console.log(imgSrc);
        //  output:- get particular click event project images 
        const popupImg = popup.querySelector(".pp-img");
        // activate loader until the popupImg  loaded
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            //deactivate loader after the popupimg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        // pages related 
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + "of" + screensots.length;
    }

    //    next slide 

    nextBtn.addEventListener("click", () => {
        if (slideIndex === screensots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlidershow();
        //  console.log("slideIndex:" + slideIndex);
    })

    //prev slide 

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screensots.length - 1
        }
        else {
            slideIndex--;
        }
        popupSlidershow();
        //   console.log("slideIndex:" + slideIndex);
    })

    function popupDetails() {

        //if portfolio-item-details not exists

        if (!portfolioItems[itemIndex].querySelector(".portfollio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return; //end fn
        }
        //  get portfolio item details  
        // console.log(detalis)
        projectDetailsBtn.style.display = "block";
        //get the project details
        const detalis = portfolioItems[itemIndex].querySelector(".portfollio-item-details").innerHTML;
        //set the project detais
        popup.querySelector(".pp-project-details").innerHTML = detalis;

        //get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        //  console.log(title);
        //set the project title  
        popup.querySelector(".pp-title h2").innerHTML = title;

        //get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        //   console.log(category);
        //set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("");




    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })




    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px"
            //  console.log("true")
        }
        else {
            //    console.log("false")

            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            // console.log(projectDetailsContainer.scrollHeight );
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
})();

// -------------------------------------------testimonial  slider----------------- 
(() => {
  
     const sliderContainer = document.querySelector(".testi-slider-container"),
     slides = sliderContainer.querySelectorAll(".testi-item")
    //  console.log(slides);
    //  output;- get testi-item 
    slideWidth = sliderContainer.offsetWidth;
    // console.log(slideWidth);
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next");
    activeSlide = sliderContainer.querySelector(".testi-item.active")

    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
  
     
    // console.log(activeSlide.parentElement);
    // console.log(activeSlide.parentElement.children);
    // console.log(slideIndex);

    //set width of all slides 
       slides.forEach((slide) => {
        //    console.log(slide) 
        slide.style.width = slideWidth + "px";
       })

   //set width of slidecontaier

     sliderContainer.style.width = slideWidth * slides.length + "px";

     nextBtn.addEventListener("click" , ()=>{
            //    console.log(slides.length) = 3 
           if(slideIndex === slides.length-1){
               slideIndex = 0;
           }
           else{
               slideIndex++;
           }
        //    console.log(slideIndex);
          sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
     })

     prevBtn.addEventListener("click" , () => {
           if(slideIndex === 0 ){
            slideIndex = slides.length - 1
            
           }
           else{
              slideIndex--;
            //   console.log(slideIndex);
           }
           sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
        // slider();
     })

      function slider(){
          //deactivate exiting active slides
          sliderContainer.querySelector(".testi-item active").classList.remove("active");
          //activate new slide
          slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
      }

      

 })();
// --------------------------------------------navigation menu--------------------------------------------
 (() =>{
     
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu  = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

      hamburgerBtn.addEventListener("click" , showNavMenu);
      closeNavBtn.addEventListener("click" , hideNavMenu);
      function showNavMenu(){
          navMenu.classList.add("open");
          bodyScrollingToggle();
      }

      function hideNavMenu(){
          navMenu.classList.remove("open");
          fadOutEffect();
          bodyScrollingToggle();
      }


       function fadOutEffect(){
           document.querySelector(".fade-out-effect").classList.add("active");
           setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
           },300)
       }

       //attach an event handler to document

        document.addEventListener("click" , (event) => {
            // console.log(event.target)
            //   output:- get list item home about.. 
            if(event.target.classList.contains('link-item')){
                // console.log("event.target contains 'link-item' class")
                // console.log(event.target.hash);
                //    output:- get #home #about type link-item 
                  if(event.target.hash !==""){
                      //prevent default anchor click behavior
                        event.preventDefault();
                        const hash = event.target.hash;
                        //deactive existing active 'section'

                        document.querySelector(".section.active").classList.add("hide");
                        document.querySelector(".section.active").classList.remove("active");

                        //active new 'section'
                        document.querySelector(hash).classList.add("active");
                        document.querySelector(hash).classList.remove("hide");

                        //deactivate existing active navigation menu 'link-item' 

                        navMenu.querySelector(".active").classList.add("outer-shadow" , "hover-in-shadow");
                        navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                            //if clicked  'link-item is contained withing the navigation menu'
                         if(navMenu.classList.contains("open")){
                        //activate new navigation menu 'link-item'
                        event.target.classList.add("active" , "inner-shadow");
                        event.target.classList.remove("outer-shadow" , "hover-in-shadow");

                        //hidenavigation menu 
                        hideNavMenu();
                        // console.log("if clicked  'link-item is contained withing the navigation menu")
                         }
                         else{
                            //  console.log("if clicked  'link-item is not  contained withing the navigation menu")

                            let navItems = navMenu.querySelectorAll(".link-item");
                            navItems.forEach((item) => {
                                 if(hash === item.hash){
                                       console.log(hash);
                                       console.log(item.hash);
                                    //activate new navigation menu link-item

                                    item.classList.add("active","inner-shadow");
                                    item.classList.remove("outer-shadow" , "hover-in-shadow");
                                 }
                            })
                              fadOutEffect();
                         }

                         //add hash (#) to url 
                         window.location.hash = hash;
                  }

            }
            // else{
                // console.log("event.target  no contains 'link-item' class")

            // }
        }) 


 }) ();

//  ---------------------------------------hide all sections expect active -----------------------------------
  (() =>{
       const sections = document.querySelectorAll(".section");
       console.log(sections);
    //    output:- get the all section 
      sections.forEach((section) => {
        //   console.log(section);
        //   if(!section.classList.contains("active")){
        //     section.classList.add("hide");
        //   }
      })
  })();