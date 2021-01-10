import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KnjizaraService {

  constructor(private router: Router, private http: HttpClient) {
  }


  baseUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
  loginUrl = '/login';
  registerUserUrl = '/register_user';
  changePasswordUrl = '/changepassword';
  registrationRequestsUrl = '/registration_request';
  usersUrl = '/users';
  booksUrl = '/books';
  addBookUrl = '/addBook';
  bookUrl = '/book';
  zanrUrl = '/zanr';
  eventUrl = '/events';
  updateUserProfileUrl = '/user';
  updateBookProfileUrl = '/updateBook';
  bookRequestsUrl='/bookRequest';
  addReadBookUrl = '/readBook';
  addReadingBookUrl = '/readingBook';
  addCommentBookUrl = '/comment';
  newZanrUrl='/newZanr';


  setCredentials(username: string, userType: any) {
    localStorage.setItem('username', username);
    localStorage.setItem('type', userType);
  }

  getUsername(): string {
    return localStorage.getItem("username");

  }

  getUserType(): string {
    return localStorage.getItem("type");

  }

  nextPage() {

    switch (this.getUserType()) {
      case "regUser":
        this.router.navigate([`/profile/${this.getUsername()}`]);
        break;
      case "moderator":
        this.router.navigate([`/profile/${this.getUsername()}`]);
        break;
      case "admin":
        this.router.navigate(["/admin"]);
        break;
      default:
        console.log("Error:Unknown userType!");
        break;
    }
  }

  login(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.baseUrl}${this.loginUrl}`, user);
  }


  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    this.router.navigate(["/login"]);
  }

  registerRequest(userInfo: any): Observable<any> {
    const userData = new FormData();
    userData.append("firstname", userInfo.firstname);
    userData.append("lastname", userInfo.lastname);
    userData.append("date", userInfo.date);
    userData.append("place", userInfo.place);
    userData.append("username", userInfo.username);
    userData.append("email", userInfo.email);
    userData.append("password", userInfo.password);
    userData.append("image", userInfo.photo, userInfo.username);
    console.log(userData);
    return this.http.post<any>(`${this.baseUrl}${this.registrationRequestsUrl}`, userData);
  }

  registerUser(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.registerUserUrl}`, userInfo);
  }

  getRegistrationRequests(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.registrationRequestsUrl}`);
  }

  getBookRequests(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.bookRequestsUrl}`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.usersUrl}`);
  }

  getUserInfo(username: string):  Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.usersUrl}/${username}`);
  }

  changeUserType(user: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.usersUrl}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.usersUrl}`, { userType: user.userType, username: user.username });
  }

  updateUserProfile(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.updateUserProfileUrl}`, user);
  }

  updateBookProfile(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.updateBookProfileUrl}`, user);
  }


  deleteUserRegistrationRequest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${this.registrationRequestsUrl}/${id}`);
  }



  deleteBookRequest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${this.bookRequestsUrl}/${id}`);
  }


  //Books
  getBooks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.booksUrl}`);
  }

  getBook(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.bookUrl}/${id}`);
  }

  addBook(nurseryInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.addBookUrl}`, nurseryInfo);
  }


  newBook(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.bookRequestsUrl}`, userInfo);
  }

  newZanr(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.newZanrUrl}`, userInfo);
  }

  getZanrovi(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}${this.zanrUrl}`);
  }



  getEvents(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}${this.eventUrl}`);
  }

  // dodaj u listu procitanih i u listu knjiga koje se citaju trenutno


  addToReadList(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.addReadBookUrl}`, {book: userInfo, user: this.getUsername()});
  }

  addToReadingList(bookId: any,pages:any,pagesRead:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.addReadingBookUrl}`,  {book: bookId, user: this.getUsername(), pages: pages, pagesRead: pagesRead});
  }
  //pretraga po imenu
  filterByTitle(searchText: string, array: any[]): any[] {
    return array.filter(el => el.title.toLowerCase().indexOf(searchText.toLocaleLowerCase()) != -1);
  }

  comment(bookId:any, username:string, tekst:string){
    return this.http.post<any>(`${this.baseUrl}${this.addCommentBookUrl}`,  {bookId:bookId, username:username, tekst:tekst});
  }

  filterByAuthor(searchText: string, array: any[]): any[] {
    return array.filter(el => {
      let found = false;
      el.authors.forEach(author => {
        console.log(author);console.log(searchText);
        if (author.toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
          found = true;
        }
      });
      return found;
    });
  }

  filterByGenre(genrSearch: string, array: any[]): any[] {
    return array.filter(el => {
      let found = false;
      el.genres.forEach(genre => {
        if (genre.indexOf(genrSearch) != -1) {
          found = true;
        }
      });
      return found;
    });
  }

  //change password

  changePassword(oldPassword: any, password: any): Observable<any> {
    const changeP = {
        username: this.getUsername(),
        password: password,
        oldPassword: oldPassword
    }
    return this.http.post<any>(`${this.baseUrl}${this.changePasswordUrl}`, changeP);
}

logOutUser(): void {
  this.clearCredentials();

  this.router.navigate(['/']);
}

clearCredentials(): void {
  localStorage.removeItem('username');
  localStorage.removeItem('type');
}



}
