import { ObjectType, Field, Int, InputType, InterfaceType } from "type-graphql";

@ObjectType()
class PageInfo {
  @Field(() => String)
  protocol!: number;

  @Field(() => String)
  siteUrl!: string;

  @Field(() => String)
  method!: string;

  @Field(() => Boolean, { nullable: true })
  redirect?: boolean;

  @Field(() => String, { nullable: true })
  redirectTo?: string;

  @Field(() => String, { nullable: true })
  headers?: string;

  @Field(() => Number)
  status!: number;

  @Field(() => String, { nullable: true })
  statusText?: string;

  @Field(() => String, { nullable: true })
  error?: string;
}

@ObjectType()
class MethodInfo {
  @Field((type) => PageInfo, { nullable: true })
  infoGET?: PageInfo;

  @Field((type) => PageInfo, { nullable: true })
  infoPOST?: PageInfo;

  @Field((type) => PageInfo, { nullable: true })
  infoPUT?: PageInfo;

  @Field((type) => PageInfo, { nullable: true })
  infoDELETE?: PageInfo;

  @Field((type) => PageInfo, { nullable: true })
  infoPATCH?: PageInfo;

  @Field((type) => PageInfo, { nullable: true })
  infoHEAD?: PageInfo;

  @Field((type) => PageInfo, { nullable: true })
  infoOPTIONS?: PageInfo;

  @Field((type) => PageInfo, { nullable: true })
  infoTRACE?: PageInfo;
}

@ObjectType()
export class infoStatusSite {
  @Field(() => String, { nullable: true })
  host?: string;

  @Field((type) => MethodInfo, { nullable: true })
  infoHTTP?: MethodInfo;

  @Field((type) => MethodInfo, { nullable: true })
  infoHTTPS?: MethodInfo;
}
