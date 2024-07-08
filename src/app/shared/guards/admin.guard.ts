import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {
  //   return this.userService.getProfile().pipe(
  //     map((u: any) => {
  //       if (u.metadata.roles[0] === "ADMIN") {
  //         return true; 
  //       } 
  //       console.log("User is not admin");
  //       return false; 
  //     })
  //   );
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.userService.getProfile(); // gọi getProfile để kích hoạt việc lấy dữ liệu
    return this.userService.user$.pipe(
      filter(u => u !== null), // chỉ tiến hành khi u đã có giá trị
      take(1), // chỉ lấy giá trị đầu tiên và kết thúc
      map((u: any) => {
        if (u.metadata.roles[0] === "ADMIN") {
          return true;
        }
        console.log("User is not admin");
        return false;
      })
    );
  }
}
