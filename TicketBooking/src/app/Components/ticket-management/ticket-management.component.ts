
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../Model/ticket';
import { TicketService } from '../../Service/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss'],
})
export class TicketManagementComponent implements OnInit {

  ticketForm!: FormGroup;
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;

  editMode: boolean = false;
  add: boolean = false;
  cardView: boolean = true;
  // Define an array of station options with your logic
stationOptions = ['A', 'B', 'C', 'D', 'E'];

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    console.log("add: ",this.add);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadTickets();
   
  }
  initializeForm() {
    this.ticketForm = this.fb.group({
      ticketCode: ['', Validators.required],
      name: ['', Validators.required],
      startStation: ['A'], // Set initial value
      lastStation: ['B'],  // Set initial value
      price: {value: 5,disabled:true},
      expiryTime: { value: 8, disabled: true },
      usedForEntry: [false],
      usedForExit: [false],
    });

    // Add event listeners to 'startStation' and 'lastStation'
    this.ticketForm.get('startStation')?.valueChanges.subscribe((startStation) => {
      const lastStation = this.ticketForm.get('lastStation')?.value;
      this.calculateAndUpdatePrice(startStation, lastStation);
    });

    this.ticketForm.get('lastStation')?.valueChanges.subscribe((lastStation) => {
      const startStation = this.ticketForm.get('startStation')?.value;
      this.calculateAndUpdatePrice(startStation, lastStation);
    });
  }

  // Add the calculateAndUpdatePrice method here
  calculateAndUpdatePrice(boardingStation: string, destinationStation: string) {
    const price = this.calculatePrice(boardingStation, destinationStation);
    this.ticketForm.get('price')?.setValue(price);
  }


  loadTickets() {
    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  createTicket() {
    this.add = true;
    this.cardView = false;
  
    if (this.ticketForm.valid) {
      const newTicket: Ticket = this.ticketForm.value as Ticket;
      const price = this.calculatePrice(newTicket.startStation, newTicket.lastStation);
      newTicket.price = price;
  
      this.ticketService.createTicket(newTicket).subscribe((createdTicket) => {
        this.tickets.push(createdTicket);
        this.ticketForm.reset();
        location.reload();
      });
    }
  }
  
  updateTicket() {
    if (this.selectedTicket) {
      const updatedTicket: Ticket = this.ticketForm.value as Ticket;
      updatedTicket.ticketId = this.selectedTicket.ticketId;
  
      const price = this.calculatePrice(updatedTicket.startStation, updatedTicket.lastStation);
      updatedTicket.price = price;

      this.ticketService.modifyTicket(updatedTicket).subscribe((updatedTicket) => {
        this.selectedTicket = null;
        this.ticketForm.reset();
        location.reload();
      });
    }
  }
  
  
  

  editTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
    // Exclude 'ticketId' from the patchValue operation
    const { ticketId, ...ticketData } = this.selectedTicket;
    this.ticketForm.patchValue(ticketData);
    this.editMode = true;
    this.cardView = false;
  }

 

  deleteTicket(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket.ticketId).subscribe(() => {
      this.tickets = this.tickets.filter((t) => t !== ticket);
      this.selectedTicket = null; // Clear the selected ticket
     
    });
     location.reload();
  }
  cancelEdit() {
    this.selectedTicket = null;
    this.ticketForm.reset();
    location.reload();
  }

  calculatePrice(boardingStation: string, destinationStation: string): number {
    // Define the price logic based on the station combination
    const priceMap: { [key: string]: { [key: string]: number } } = {
      'A': {
        'B': 5,
        'C': 10,
        'D': 15,
        'E': 20,
      },
      'B': {
        'C': 5,
        'D': 10,
        'E': 15,
        'A': 5
      },
      'C': {
        'D': 5,
        'E': 10,
        'A':10,
        'B':5
      },
      'D': {
        'E': 5,
        'A': 15,
        'B':10,
        'C':5
      },
      'E': {
        'B': 15,
        'C': 10,
        'D': 5,
        'A': 20,
      },
    };
  
    if (priceMap[boardingStation] && priceMap[boardingStation][destinationStation]) {
      return priceMap[boardingStation][destinationStation];
    } else {
      return 0; // Return 0 if the combination is not found
    }
  }
  
  
  
}