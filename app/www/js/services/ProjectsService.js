angular
  .module('todoApp')
  .factory('Projects', Projects);

Projects.$inject = ['$http', '$q', 'ApiEndpoint', '$rootScope', '$state'];
function Projects($http, $q, ApiEndpoint, $rootScope, $state) {
  var service = {
    all: all,
    newProject: newProject,
    getTasks: getTasks,
    newTask: newTask,
    updateTask: updateTask,
    deleteTask: deleteTask
  };

  var globalProjects = [];
  var baseUrl = ApiEndpoint.url;

  return service;

  ////////////////
  function all() {
    console.log("Projects.all");
    console.log('$rootScope.user', $rootScope.user)
    if ($rootScope.user === "undefined" || $rootScope.user == null) {
      $state.go('login');
    } else {
      var url = baseUrl + '/appusers/' + $rootScope.user.userId + '/projects?access_token=' + $rootScope.user.id;
      console.log(url);
      return $http.get(url).then(function (response) {
        console.log(response);
        globalProjects = response.data;
        return globalProjects;
      })
    }
  }

  function newProject(projectTitle) {
    console.log("Projects.newProject");
    var project = {
      name: projectTitle,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: $rootScope.user.userId
    };

    var url = baseUrl + '/projects?access_token=' + $rootScope.user.id;
    return $http.post(url, project).then(function (response) {
      console.log(response);
      return response.data;
    });
  }

  function getTasks(project) {
    //var url = baseUrl + '/project/' + project.id + '/tasks'
    var url = baseUrl + '/projects/' + project.id + '/tasks?access_token=' + $rootScope.user.id;
    return $http.get(url).then(function (response) {
      console.log('tasks', response);
      return response.data;
    })

  }

  function newTask(taskName, project) {
    console.log("Projects.newTask");
    var task = {
      name: taskName,
      completed: false,
      created_at: new Date(),
      updated_at: new Date()
    };

    //var url = baseUrl + '/project/' + project.id + '/tasks';
    var url = baseUrl + '/projects/' + project.id + '/tasks?access_token=' + $rootScope.user.id;
    return $http.post(url, task).then(function (response) {
      console.log(response);
      return response.data;
    });
  }

  function updateTask(task, project) {
    //var url = baseUrl + '/project/' + project.id + '/tasks';
    var url = baseUrl + '/projects/' + project.id + '/tasks/' + task.id + '?access_token=' + $rootScope.user.id;
    return $http.put(url, task).then(function (response) {
      console.log(response);
      return response.data;
    });
  }

 function deleteTask(task, project) {
    //var url = baseUrl + '/project/' + project.id + '/tasks';
    var url = baseUrl + '/projects/' + project.id + '/tasks/' + task.id + '?access_token=' + $rootScope.user.id;
    return $http.delete(url, task).then(function (response) {
      console.log(response);
      return response.data;
    });
  }
  
}