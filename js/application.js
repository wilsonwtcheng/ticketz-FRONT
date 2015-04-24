$(document).ready(function() { 

  lastRefresh();

  listAllRequest();

  $(document).on('click','.refreshButton', function(){
    reloadRequest();
  });
  
  $(document).on('click','.signup-button', function(){
    signupRequest();
  });

  $(document).on('click','.login-button', function(){
    loginRequest();
  });
  
  $(document).on('click','.logout-button', function(){
    logOutRequest();
  });

  $(document).on('click','.searchFridayButton', function(){
    searchFridayRequest();
  });

  $(document).on('click','.searchSaturdayButton', function(){
    searchSaturdayRequest();
  });
  
  $(document).on('click','.searchSundayButton', function(){
    searchSundayRequest();
  });

  $(document).on('click','.friSearchBut', function(){
    allFridayRequest();
  });

  $(document).on('click','.satSearchBut', function(){
    allSaturdayRequest();
  });

  $(document).on('click','.sunSearchBut', function(){
    allSundayRequest();
  });

  $(document).on('click','.searchRemarksButton', function(){
    searchRemarksRequest();
  });

  $(document).on('click','.searchUserButton', function(){
    searchUsersRequest();
  });
  
  $(document).on('click','.listButton', function(){
    if ($('.contactInfo').val() =="") {
      alert("Please enter contact info!")
    } else {
    listingRequest();
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

  function lastRefresh() {
    var timeText = "<li>" + "<span class='property'>Page last refreshed: </span>"+ new Date + "</li>";
    $('.lastRefresh').append(timeText);
  }

  function lastUpdate() {
    var updateTimeText = "<li>" + "<span class='property'>Last posting made: </span>"+ new Date + "</li>";
    $('.lastUpdate').append(updateTimeText); 
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
       $('#removeLogin').empty();
       //$('#removeLogin').remove();
      
       var addLogoutBut = '<h4>'+"You are now logged in!"+'<h4>'+ '<br>'+'<div class="row">'+ '<button class="btn btn-danger logout-button" type="button">'+ "Log out" +'</button>'+'</div>';    
      
       $('#removeLogin').append(addLogoutBut);

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
       // **********hide login status, show profile2**********
      }
    }) 
  }

//listing request
  function listingRequest() {
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
        lastUpdate();
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
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + Date(post.dateposted) + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
          }); 
      } 
    })
  }

  //search by remarks request 
  function searchRemarksRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/remarks/' +  $('.search-remarks-value').val(),
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + Date(post.dateposted) + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }

  //search by users request 
  function searchUsersRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/users/' +  $('.search-users-value').val(),
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }


  //search by friday request 
  function searchFridayRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/friday/' +  $('.search-friday-value').val(),
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }

  //search by saturday request 
  function searchSaturdayRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/saturday/' +  $('.search-friday-value').val(),
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }

    //search by sunday request 
  function searchSundayRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/sunday/' +  $('.search-friday-value').val(),
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }

  //show all friday request 
  function allFridayRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/friday',
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }

  //show all saturday request 
  function allSaturdayRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/saturday',
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
          $('#all-posts').append(text);         
        });
      }
    }) 
  }

  //show all sunday request 
  function allSundayRequest() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/listings/search/sunday',
      dataType: "JSON",
      success: function(response) {
        console.log("Great success", response);
        $('#all-posts').text(''); 
        $('#all-posts').append('<h4>'+"Here are your search results:"+'<h4>');         
        response.forEach(function (post) { 
          var text  = "<div class='jumbotron postBox well well-sm'>";
              text += "<li>" + "<span class='property'>date posted: </span>"       + post.dateposted + "</li>";
              text += "<li>" + "<span class='property'>fri tix available:</span> " + post.fritix + "</li>";
              text += "<li>" + "<span class='property'>sat tix available:</span> " + post.sattix + "</li>";
              text += "<li>" + "<span class='property'>sun tix available:</span> " + post.suntix + "</li>";
              text += "<li>" + "<span class='property'>fri price (HKD)</span>: "   + post.friprice + "</li>";
              text += "<li>" + "<span class='property'>sat price (HKD)</span>: "   + post.satprice + "</li>";
              text += "<li>" + "<span class='property'>sun price (HKD)</span>: "   + post.sunprice + "</li>";
              text += "<li>" + "<span class='property'>seller username: </span>"   + post.username + "</li>";
              text += "<li>" + "<span class='property'>contact info: </span>: "    + post.contactinfo + "</li>";
              text += "<li>" + "<span class='property'>remarks: </span> "          + post.remarks + "</li>";
              text += "</div>";
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

// am i logged in request
//or just send a login request and see what happens?
  function loginStatus() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3002/sessions/{logged}',
      dataType: "JSON",
      success: function(response) {
       console.log("Great success, user is logged in.", response);
       // window.location = "/index.html";
      }
    })
  }

  // function hideProfile() {
  //    $('.delete-div, .list-div, .add-div, .profile-div, search-div').hide();
  //    $('.listPillBut').css("background","transparent");
  //    $('.profileTwo-div').show();
  //  })

function reloadRequest() {
  window.location.reload();
}



//pills
 $('.add-div, .delete-div, .search-div, .profile-div').hide();

 $('.listPillBut').css("background","#EFEFEC");

 $(document).on('click','.searchPillBut', function() {
   $('.delete-div, .list-div, .add-div, .profile-div').hide();
   $('.listPillBut').css("background","transparent");
   $('.search-div').show();
 })

 $(document).on('click','.addPillBut', function() {
   // $(this).attr("class", "active");
   $('.search-div, .delete-div, .list-div, .profile-div').hide();
   $('.listPillBut').css("background","transparent");
   $('.add-div').show();
 })

 $(document).on('click','.listPillBut', function() {
   $('.search-div, .add-div, .delete-div, .profile-div').hide();
   $('.listPillBut').css("background","transparent");
   $('.list-div').show();
 })

//profile button needs a bit more work. check if user is logged in.
$(document).on('click','.profilePillBut', function() {
   $('.search-div, .delete-div, .list-div, .add-div').hide();
   $('.listPillBut').css("background","transparent");
   $('.profile-div').show();
   //if user is authenticated, show current stats.
   //if user is not authenticated, show sign-up boxes.
 })

 $(document).on('click','.deletePillBut', function() {
   $('.search-div, .list-div, .add-div, .profile-div').hide();
   $('.delete-div').show();
 })


 })
