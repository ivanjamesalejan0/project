<!doctype html>
<html lang="en">

<head>
  <title>{{ config('app.name', 'Laravel') }}</title>
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

  <link class="default-style" rel="stylesheet" href="{{ asset('theme/vendor/bootstrap/css/bootstrap.min.css') }}">
  <link class="default-style" rel="stylesheet" href="{{ asset('theme/vendor/font-awesome/css/font-awesome.min.css') }}">
  <link class="default-style" rel="stylesheet" href="{{ asset('theme/vendor/themify-icons/css/themify-icons.css') }}">
  <link class="default-style" rel="stylesheet"
    href="{{ asset('theme/vendor/pace/themes/orange/pace-theme-minimal.css') }}">
  <link class="default-style" id="main-style" rel="stylesheet" href="{{ asset('theme/css/main.min.css') }}">
  <link class="default-style" rel="stylesheet" href="{{ asset('theme/css/skins/sidebar-nav-darkgray.css') }}"
    type="text/css">
  <link class="default-style" rel="stylesheet" href="{{ asset('theme/css/skins/navbar3.css') }}" type="text/css">

  <!-- FOR DEMO PURPOSES ONLY. You should/may remove this in your project -->
  <link class="default-style" rel="stylesheet" href="{{ asset('theme/css/demo.css') }}">

  <!-- ICONS -->
  <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('theme/img/apple-icon.png') }}">
  <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('theme/img/favicon.png') }}">
</head>

<body>
  <!-- WRAPPER -->
  <div id="wrapper">
    <!-- NAVBAR -->
    <nav class="navbar navbar-default navbar-fixed-top">
      @include('layouts.includes.topbar')
    </nav>
    <!-- END NAVBAR -->

    <!-- LEFT SIDEBAR -->
    <div id="sidebar-nav" class="sidebar">
      @include('layouts.includes.sidebar')
    </div>
    <!-- END LEFT SIDEBAR -->

    <!-- MAIN -->
    <div class="main">

      <!-- MAIN CONTENT -->
      <div class="main-content">
        <div class="content-heading clearfix">
          <div class="heading-left">
            <h1 class="page-title" id="view-title"></h1>
            <p class="page-subtitle" id="view-description"></p>
          </div>
          
        </div>
        <div class="container-fluid">
          <div id="main-view"></div>
        </div>

      </div>
      <!-- END MAIN CONTENT -->

      <!-- RIGHT SIDEBAR -->
      <div id="sidebar-right" class="right-sidebar">
        @include('layouts.includes.right-sidebar')
      </div>
      <!-- END RIGHT SIDEBAR -->
    </div>
    <!-- END MAIN -->
  <!-- END WRAPPER -->

  <!-- JAVASCRIPTS -->
  <script class="default-js" src="{{ asset('theme/vendor/jquery/jquery.min.js') }}"></script>
  <script class="default-js" src="{{ asset('theme/vendor/bootstrap/js/bootstrap.min.js') }}"></script>
  <script class="default-js" src="{{ asset('theme/vendor/pace/pace.min.js') }}"></script>

  <script class="default-js" src="{{ asset('theme/scripts/main-menu.custom.js') }}"></script>
  <script class="default-js" src="{{ asset('theme/scripts/app.custom.js') }}"></script>

</body>

</html>