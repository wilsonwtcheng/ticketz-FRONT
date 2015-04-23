$(document).ready(function() { 

  listAllRequest();
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
    if ($('.contactInfo').val() =="") {
      alert("Please enter contact info!")
    } else {
    listRequest();
    }
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
          sattix: $('.satTix').val() == "" ? null : $('.satTix').val(),
          suntix: $('.sunTix').val() == "" ? null : $('.sunTix').val(),
          friprice: $('.friPrice').val() == "" ? null : $('.friPrice').val(),
          satprice: $('.satPrice').val() == "" ? null : $('.satPrice').val(),
          sunprice: $('.sunPrice').val() == "" ? null : $('.sunPrice').val(),
          contactinfo: $('.contactInfo').val() == "" ? null : $('.contactInfo').val(),
          remarks: $('.remarks').val() == "" ? null : $('.remarks').val()
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
        $('.contactInfo').val(""),
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
        $('#all-posts').text(''); 
        response.forEach(function (post) {
          $('#all-posts').append("<li>" + "date posted: " + post.dateposted + "</li>" + "<li>" + "fri tix available: "  + post.fritix + "</li>" + "<li>" + "sat tix available: " + post.sattix + "</li>"+ "<li>" + "sun tix available: " + post.suntix + "</li>" + "<li>" + "fri price (HKD): "  + post.friprice + "</li>" + "</li>" + "<li>" + "sat price (HKD): "   + post.satprice + "</li>"+ "<li>" + "sun price (HKD): "   + post.sunprice + "</li>"+  "<li>" + "seller username: "   + post.username + "</li>" + "<li>" + "contact info: : " + post.contactinfo + "</li>" + "<li>" + "remarks: "   + post.remarks + "</li>"+ "<li>" + "***" +"</li>"+ "<li>" + "***" +"</li>");        
        }); 
      } 
    })
  }

// original:
// $('#all-posts > tbody').append("<tr>" + "<td>" + "fri tix available: "  + post.fritix + "</td>" + "</tr>" + "<tr>" + "<td>" + "sat tix available: " + post.sattix + "</td>"+ "</tr>" + "<tr>" + "<td>" + "sun tix available: " + post.suntix + "</td>" + "</tr>" + "<tr>" + "<td>" + "fri price (HKD): "  + post.friprice + "</td>" +" </tr>" + "<tr>" + "<td>" + "sat price (HKD): "   + post.satprice + "</td>"+ "</tr>" + "<tr>" + "<td>" + "sun price (HKD): "   + post.sunprice + "</td>"+ "</tr>" + "<tr>" + "<td>" + "date posted: "   + post.dateposted + "</td>"+ "</tr>" + "<tr>" + "<td>" + "seller username: "   + post.username + "</td>"+ "</tr>"+ "<tr>" + "<td>" + "contact info: : " + post.contactinfo + "</td>"+ "</tr>"  + "<tr>" + "<td>" + "remarks: "   + post.remarks + "</td>"+ "</tr>" + "<tr>" + "<td>" + "</td>" + "</tr>"+ "<tr>" + "<td>" + "</td>" + "</tr>" );

  //search request from harryquotes
  function getRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/' +  $('.search-value').val(),
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        response.forEach(function (post) { 

          var text  = "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "<li>" + "***" +"</li>";
              text += "<li>" + "***" +"</li>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }

  function deleteRequest() {
    $.ajax({
      type: "DELETE",
      url: 'http://localhost:3002/listings/' + $('.delete-value').val(),    
      error: function(xhr, textStatus, errorThrown){
        alert("Deletion Error!");
      },
      success: function(response) {
          $('.delete-value').val("");
          listAllRequest();
          console.log("Great delete success!", response);
      }
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


 })
