
$('#app-form').on('submit', function (e) {
    e.preventDefault();
    swal({
        title: 'Processing',
        text: 'Please wait...',
        allowOutsideClick: false,
        type: null,
        closeOnConfirm: false,
        closeOnCancel: false,
        showConfirmButton: false,
        onOpen: () => {
          swal.showLoading()
          var formData = new FormData(this);
          $("#submit-form").addClass('disabled');
          $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: formData,
            processData: false,
            cache: false,
            contentType: false,
            beforeSend: function(xhr) {
              if ($(this).find('.has-error .error').length > 0) {
                xhr.abort();
              }
              xhr.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
            }
          }).success(function(data) {
            swal({
              title: 'Success!',
              text: 'Report saved successfully',
              type: 'success',
              allowOutsideClick: false,
            }).then(function() {
              loadView('admin/reports/create');
            }).catch(swal.noop);
          }).error(function(data) {
            swal({
              title: 'Oops! Something went wrong',
              text: 'Please try again',
              type: 'error',
              allowOutsideClick: false,
            }).then(function() {
              loadView('admin/reports/create');
            }).catch(swal.noop);
          }).complete(function(data) {
            $('#submit-form').removeClass('disabled');
          });
        }
      },
      function() {});
  });