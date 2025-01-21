export class SecurityEvent {
    constructor(data) {
        this.Id = data.id;
        this.Title = data.title;
        this.Description = data.description;
        this.DateOccured = data.dateOccured;
        this.Severity = data.severity;
        this.Category = data.category;
        this.Source = data.source;
        this.Impact = data.impact;
        this.Response = data.response;
        this.User = data.User;
        this.SecurityThreat = data.securityThreat;
        this.Downvoted = data.downvoted;
        this.Upvoted = data.upvoted;
    }
}