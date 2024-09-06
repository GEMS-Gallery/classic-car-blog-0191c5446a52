import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BlogPost {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'imageUrls' : [] | [Array<string>],
  'createdAt' : Time,
}
export interface Comment {
  'id' : bigint,
  'content' : string,
  'createdAt' : Time,
  'author' : string,
  'postId' : bigint,
}
export type Result = { 'ok' : BlogPost } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addComment' : ActorMethod<[bigint, string, string], Result_1>,
  'createBlogPost' : ActorMethod<
    [string, string, [] | [Array<string>]],
    Result_1
  >,
  'getBlogPost' : ActorMethod<[bigint], Result>,
  'getBlogPosts' : ActorMethod<[], Array<BlogPost>>,
  'getComments' : ActorMethod<[bigint], Array<Comment>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
