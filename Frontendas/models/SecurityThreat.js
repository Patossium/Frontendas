export class SecurityThreat {
    constructor(data) {
        this.Id = data.id; 
        this.Name = data.name;
        this.Description = data.description;
        this.RelatedEvent = data.RelatedEvent;
    }
}