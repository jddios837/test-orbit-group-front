import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url= 'https://localhost:5001/api/student';

  students: any[];
  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  createStudent(student: object): Observable<object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}`, student);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateStudent(id: number, value: any): Observable<object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  checkUserName(username: string): Observable<any> {
    return this.http.get(`${this.url}/username/${username}`);
  }
}
