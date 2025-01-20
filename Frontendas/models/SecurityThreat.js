export class SecurityThreat {
    constructor(data) {
        this.Id = data.id; 
        this.Name = data.name;
        this.Description = data.description;
        this.DateAdded = data.dateAdded;
        this.RelatedEvent = data.relatedEvent;
        this.User = data.user;
        this.Downvoted = data.downvoted;
        this.Upvoted = data.upvoted;
    }
}