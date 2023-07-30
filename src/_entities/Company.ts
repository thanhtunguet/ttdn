import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Province } from './Province';
import { District } from './District';
import { Business } from './Business';

@Index('Company_Id_TaxCode_Name_index', ['id', 'taxCode', 'name'], {})
@Index('Company_pk', ['id'], { unique: true })
@Index('Company_pk2', ['taxCode'], { unique: true })
@Entity('Company', { schema: 'dbo' })
export class Company {
  @Column('bigint', { primary: true, name: 'Id' })
  id: string;

  @Column('nvarchar', {
    name: 'TaxCode',
    nullable: true,
    unique: true,
    length: 500,
  })
  taxCode: string | null;

  @Column('nvarchar', { name: 'Name', nullable: true, length: 500 })
  name: string | null;

  @Column('datetime', { name: 'CreatedAt', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'UpdatedAt', nullable: true })
  updatedAt: Date | null;

  @Column('datetime', { name: 'DeletedAt', nullable: true })
  deletedAt: Date | null;

  @Column('nvarchar', { name: 'Representative', nullable: true, length: 500 })
  representative: string | null;

  @Column('nvarchar', { name: 'MainBusiness', nullable: true, length: 500 })
  mainBusiness: string | null;

  @Column('nvarchar', { name: 'Address', nullable: true, length: 500 })
  address: string | null;

  @Column('datetime', { name: 'IssuedAt', nullable: true })
  issuedAt: Date | null;

  @Column('nvarchar', { name: 'CurrentStatus', nullable: true, length: 500 })
  currentStatus: string | null;

  @Column('nvarchar', { name: 'AlternateName', nullable: true, length: 500 })
  alternateName: string | null;

  @ManyToOne(() => Province, (province) => province.companies)
  @JoinColumn([{ name: 'ProvinceId', referencedColumnName: 'id' }])
  province: Province;

  @ManyToOne(() => District, (district) => district.companies)
  @JoinColumn([{ name: 'DistrictId', referencedColumnName: 'id' }])
  district: District;

  @ManyToMany(() => Business, (business) => business.companies)
  businesses: Business[];
}
