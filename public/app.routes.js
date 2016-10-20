app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/components/posts/posts.html',
      controller: 'MainCtrl',
	   resolve: {
    postPromise: ['posts', function(posts){
      return posts.getAll();
    }]
  }
    })
	.state('posts', {
  url: '/posts/{id}',
  templateUrl: '/components/posts/comments.html',
  controller: 'PostsCtrl',
  resolve: {
    post: ['$stateParams', 'posts', function($stateParams, posts) {
      return posts.get($stateParams.id);
    }]
  }
})
.state('login', {
  url: '/login',
  templateUrl: '/components/auth/login.html',
  controller: 'AuthCtrl',
  onEnter: ['$state', 'auth', function($state, auth){
    if(auth.isLoggedIn()){
      $state.go('home');
    }
  }]
})
.state('register', {
  url: '/register',
  templateUrl: '/components/auth/register.html',
  controller: 'AuthCtrl',
  onEnter: ['$state', 'auth', function($state, auth){
    if(auth.isLoggedIn()){
      $state.go('home');
    }
  }]
})
;

  $urlRouterProvider.otherwise('home');
}]);
