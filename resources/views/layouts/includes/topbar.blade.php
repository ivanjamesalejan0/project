<style>
.brand{
  position: absolute;
  transform: translate(-10%, -30%)       
}
</style>
<div class="brand">
</div>
<div class="container-fluid">
  <div id="tour-fullwidth" class="navbar-btn">
    <button type="button" class="btn-toggle-fullwidth"><i class="ti-arrow-circle-left"></i></button>
  </div>
 
  <div id="navbar-menu">
    <ul class="nav navbar-nav navbar-right">
    
      <li class="dropdown">
      </li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="{{ asset('theme/img/user.png') }}"
            alt="Avatar">
          <span>  {{ Auth::user()->name }} </span></a>
        <ul class="dropdown-menu logged-user-menu">
          <li>
            <a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                                    document.getElementById('logout-form').submit();">
              <i class="ti-power-off"></i> Logout
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
              {{ csrf_field() }}
            </form>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>