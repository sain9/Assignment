package ticket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticket.model.Ticket;
import ticket.repository.TicketRepository;

import java.util.List;
import java.util.UUID;

@Service
public class TicketService {

    @Autowired
    private TicketRepository repository;

    //DEFINING CRUD OPERATIONS

    //Create method ,syntax [public returnType of the method ][ method name] ()
    public Ticket addTicket(Ticket ticket) {
              ticket.setTicketId(UUID.randomUUID().toString().split("_")[0]);
              return repository.save(ticket);
    }

    //Read all
    public List<Ticket> findAllTickets () {
      return repository.findAll();
    }

    //Read single by id
    public Ticket getTicketById(String ticketId ){
        return  repository.findById(ticketId).get();
    }

    //Read single by code
    public List <Ticket> getTicketByCode(String ticketCode ){
      return repository.findByTicketCode(ticketCode);
    }

    //Update
    public Ticket updateTicket(Ticket ticketRequest ){
        //Get the existing document from db
        //populate new value from request to existing object
       Ticket existingTicket = repository.findById(ticketRequest.getTicketId()).get();

       existingTicket.setTicketCode(ticketRequest.getTicketCode());
       existingTicket.setName(ticketRequest.getName());
       existingTicket.setPrice(ticketRequest.getPrice());
       existingTicket.setStartStation(ticketRequest.getStartStation());
       existingTicket.setLastStation(ticketRequest.getLastStation());
       return repository.save(existingTicket);
    }

    //Delete
    public String deleteById (String ticketId){
        repository.deleteById(ticketId);
        return ticketId+" Ticket deleted successfully !";
    }

}
