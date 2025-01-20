export class SecurityThreat {
    constructor(data) {
        this.Id = data.id; 
        this.Name = data.name;
        this.Description = data.description;
        this.DateOccured = data.dateOccured;
        this.Severity = data.severity;
        this.Category = data.category;
        this.Source = data.source;
        this.Impact = data.impact;
        this.Response = data.response;
    }
}