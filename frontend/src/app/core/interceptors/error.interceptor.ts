import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationService = inject(NotificationService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Une erreur est survenue';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = error.error.message;
            } else {
                // Server-side error
                if (error.status === 401) {
                    errorMessage = 'Session expirée ou non autorisée';
                } else if (error.status === 403) {
                    errorMessage = 'Accès refusé';
                } else if (error.status === 404) {
                    errorMessage = 'Ressource non trouvée';
                } else if (error.error && error.error.message) {
                    errorMessage = error.error.message;
                }
            }

            notificationService.error(errorMessage);
            return throwError(() => error);
        })
    );
};
