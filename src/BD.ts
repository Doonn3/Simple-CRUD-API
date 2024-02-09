export type UserType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

class BD {
  private userMap = new Map<string, UserType>();

  public SetUser(userID: string, user: UserType): boolean {
    if (!this.userMap.has(userID)) {
      this.userMap.set(userID, user);
      return true;
    }
    return false;
  }

  public RemoveUser(userID: string): boolean {
    if (this.userMap.has(userID)) {
      this.userMap.delete(userID);
      return true;
    }
    return false;
  }

  public GetUser(userID: string): UserType | null {
    if (this.userMap.has(userID)) {
      return this.userMap.get(userID) ?? null;
    }

    return null;
  }

  public UpdateUser(userID: string, user: UserType) {
    if (this.userMap.has(userID)) {
      this.userMap.set(userID, user);
      return true;
    }

    return false;
  }

  public GetAll() {
    const result = this.userMap.values();
    return [...result];
  }
}

export const bd = new BD();

export function validateUserType(user: any): user is UserType {
  const id = typeof user.id === "string";
  const username = typeof user.username === "string";
  const age = typeof user.age === "number";

  const hobbies =
    Array.isArray(user.hobbies) &&
    user.hobbies.every((hobby: any) => typeof hobby === "string");

  if (id && username && age && hobbies) {
    return true;
  }

  return false;
}
