define([
	'views/home',
	'views/main/formatBar',
	'views/auth/landing',
	'views/auth/signUp',
	'views/auth/signIn',
	'views/auth/resetPassword',
	'views/auth/settings',
	'views/projects/projects',
], function(Home, FormatBar, Landing, SignUp, SignIn, ResetPassword, Settings, Projects) {
	var Views = {
		Home: Home,
		FormatBar: FormatBar,
		Landing: Landing,
		SignUp: SignUp,
		SignIn: SignIn,
		ResetPassword: ResetPassword,
		Settings: Settings,
		Projects: Projects
	};
	return Views;
});