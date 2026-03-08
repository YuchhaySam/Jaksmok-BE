import { UserService } from "./services/user.service";
import { BookService } from "./services/book.service";
import { books } from "./mock-data/data";
import { MysqlDataSource } from "./database/data-source";

async function runSeed() {
  try {
    await MysqlDataSource.initialize();

    //Insert mock user
    //We set a static id here is to avoid duplication on every docker start
    const staticId = "292ed22e-27f0-414d-93bb-731237a15dd1";
    await UserService.createUser(staticId, "sampleId", "Secret");
    await BookService.createBook(books);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await MysqlDataSource.destroy();
  }
}

runSeed();
