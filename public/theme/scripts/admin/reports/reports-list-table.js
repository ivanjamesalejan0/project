$(function () {

  // datatable with paging options and live search
  $.dataTable = $('#reports-list-datatable').dataTable({
    'scrollY': false,
    'scrollCollapse': true,
    'paging': true,
    'autoWidth': false,
    'select': 'multi',
    'scrollX': true,
    'lengthMenu': [
      [15, 30, 50, -1],
      [15, 30, 50, "All"]
    ],
    'dom': '<<"row" <"col-sm-3 text-left dt-search"><"col-sm-9 text-right" B>><t><"row" <"col-sm-6 text-left" l><"col-sm-6 text-right" pi>>>',
    'serverSide': false,
    'processing': false,
    'colReorder': true,
    'responsive': false,
    'fixedHeader': false,
    'buttons': {
      'name': 'dt-buttons',
      'className': 'btn btn-info btn-xs',
      'buttons': [{
          extend: 'collection',
          text: 'Export',
          className: 'fa fa-download hidden',
          buttons: [{
              text: 'Export to CSV',
              className: 'fa fa-file-excel-o',
              extend: 'csvHtml5',
              exportOptions: {
                columns: ':visible'
              }
            },
            {
              text: 'Export to Excel',
              className: 'fa fa-table',
              extend: 'excel',
              exportOptions: {
                columns: ':visible'
              }
            },
            {
              text: 'Export to PDF',
              className: 'fa fa-file-pdf-o',
              extend: 'pdf',
              exportOptions: {
                columns: ':visible'
              }
            }
          ],
          fade: false,
          autoclose: true
        },
        {
          text: 'Print',
          className: 'fa fa-print hidden',
          extend: 'print',
          exportOptions: {
            columns: ':visible'
          }
        },
        {
          text: 'Copy',
          className: 'fa fa-clipboard hidden',
          extend: 'copyHtml5',
          exportOptions: {
            columns: ':visible'
          }
        },
        {
          text: 'Reload',
          className: 'fa fa-refresh',
          action: function (e, dt, node, config) {
            $.dataTable.ajax.reload();
          }
        },
        {
          text: 'Refresh',
          className: 'fa fa-table',
          action: function (e, dt, node, config) {
            $.dataTable.columns.adjust();
          }
        },
        {
          text: 'Select All',
          className: 'fa fa-check-circle-o',
          extend: 'selectAll',
        },
        {
          text: 'Select None',
          className: 'fa fa-circle-o',
          extend: 'selectNone',
        },
        {
          text: 'Columns',
          className: 'fa fa-eye',
          extend: 'colvis',
          postfixButtons: ['colvisRestore']
        },
        {
          extend: 'collection',
          text: 'Add Report',
          className: 'fa fa-plus',
          buttons: [
            {
              text: 'Small Scale',
              className: 'fa',
              action: function (e, dt, node, config) {
                loadView('admin/reports/create?type=small-scale');
              }
            },
            {
              text: 'Large Scale',
              className: 'fa',
              action: function (e, dt, node, config) {
                loadView('admin/reports/create?type=large-scale');
              }
            },
            {
              text: 'Armed Conflict',
              className: 'fa',
              action: function (e, dt, node, config) {
                loadView('admin/reports/create?type=armed-conflict');
              }
            },
          ],
          fade: false,
          autoclose: true
        },
        {
          text: 'Edit',
          className: 'edit-row fa fa-edit',
          action: function (e, dt, node, config) {
            var id;
            $.each($('#reports-list-datatable tbody tr.selected'), function (index, val) {
              id = $(val).attr('data-id');
            });
            loadView(`admin/reports/${id}/edit`);
          }
        },
        {
          text: 'Delete',
          className: 'delete-row fa fa-trash',
          action: function (e, dt, node, config) {
            swal({
              title: 'Confirm Delete?',
              text: "Are you sure you want to delete selected reports? You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#F9354C',
              cancelButtonColor: '#41B314',
              confirmButtonText: 'Yes, delete it!'
            }).then(function() {
              var selected = [];
              $.each($('#reports-list-datatable tbody tr.selected'), function (index, val) {
                selected.push($(val).attr('data-id'));
              });
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
                  $("#submit-form").addClass('disabled');
                  $.ajax({
                    url: 'views/admin/reports/multiple?id='+selected.join(','),
                    type: 'DELETE',
                    processData: false,
                    cache: false,
                    contentType: false,
                    beforeSend: function(xhr) {
                      xhr.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
                    }
                  }).success(function(data) {
                    if(data.success){
                      swal({
                        title: 'Deleted!',
                        text: 'Report(s) has been deleted',
                        type: 'success',
                        allowOutsideClick: false,
                      }).then(function() {
                        loadView('admin/reports');
                      }).catch(swal.noop);
                    }else{
                      swal({
                        title: 'Oops! Something went wrong',
                        text: data.message || 'Please try again',
                        type: 'error',
                        allowOutsideClick: false,
                      }).then(function() {
                      }).catch(swal.noop);
                    }
                  }).error(function(data) {
                    swal({
                      title: 'Oops! Something went wrong',
                      text: 'Please try again',
                      type: 'error',
                      allowOutsideClick: false,
                    }).then(function() {
                    }).catch(swal.noop);
                  });
                }
              },
              function() {});
            }).catch(swal.noop);
          }
        }
      ]
    }
  });

});