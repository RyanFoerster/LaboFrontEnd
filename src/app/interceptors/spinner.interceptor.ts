// import {Injectable} from '@angular/core';
// import {
//     HttpRequest,
//     HttpHandler,
//     HttpEvent,
//     HttpInterceptor
// } from '@angular/common/http';
// import {finalize, Observable} from 'rxjs';
//
// @Injectable()
// export class SpinnerInterceptor implements HttpInterceptor {
//
//     constructor() {
//     }
//
//     intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//         if(request.reportProgress) {
//             const dialog = this.dialogService.open(LoaderComponent, {
//                 closeOnEsc: false,
//                 closeOnBackdropClick: false,
//             });
//             return next.handle(request).pipe(
//                 finalize(() => {
//                     setTimeout(() => {
//                         dialog.close();
//                     }, 1000)
//                 }));
//         }
//         else {
//             return next.handle(request);
//         }
//     }
// }
