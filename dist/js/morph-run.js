(function() {
    var morphSearch = document.getElementById( 'morphsearch' );
    var input = morphSearch.querySelector( 'input.morphsearch-input' ),
        ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
        isOpen = false,
    // show/hide search area
        toggleSearch = function(evt) {
            // return if open and the input gets focused
            if( evt.type.toLowerCase() === 'focus' && isOpen ) return false;

            var offsets = morphsearch.getBoundingClientRect();
            if( isOpen ) {
                classie.remove( morphSearch, 'open' );

                // trick to hide input text once the search overlay closes
                // todo: hardcoded times, should be done after transition ends
                if( input.value !== '' ) {
                    setTimeout(function() {
                        classie.add( morphSearch, 'hideInput' );
                        setTimeout(function() {
                            classie.remove( morphSearch, 'hideInput' );
                            input.value = '';
                        }, 300 );
                    }, 500);
                }

                input.blur();
            }
            else {
                classie.add( morphSearch, 'open' );
            }
            isOpen = !isOpen;
        };

    // events
    input.addEventListener( 'focus', toggleSearch );
    ctrlClose.addEventListener( 'click', toggleSearch );
    // esc key closes search overlay
    // keyboard navigation events
    document.addEventListener( 'keydown', function( ev ) {
        var keyCode = ev.keyCode || ev.which;
        if( keyCode === 27 && isOpen ) {
            toggleSearch(ev);
        }
    } );


    /***** for demo purposes only: don't allow to submit the form *****/
    morphSearch.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault(); } );

})();

$(window).load(function() {
    if($('body').offset().top > $(window).height()) {
        console.log('rel', $('body').offset().top, $(window).height());
        $('#morphsearch').css('position', 'relative');
    } else {
        console.log('abs', $('body').offset().top, $(window).height());
        $('#morphsearch').css('position', 'absolute');
    }

    $('ul.axta-carousel').height($(window).height());
    $('ul.axta-carousel .layer').height($(window).height());
    $('ul.axta-carousel .layer .layer-layout').height($(window).height());
});

$(window).on('scroll', function() {
    console.log('Hi');
});