'use strict';

var joolaDirective = angular.module('ngjoola.directives', ['ngjoola']);

joolaDirective.directive('appVersion', function (version) {
  return function (scope, elm, attrs) {
    elm.text(version);
  };
});

joolaDirective.directive('sidebar', function () {
  var dashboardOpen = false;
  var integrationOpen = false;
  var usersOpen = false;

  var dashboard_overview_active = false;
  var dashboard_overview_nodes = false;
  var users_users = false;
  var users_roles = false;

  if (location.pathname == '/manage/dashboard/index') {
    dashboardOpen = true;
    dashboard_overview_active = true;
  }
  if (location.pathname == '/manage/dashboard/nodes') {
    dashboardOpen = true;
    dashboard_overview_nodes = true;
  }
  if (location.pathname == '/manage/users/index') {
    usersOpen = true;
    users_users = true;
  }
  if (location.pathname == '/manage/users/roles') {
    usersOpen = true;
    users_roles = true;
  }
  return {
    restrict: 'E',
    replace: true,
    template: '<li ng-repeat="m in menu" ng-class="{\'dropdown\':m.submenu, \'open\':m.open}">' +
      '<a href="{{m.url}}" ng-class="{\'dropdown-toggle\':m.submenu}" ng-attr-data-toggle="{{m.type}}">' +
      '<i class="{{m.image}}"></i>' +
      ' {{m.name}}' +
      '<b class="caret" ng-if="m.submenu"></b>' +
      '</a>' +
      '<ul ng-if="m.submenu" class="dropdown-menu">' +
      '<li ng-repeat="s in m.submenu"><a ng-class="{\'active\':s.active}" href="{{s.url}}"><i class="{{s.image}}"></i> {{s.name}}</a></li>' +
      '</ul>' +
      '</li>',
    link: function (scope, elem, attrs) {
      scope.menu = [
        {
          "name": "Dashboard",
          "url": "/manage/dashboard/index",
          "image": "fa fa-dashboard",
          "type": "dropdown",
          "open": dashboardOpen,
          "submenu": [
            {
              "name": "Overview",
              "active": dashboard_overview_active,
              "url": "/manage/dashboard/index",
              "image": "fa fa-circle-o"
            },
            {
              "name": "System Performance",
              "active": dashboard_overview_nodes,
              "url": "/manage/dashboard/nodes",
              "image": "fa fa-tasks"
            },
            {
              "name": "Query Performance",
              "url": "/manage/dashboard/index",
              "image": "fa fa-bolt"
            }
          ]
        },
        {
          "name": "Data Integration",
          "url": "/manage/dataintegration/index",
          "image": "fa fa-table"
        },
        {
          "name": "User Management",
          "url": "/manage/users/index",
          "type": "dropdown",
          "image": "fa fa-users",
          "open": usersOpen,
          "submenu": [
            {
              "name": "Users",
              "active": users_users,
              "url": "/manage/dashboard/index",
              "image": "fa fa-user"
            },
            {
              "name": "Roles & Permissions",
              "active": users_roles,
              "url": "/manage/dashboard/nodes",
              "image": "fa fa-lock"
            }
          ]
        },
        {
          "name": "Logs and Alerts",
          "url": "/manage/logger/index",
          "image": "fa fa-bars"
        }
      ]
    }
  }
});
/*
 joolaDirective.directive('sidebar', function () {
 return {
 restrict: 'E',
 replace: true,
 template: '<li ng-repeat="l in logs"></li>'

 }
 });
 */