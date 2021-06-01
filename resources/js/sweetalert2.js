function confirm(){
    swal({
        title: "Wow!",
        text: "Message!",
        type: "success"
      }).then(function confirm() {
        window.location = "/home";
      });
    }