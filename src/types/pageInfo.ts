import { ObjectType, Field, Int, InputType } from "type-graphql";

@ObjectType()
export class PageInfo {
  @Field(() => String)
  type!: number;

  @Field(() => String)
  site!: string;

  @Field(() => String, { nullable: true })
  headers?: string;

  @Field(() => Number)
  status!: number;

  @Field(() => String, { nullable: true })
  statusText?: string;

  @Field(() => String, { nullable: true })
  error?: string;
}
