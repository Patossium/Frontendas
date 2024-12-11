export class SecurityThreat {
    constructor(data) {
        this.Id = data.Id;
        this.Title = data.Title;
        this.Description = data.Description;
        this.FirstOccured = data.FirstOccured;
        this.LastOccured = data.LastOccured;
        this.DateAdded = data.DateAdded;
        this.Severity = data.Severity;
        this.Status = data.Satus;
        this.Category = data.Category;
        this.Source = data.Source;
        this.RelatedEvent = data.RelatedEvent;
        this.Visibility = data.Visibility;
        this.User = data.User;
        this.Impact = data.Impact;
        this.Response = data.Response;
    }
}