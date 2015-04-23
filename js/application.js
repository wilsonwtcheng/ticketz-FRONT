$(document).ready(function() { 

//faketwitter buttons
  $(document).on('click','.signup-button', function(){
    signupRequest();
  });

  $(document).on('click','.login-button', function(){
    loginRequest();
  });
  
  $(document).on('click','.logout-button', function(){
    logOutRequest();
  });

//harry quote buttons
  $(document).on('click','.searchButton', function(){
    getRequest();
  });
  
  $(document).on('click','.listButton', function(){
    listRequest();
  });
  
  $(document).on('click','.listAllButton', function(){
    listAllRequest();
  });

  $(document).on('click','.deleteButton', function(){
    console.log("button click")
    deleteRequest();
  });

  
  // $(document).on('click','.listButton', function(){
  //   listAllRequest();
  // });

  // $(document).on('click','.deleteButton', function(){
  //   deleteRequest();
  // });

//signup request
  function signupRequest() {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3002/users',
      data: {
        user: {
          username:  $('.signup-username').val(),
          email:     $('.signup-email').val(),
          password:  $('.signup-password').val()
        },     
      },
      dataType: "JSON",
      success: function(response) {
        console.log("Great success, user signed up", response);
        alert("Sign up successful!");
        loginRequestTwo();
      }
    }) 
  }

  function postLoginStatus() {
    $('.loginStatus').append("<p>Status: Logged in</p>");
  }

//login request for non-first time login
  function loginRequest() {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3002/sessions',    
      data: {
        user: {
          username:  $('.login-username').val(),
          password:  $('.login-password').val()
        },
      },   
      dataType: "JSON",
      xhrFields: { 
      withCredentials: true 
      },
      //in sign in method, backend geernates cookie, we are creating cookie, so don't need for xhrFields and withCredenitals true.
      success: function(response) {
       console.log("User log in request successfully sent to backend.", response);
      }
    }) 
  }

  function loginRequestTwo() {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3002/sessions',    
      data: {
        user: {
          username:  $('.signup-username').val(),
          password:  $('.signup-password').val()
        },
      },   
      dataType: "JSON",
      xhrFields: { 
      withCredentials: true 
      },
      //in sign in method, backend geernates cookie, we are creating cookie, so don't need for xhrFields and withCredenitals true.
      success: function(response) {
       console.log("User log in request successfully sent to backend.", response);
        //$('.login-username').val("nice");
        //$('.login-password').val("awesome");
      //  window.location = "/listingpage.html";
        // listAllRequest();
       // postLoginStatus();
      }
    }) 
  }

//post request from FAKE TWITTER
  function listRequest() {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3002/listings',
      data: {
        listing: {
          fritix: $('.friTix').val() == "" ? null : $('.friTix').val(),
          sattix: $('.satTix').val() == "" ? null : 1,
          suntix: $('.sunTix').val() == "" ? null : 1,
          friprice: $('.friPrice').val() == "" ? null : $('.friPrice').val(),
          satprice: $('.satPrice').val() == "" ? null : 1,
          sunprice: $('.sunPrice').val() == "" ? null : 1,
         // contactinfo: $('.contactInfo').val() == "" ? null : 1,
          remarks: $('.remarks').val() == "" ? null : 1
        }      
      },
      xhrFields: { 
      withCredentials: true
      },
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('.friTix').val(""),
        $('.satTix').val(""),
        $('.sunTix').val(""),
        $('.friPrice').val(""),
        $('.satPrice').val(""),
        $('.sunPrice').val(""),
        //$('.contactInfo').val(""),
        $('.remarks').val(""),
        listAllRequest();
        }
    }) 
  }

