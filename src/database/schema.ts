import {
  Column,
  IsUUID,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  IsEmail,
  Unique,
  Length,
  Table,
  Default,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

export enum ExperienceType {
  Education = "education",
  Job = "job",
}

export enum SocialStatus {
    Single = 'single',
    Married = 'married',
    Divorced ='divorced',
    Widowed = 'widowed',
    Separated = 'separated'
}

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Length({ min: 2, max: 100 })
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Length({ min: 5, max: 8 })
  @Column(DataType.STRING)
  password!: string;
}

@Table
export class Candidate extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id?: string;

  @AllowNull(false)
  @Length({ min: 2, max: 100 })
  @Column(DataType.STRING)
  name?: string;

  @AllowNull(false)
  @Length({ min: 2, max: 100 })
  @Column(DataType.STRING)
  lastName!: string;

  @Column(DataType.STRING)
  position!: string;

  @Column(DataType.STRING)
  about!: string;

  @Column(DataType.STRING)
  phone!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  resumeUrl!: string;

  @Default(SocialStatus.Single)
  @Column(DataType.ENUM(
    SocialStatus.Single, 
    SocialStatus.Married,
    SocialStatus.Divorced,
    SocialStatus.Separated, 
    SocialStatus.Widowed, 
  ))
  socialStatus!: SocialStatus;

  @Column(DataType.ARRAY(DataType.STRING))
  skills!: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  softSkills!: string[];

  @HasMany(() => CandidateExperience)
  experience!: Array<CandidateExperience>;

  @HasMany(() => SocialItem)
  socials!: SocialItem[];
}

@Table
export class CandidateExperience extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUID)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Length({ min: 2, max: 100 })
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  periodStart!: Date;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  periodEnd!: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  degree!: string; //Puesto o titulo universitario

  @Length({ min: 2, max: 250 })
  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  technologies!: string[];

  @Column(DataType.TEXT)
  link!: string;

  @AllowNull(false)
  @Default(ExperienceType.Education)
  @Column(DataType.ENUM("education", "job"))
  type!: ExperienceType;

  @ForeignKey(() => Candidate)
  @AllowNull(false)
  @Column(DataType.UUID)
  candidateId!: string;

  @BelongsTo(() => Candidate)
  candidate!: Candidate;
}

@Table
export class SocialItem extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUID)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  url!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  name!: string;

  @ForeignKey(() => Candidate)
  @AllowNull(false)
  @Column(DataType.UUID)
  candidateId!: string;

  @BelongsTo(() => Candidate)
  candidate!: Candidate;
}
