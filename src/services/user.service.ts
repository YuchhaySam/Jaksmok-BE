import { MysqlDataSource } from "../database/data-source";
import { UserEntity } from "../entity/user.entity";
import bcrypt from "bcryptjs";

export class UserService {
  static async login(
    username: string,
    password: string,
  ): Promise<{ id: string; username: string }> {
    const foundUser = await MysqlDataSource.manager.findOne(UserEntity, {
      where: { username },
      select: ["id", "username", "password"],
    });
    if (!foundUser) throw new Error("INVALID_CREDENTIAL");
    const comparedPassword = await bcrypt.compare(password, foundUser.password);
    if (!comparedPassword) throw new Error("INVALID_CREDENTIAL");
    return {
      id: foundUser.id,
      username: foundUser.username,
    };
  }

  static async createUser(
    id: string,
    username: string,
    password: string,
  ): Promise<void> {
    if (!id || !username || !password) throw new Error("Invalid configuration");
    const hashedPass = await bcrypt.hash(password, 10);
    await MysqlDataSource.manager.upsert(
      UserEntity,
      {
        id,
        username,
        password: hashedPass,
      },
      ["id"],
    );
  }
}
