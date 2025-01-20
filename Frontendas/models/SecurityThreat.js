export class SecurityThreat {
    constructor(data) {
        this.Id = data.id; 
        this.Title = data.title;
        this.Description = data.description;
        //this.FirstOccured = data.firstOccured;
        //this.LastOccured = data.lastOccured;
        //this.DateAdded = data.dateAdded;
        this.Severity = data.severity;
        this.Status = data.status;
        this.Category = data.category;
        this.Source = data.source;
        //this.RelatedEvent = data.RelatedEvent;
        this.Visibility = data.visibility;
        //this.User = data.User;
        this.Impact = data.impact;
        this.Response = data.response;
    }
}