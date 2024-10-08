import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { DISCOUNT_URL, FOOD_SEARCH, NOTIFICATION_LIST_URL } from '../constants/urls';
import { FOOD_UPDATE, USER_ALL_URL, FOOD_URL } from 'src/app/admin/shared/constants/urls';

var pendingRequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private excludedUrls: string[] = [
    FOOD_SEARCH,
    FOOD_UPDATE,
    FOOD_URL,
    USER_ALL_URL,
    DISCOUNT_URL,
    NOTIFICATION_LIST_URL
  ];

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const shouldExclude = this.excludedUrls.some(url => request.url.includes(url));

    if (!shouldExclude) {
      this.loadingService.showLoading();
      pendingRequests = pendingRequests + 1;
    }

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            if (!shouldExclude) {
              this.handleHideLoading();
            }
          }
        },
        error: (_) => {
          if (!shouldExclude) {
            this.handleHideLoading();
          }
        }
      })
    );
  }

  handleHideLoading() {
    pendingRequests = pendingRequests - 1;
    if (pendingRequests === 0) {
      this.loadingService.hideLoading();
    }
  }
}
