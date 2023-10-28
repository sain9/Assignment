export interface Ticket {
    ticketId: string;
    ticketCode: string;
    name: string;
    startStation: string;
    lastStation: string;
    price: number;
    expiryTime: number;
    usedForEntry: boolean;
    usedForExit:  boolean ;
  }
  