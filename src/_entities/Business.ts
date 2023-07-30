import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { Company } from './Company';

@Index('Business_Id_Code_Name_index', ['id', 'code', 'name'], {})
@Index('Business_pk', ['id'], { unique: true })
@Index('Business_pk2', ['code'], { unique: true })
@Entity('Business', { schema: 'dbo' })
export class Business {
  @Column('bigint', { primary: true, name: 'Id' })
  id: string;

  @Column('nvarchar', {
    name: 'Code',
    nullable: true,
    unique: true,
    length: 500,
  })
  code: string | null;

  @Column('nvarchar', { name: 'Name', nullable: true, length: 500 })
  name: string | null;

  @Column('datetime', { name: 'CreatedAt', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'UpdatedAt', nullable: true })
  updatedAt: Date | null;

  @Column('datetime', { name: 'DeletedAt', nullable: true })
  deletedAt: Date | null;

  @ManyToMany(() => Company, (company) => company.businesses)
  @JoinTable({
    name: 'CompanyBusinessMapping',
    joinColumns: [{ name: 'BusinessId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'CompanyId', referencedColumnName: 'id' }],
    schema: 'dbo',
  })
  companies: Company[];
}
