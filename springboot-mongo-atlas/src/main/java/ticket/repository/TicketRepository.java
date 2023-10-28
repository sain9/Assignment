package ticket.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ticket.model.Ticket;

import java.util.List;


//entity and  Data type of the primary key of the model(i.e Ticket, String)
public interface TicketRepository extends MongoRepository<Ticket,String> {
    List<Ticket> findByTicketCode(String ticketCode);
}
