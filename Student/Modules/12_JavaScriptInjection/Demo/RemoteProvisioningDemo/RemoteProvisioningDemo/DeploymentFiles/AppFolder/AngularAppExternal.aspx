<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=10" />
  <title>Customers Angular App</title>

  
  <link href="content/bootstrap.css" rel="stylesheet" />
  <script src="scripts/jquery.js"></script>
  <script src="scripts/bootstrap.js"></script>
  <script src="scripts/angular.js"></script>
  <script src="scripts/angular-route.js"></script>

  <script src="AngularApp/app.js"></script>
  <script src="AngularApp/customerslistservice.js"></script>
  <script src="AngularApp/controllers.js"></script>

  <link href="AngularApp/app.css" rel="stylesheet" />


</head>

<body ng-app="CustomersAngularApp" >

  <div class="container">
    <div class="navbar navbar-default" role="navigation" ng-controller="navbarController" >
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">My Angular App</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="#">Customers</a></li>
            <li><a href="#/new">Add Customer</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a id="lnkHostWeb" ng-href="{{hostWebUrl}}"  >Back to Host Web</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div id="content-box" ng-view ></div>
  </div>

</body>

</html>
