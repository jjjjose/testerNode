import { ObjectType, Field, Int, InputType } from "type-graphql";

@ObjectType()
export class Domain {
  @Field(() => String, { nullable: true })
  status?: number;

  @Field(() => String, { nullable: true })
  subdomain?: string;
}