// list all listings
  function listAllRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings',
      dataType: "JSON",
      success: function(response) {
        console.log("Great listing success", response);
        $('#all-posts > tbody').text(''); 
        response.forEach(function (post) {
          $('#all-posts > tbody').append(
          "<tr>" + "<td>" + "fritix: "  + post.fritix + "</td>" + "</tr>" + "<tr>" + "<td>" + "sattix: " + post.sattix + "</td>"+ "</tr>" + "<tr>" + "<td>" + "suntix: " + post.suntix + "</td>" + "</tr>" + "<tr>" + "<td>" + "friprice: "  + post.friprice + "</td>" +" </tr>" + "<tr>" + "<td>" + "satprice: "   + post.satprice + "</td>"+ "</tr>" + "<tr>" + "<td>" + "sunprice: "   + post.sunprice + "</td>"+ "</tr>" + "<tr>" + "<td>" + "date posted: "   + post.dateposted + "</td>"+ "</tr>" + "<tr>" + "<td>" + "seller: "   + post.username + "</td>"+ "</tr>" + "<tr>" + "<td>" + "remarks: "   + post.remarks + "</td>"+ "</tr>" + "<tr>" + "<td>" + "</td>" + "</tr>"+ "<tr>" + "<td>" + "</td>" + "</tr>" );         }); }
    }) 
  }

                // var listing = { 
                //  // "user_id": ObjectId(session.user_id),
                //   "fritix": request.payload.listing.fritix,
                //   "sattix": request.payload.listing.sattix,
                //   "suntiX": request.payload.listing.suntix,
                //   "friprice": request.payload.listing.friprice,
                //   "satprice": request.payload.listing.satprice,
                //   "sunprice": request.payload.listing.sunprice,
                //   "dateposted": new Date,      
                //   "username": user.username, 
                //   "remarks": request.payload.listing.remarks,
                //   //"contact details":
                // };


// list all from harryquotes

  // function listAllRequest() {
  //   $.ajax({
  //     type: "GET",
  //     url: 'http://hc-dominant-dagger-65-216803.apse1.nitrousbox.com:8080/quotes',
  //     dataType: "JSON",
  //     success: function(response) {
  //       console.log("Great listing success", response);
  //       $('#all-posts > tbody').text(''); 
  //       response.forEach(function (post) {
  //         $('#all-posts > tbody').append("<tr class='post-item'>" + "<td>" + post._id + "</td>" + "<td>" + post.quote + "</td>" + "<td>" + post.author + "</td></tr>" );
  //       });
  //     }
  //   }) 
  // }


//logout request
    
  function logOutRequest() {
    $.ajax({
      type: "DELETE",
      url: 'http://localhost:3002/sessions',
      // data: {
      //   user: {
      //   username:  $('.login-username').val(),
      //   password:  $('.login-password').val()
      // },    
      dataType: "JSON",
      // error: function(xhr, textStatus, errorThrown){
      //   alert("Deletion Error!");
      // },
      success: function(response) {
       console.log("Great success, user logged OUT.", response);
       window.location = "/index.html";

      }
     // }
    })
  }

//pills
 $('.add-div, .delete-div, .search-div').hide();

 $('.listPillBut').css("background","#EFEFEC");

 $(document).on('click','.searchPillBut', function() {
   $('.delete-div, .list-div, .add-div').hide();
   $('.listPillBut').css("background","transparent");
   $('.search-div').show();
 })

 $(document).on('click','.addPillBut', function() {
   // $(this).attr("class", "active");
   $('.search-div, .delete-div, .list-div').hide();
   $('.listPillBut').css("background","transparent");
   $('.add-div').show();
 })

 $(document).on('click','.listPillBut', function() {
   $('.search-div, .add-div, .delete-div').hide();
   $('.listPillBut').css("background","transparent");
   $('.list-div').show();
 })

 $(document).on('click','.deletePillBut', function() {
   $('.search-div, .list-div, .add-div').hide();
   $('.delete-div').show();
 })

//awesome video pill
  $('.awesome-div').hide();  
  $(document).on('click','.awesomeBut', function() {
   $('.awesome-div').toggle();
 })




 })
