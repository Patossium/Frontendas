export class User {
    constructor(data) {
        this.Id = data.Id || data.id;
        this.Username = data.Username || data.username;
        this.Email = data.Email || data.email;
        this.Password = data.Password || data.password;
        this.Name = data.Name || data.name;
        this.Surname = data.Surname || data.surname;
        this.LockoutEnd = data.LockoutEnd || data.lockoutEnd;
        this.LockoutEnabled = data.LockoutEnabled || data.lockoutEnabled;
        this.Points = data.Points || data.points;
    }
}