import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  realYears!: string;

  @Column()
  year!: string;

  @Column()
  country!: string;

  @Column()
  language!: string;

  @Column({ type: "int" })
  pages!: number;

  @Column()
  wikipediaLink!: string;

  @Column()
  imageUrl!: string;
}
