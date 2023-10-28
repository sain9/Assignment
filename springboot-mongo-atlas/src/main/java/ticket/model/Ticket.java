package ticket.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tickets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

    @Id
    private String ticketId;
    private String ticketCode;
    private String name;
    private String startStation;
    private String lastStation;
    private int price;

    private int expiryTime;
    private boolean usedForEntry;
    private boolean usedForExit;

}
