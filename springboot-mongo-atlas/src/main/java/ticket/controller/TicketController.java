package ticket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ticket.model.Ticket;
import ticket.service.TicketService;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin("*")
public class TicketController {

    @Autowired
    private TicketService service;

//POST   http://localhost:8080/tickets  no need to provide ticketId in the body
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket createTicket(@RequestBody Ticket ticket){
        return service.addTicket(ticket);
    }
//GET   http://localhost:8080/tickets
    @GetMapping
    public List<Ticket> getTickets(){
        return service.findAllTickets();
    }
//GET   http://localhost:8080/tickets/IdToBeUpdated
    @GetMapping("/{ticketId}")
    public Ticket getTicket(@PathVariable String ticketId ){
        return service.getTicketById(ticketId);
    }
//GET http://localhost:8080/tickets/code/13xyz
    @GetMapping("/code/{ticketCode}")
    public List <Ticket> findTicketByCode(@PathVariable String ticketCode ){
        return service.getTicketByCode(ticketCode);
    }

//UPDATE   http://localhost:8080/tickets   dont forget to provide ticketId in the body for updating
    @PutMapping
    public Ticket modifyTicket(@RequestBody Ticket ticket){
        return service.updateTicket(ticket);
    }

//DELETE    http://localhost:8080/tickets/c1a1b47f-d11a-40a0-a0e7-43c57f49aa6f
    @DeleteMapping("/{ticketId}")
    public String DeleteTicket(@PathVariable String ticketId){
        return service.deleteById(ticketId);
    }

}
