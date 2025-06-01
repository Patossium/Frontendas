export class Badge {
    constructor(data) {
        this.Id = data.Id || data.id;
        this.Text = data.Text || data.text;
        this.User = data.user;
        this.SecurityEvent = data.securityEvent;
        this.Downvoted = data.downvoted;
        this.Upvoted = data.upvoted;
    }
}