import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from "../../../environments/environment";
import {BACK_URL} from "../../../environments/environment";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = API_URL;
  token?: string;
  isInit: boolean = false;
  initEvent: Subject<boolean> = new Subject<boolean>();

  private isAuthenticated: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.init();
  }

  public async init(){
    // Récupère le code dans l'url
    let urlParams = new URLSearchParams(window.location.search);

    // S'il y a un code dans l'url, on effectue une requête pour récupérer le token
    if(urlParams.has('code')){
      let code = urlParams.get('code') as string;

      // Effectue la requête sur le callback de l'API
      let res = await this.requestApi('/auth/callback', 'GET', {code});
      if(res && res.token){
        this.savTokens(res.token);
        this.router.navigate(['/']);
      }
    }else{
      // Sinon on récupère le token dans le localstorage s'il existe et on le stocke dans la variable token
      this.token = localStorage.getItem('apiToken') ? JSON.parse(localStorage.getItem('apiToken') as string).token : undefined;
    }

    // On indique que l'initialisation est terminée
    this.isInit = true;
    this.initEvent.next(true);
  }


  public async requestApi(action: string, method: string = 'GET', datas: any = {}, httpOptions: any = {}): Promise<any> {
    // if (!this.onlineStatusService.getIsOnline()) {
    //   console.log('no request because offline');
    //   return;
    // }

    const methodWanted = method.toLowerCase();
    let route = API_URL + action;

    let req = null;

    if (httpOptions.headers === undefined) {
      httpOptions.headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
    }

    if (this.token) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    }

    switch (methodWanted) {
      case 'post':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'patch':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'put':
        req = this.http.put(route, datas, httpOptions);
        break;
      case 'delete':
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.delete(route, httpOptions);
        break;
      default:
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.get(route, httpOptions);
        break;
    }

    return req.toPromise();
  }

  // Enregistre le token dans le localstorage et dans la variable token
  savTokens(apiToken: string) {
    this.token = apiToken;
    localStorage.setItem('apiToken', JSON.stringify({ token: apiToken }));
  }
  

  // Vérifie si l'utilisateur est connecté
  isLogged(): boolean{
    return this.token !== undefined;
  }

  // logout
  logout(): Promise<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe({
        next: () => {
          localStorage.removeItem('apiToken'); 
          this.token = undefined;
          resolve(); 
        },
        error: (error: any) => { 
          console.error('Erreur lors de la déconnexion', error);
          reject(error);
        }
      });
    });
  }
  
  
  

  private getToken(): string | null {
    // Retourner le jeton stocké localement, si présent
    return localStorage.getItem('apiToken');
  }
  


  inscription(userData: any) {
    // Utilisez HttpClient pour envoyer une requête POST vers l'API Laravel pour l'inscription
    return this.requestApi('/register', 'POST', userData);
  }

// se connecter 
  login(loginData: any) {
    return this.requestApi('/login', 'POST', loginData);
  }
// créer une annonce
 createAd(adData: any): Promise<any> {
    return this.requestApi('/ads', 'POST', adData);
  }
  // récupérer les jeux
  getGames(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/games`);
  }
  // récupérer les annonces dont les dates sont valides
  getValidAds(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/valid-ads`);
  }
// valider une annonce 
validateAd(adId: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.post<any>(`${this.apiUrl}/ads/${adId}/validate`, {}, { headers });
}
// les annonces acceptées
getAcceptedAds(): Observable<any[]> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  return this.http.get<any[]>(`${this.apiUrl}/accepted-ads`, { headers: headers });
}
// les annonces postées 
getPostedAds(): Observable<any[]> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  return this.http.get<any[]>(`${this.apiUrl}/posted-ads`, { headers: headers });
}
// annuler la validation d'une annonce
unvalidateAd(adId: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token 
  });

  return this.http.post(`${this.apiUrl}/ads/${adId}/unvalidate`, {}, { headers });
}
// Validation finale d'une annonce validé
finalizeAdValidation(adId: number, isValid: boolean): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token 
  });

  return this.http.post(`${this.apiUrl}/ads/${adId}/finalize-validation`, { is_valid: isValid }, { headers });
}
// Annonces doublement validées

getDoubleValidatedAds(): Observable<any> {
  return this.http.get(`${this.apiUrl}/double-validated-ads`, {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  });
}
// Suppression de la double validation finale 

unfinalizeAdValidation(adId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/ads/${adId}/unfinalize-validation`, {}, {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  });
}
// Suppression d'une annonce par l'utilisateur si elle n'est pas validé du tout
deleteAd(adId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/ads/${adId}`, {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
      })
  });
}
// récupérer les informations du profil
getProfile(): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
}


}
