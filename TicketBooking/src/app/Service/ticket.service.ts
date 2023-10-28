import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../Model/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = 'http://localhost:8080/tickets'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.baseUrl, ticket);
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl);
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/${ticketId}`);
  }

  findTicketByCode(ticketCode: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/code/${ticketCode}`);
  }

  modifyTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.baseUrl, ticket);
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${ticketId}`);
  }
}
