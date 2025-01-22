export class Badge {
    constructor(data) {
        this.Id = data.Id || data.id;
        this.Title = data.Title || data.title;
        this.Description = data.Description || data.description;
        this.Image = data.Image || data.image;
        this.AssignedUserId = data.AssignedUserId || data.assignedUserId;
        this.AssignedUserName = data.AssignedUserName || data.assignedUserName;
    }
}