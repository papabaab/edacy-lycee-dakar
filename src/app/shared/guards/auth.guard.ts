import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state, router: Router = inject(Router)) => {
  console.log('AUTH GUARD CALLED: ', route, state)
  const login = localStorage.getItem("LOGIN")
  if(login == 'admin'){
    console.log("AUTH GUARD: TRUE")
    return true
  }

    router.navigate(['login'],{replaceUrl:true}).then(() => {
      console.log('LOGIN NEEDED')
    });

  return false;
};



