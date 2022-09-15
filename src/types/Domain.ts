import { ObjectType, Field, Int, InputType } from "type-graphql";

@ObjectType()
export class Domain {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  subdomain?: string;
}
