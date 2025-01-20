export class SecurityThreat {
    constructor(data) {
        this.Id = data.id; 
        this.Title = data.title;
        this.Description = data.description;
        this.RelatedEvent = data.RelatedEvent;
    }
}