//This JS file contains commonly-used tips and tricks.

//Pretty standard ready function for jquery
$(document).ready(function(){

  // Refresh window on resize
  window.onresize = function(){ location.reload(); }

  // jquery: on click scroll page down to relevant content
  $('.standard-button').on('click', function(){
    $('html, body').animate({
      scrollTop: $('#content-wrap'+$(this).data('content-id')).offset().top
    }, 1000);
  });

  // jquery: toggle button text
  $('#standard-button').click(function(){
    $(this).text('show normal');
    $('.bold').toggle("slow");

    if ($('#standard-button').hasClass('btn active')){
      $(this).text('show bold');
    } else {
      $(this).text('show normal');
    }
  });

  //jquery: click event to scroll to top
  $('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 1000},1000);
    return false;
  });

  //jquery: close button
  $('#close-button').click(function(){
    $('#tooltip').css('visibility', 'hidden');
    $(this).css('display', 'none');
  });

  // jquery: standard datatable
  // You'd have to add datatables into your gruntfile vendor libraries
  var fundingTable =  $('#funding-table table').DataTable({
        "paging": true,
        "lengthMenu": [[20,50,100,500,-1], [20,50,100,500,"All"]],
        "searching": true,
        "ordering": true,
        "order": [[ 1, "asc" ]], //sorts table in ascending order by first column
        "bAutoWidth":false,
        "responsive": {
          details:{
            type: 'column',
            target: 'tr'
          },
            breakpoints: [
            { name: 'desktop', width: Infinity },
            { name: 'tablet',  width: 1100 },
            { name: 'phone',   width: 700 }
            ],
        }
    });

    // javascript: show/hide content based on what button is clicked
    // From this: http://graphics.chicagotribune.com/lgbtqia-definition/
    var divs =["lgbtdisplay", "ldisplay", "gdisplay", "bdisplay", "tdisplay", "qdisplay", "idisplay", "adisplay"];
    var visibleDivId = null;

    function hideNonVisibleDivs () {
      var i, divId, div;
      for (i = 0; i < divs.length; i++) {
        divId = divs[i];
        div = document.getElementById(divId);
        if (visibleDivId === divId) {
          div.style.display = "block";
        }
        else {
         div.style.display = "none";
        }
      }
    }
    function attachEvents() {
      var buttons = document.getElementsByClassName("button-letter");

      for(var i=0; i< buttons.length; i++) {
        buttons[i].addEventListener("click", function(){
         var divId = this.getAttribute('data-div');
         if (visibleDivId !== divId) {
          visibleDivId = divId;
         }
         hideNonVisibleDivs();
        });
      }
    }
    attachEvents();

    // javascript: General way to put content into a modal on click
    // Full code is in property-taxes-cook-county
    document.querySelector('body').classList.add('glossary');
    // Select all our term buttons.
    const   buttons = document.querySelectorAll('.target-term'),
            modal = document.querySelector('#modal');
    // Assign the event handler to each so they display the proper modal when clicked/tapped;
    for (var button of buttons){
        button.addEventListener('click', function(e){
            const termID = e.target.dataset.term;
            //loops through termsJson and adds appropriate definition into modal div
            for (let i = 0; i < termsJson.length; i++) {
                if (termsJson[i].ID == termID) {
                    const   term = termsJson[i].term,
                            definition = termsJson[i].definition;
                    // let termDef = ('<p>'+ termsJson[termID].definition + '<p>');
                    document.getElementById("term").innerHTML = term;
                    document.getElementById("definition").innerHTML = definition;
                    modal.classList.add("modal--active");
                }
            }
            //exit button re-adds hide-this class
            document.querySelector('.modal__exit, #modal').addEventListener('click', function(){
                console.log('exiting');
                modal.classList.remove("modal--active");
            })
        });
    }

// JS: load data from json. Requires d3.json.
window.addEventListener('load', function(e){

  d3.json(window.ROOT_URL + "data/laws_data.json", function(error, data){
    if (error) throw error;
    //this is the function that is handling the data after it loads
    handleData(data);
  });


});
