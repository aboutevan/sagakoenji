$(document).ready(function() {
// ========================================
// INITIATE TEXT EFFECTS - needs to be at beginning for js scroll to be accurate
// ========================================
    $('.about h1, .location h1, .reservations h1').fitText();
    $('.location .address, .location .contact, .location .phone-number, .location .email, .location .time').bigtext();


    var hamburger = $('.nav-icon'),
        navIcon = $('.nav-icon span'),
        overlay = $('div.overlay'),
        scrollArrow= $('.scroll-arrow'),
        t = $('#about').offset().top,
        t1 = $('#contact').offset().top,
        t2 = $('#menu').offset().top,
        t3 = $('#reservations').offset().top,
        t4 = $('#footer').offset().top;

   // ========================================
    //  SCROLL TO ANCHORS
    // ========================================     

    $(document).scroll(function(){
        if($(this).scrollTop() > t4) {   
            $(navIcon).css({"background-color":"#FF3F4A"});
        } else if($(this).scrollTop() > t3) {   
            $(navIcon).css({"background-color":"white"});
        } else if($(this).scrollTop() > t2) {   
            $(navIcon).css({"background-color":"#FF3F4A"});
        } else if($(this).scrollTop() > t1) {   
            $(navIcon).css({"background-color":"white"});
        } else if($(this).scrollTop() > t) {   
            $(navIcon).css({"background-color":"#FF3F4A"});
        } else {
            $(navIcon).css({"background-color":"white"});
        }
    });
    //Link to anchor elements on click
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            event.preventDefault();
            //remove overlay
            overlay.removeClass('open');
            //change nav from x back to hamburger
            hamburger.removeClass('on');

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    if (Modernizr.mq('(min-width: 960px)') && target.selector != '#home') {
                        $('html,body').animate({
                            scrollTop: target.offset().top + ($(window).height() * 0.15)
                        }, 1000);
                    } else {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            }
        });
    });

  // ========================================
  // MAP MAKING
  // ========================================
    (function() {
        var featureOpts = [{
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f7f1df"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
                "color": "#d0e3b4"
            }]
        }, {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [{
                "color": "#fbd3da"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#bde6ab"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffe15f"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#efd151"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "black"
            }]
        }, {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#cfb2db"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#a2daf2"
            }]
        }];
        var map;

        var shabazz = new google.maps.LatLng(35.705964, 139.648030);

        var MY_MAPTYPE_ID = 'custom_style';

        function initialize() {

            var myLatlng = new google.maps.LatLng(35.705964, 139.648030)

            var mapOptions = {
                center: myLatlng,
                zoom: 18,
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                },
                mapTypeId: MY_MAPTYPE_ID

            };

            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            var styledMapOptions = {
                name: 'Custom Style'
            };

            var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
            map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                // position: myLatlng,
                map: map,
                title: 'SAGA',
                place: {
                    location: myLatlng,
                    query: 'Google, Sydney, Australia'

                }
            });

            // Construct a new InfoWindow.
            var infowindow = new google.maps.InfoWindow({
                content: 'Google Sydney'
            });

            // Opens the InfoWindow when marker is clicked.
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }
        google.maps.event.addDomListener(window, 'resize', initialize);
        google.maps.event.addDomListener(window, 'load', initialize);
    })();

// ========================================
// NAV OVERLAY
// ========================================
    (function() {
        var triggerBttn = document.getElementById('trigger-overlay'),
            // navBttn = document.getElementsByClassName('nav-li'),
            overlay = document.querySelector('div.overlay'),
            transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
            support = {
                transitions: Modernizr.csstransitions
            };

        function toggleOverlay() {
            if (classie.has(overlay, 'open')) {
                classie.remove(overlay, 'open');
                classie.add(overlay, 'close');
                var onEndTransitionFn = function(ev) {
                    if (support.transitions) {
                        if (ev.propertyName !== 'visibility') return;
                        this.removeEventListener(transEndEventName, onEndTransitionFn);
                    }
                    classie.remove(overlay, 'close');
                };
                if (support.transitions) {
                    overlay.addEventListener(transEndEventName, onEndTransitionFn);
                } else {
                    onEndTransitionFn();
                }
            } else if (!classie.has(overlay, 'close')) {
                classie.add(overlay, 'open');
            }
        }
        triggerBttn.addEventListener('click', toggleOverlay);
        
    })();

// ========================================
// FOOD MENU OVERLAY
// ========================================
    (function() {
        var triggerBttn = document.getElementById('menu-trigger'),

            // navBttn = document.getElementsByClassName('nav-li'),
            overlay = document.querySelector('div.menu-overlay'),
            closeBttn = overlay.querySelector( 'div.menu-overlay-close' );
            transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
            support = {
                transitions: Modernizr.csstransitions
            };

        function toggleOverlay() {
          event.preventDefault();
            if (classie.has(overlay, 'open')) {
                classie.remove(overlay, 'open');
                classie.add(overlay, 'close');
                var onEndTransitionFn = function(ev) {
                    if (support.transitions) {
                        if (ev.propertyName !== 'visibility') return;
                        this.removeEventListener(transEndEventName, onEndTransitionFn);
                    }
                    classie.remove(overlay, 'close');
                };
                if (support.transitions) {
                    overlay.addEventListener(transEndEventName, onEndTransitionFn);
                } else {
                    onEndTransitionFn();
                }
            } else if (!classie.has(overlay, 'close')) {
                classie.add(overlay, 'open');
            }
        }
        triggerBttn.addEventListener('click', toggleOverlay);
        closeBttn.addEventListener( 'click', toggleOverlay );
    })();

// ========================================
// SCROLL ARROW
// ========================================
    //fade on scroll
    $(window).on('scroll', function() {
        var st = $(this).scrollTop();
        scrollArrow.css({
            'opacity' : 1 - st/75
        });
    });

// ========================================
// HAMBURGER TOGGLE
// ========================================
    hamburger.click(function() {
        $(this).toggleClass('on');
    });

// ========================================
// INITIATE SLIDER
// ========================================
    $('.slider-one .bxslider').bxSlider({
        swipeThreshold: 80,
        nextText: '<i class="fa fa-angle-right fa-3x"></i>',
        prevText: '<i class="fa fa-angle-left fa-3x"></i>'
    });
    $('.slider-two .bxslider').bxSlider({
        auto: true,
        touchEnabled: false
    });
});

