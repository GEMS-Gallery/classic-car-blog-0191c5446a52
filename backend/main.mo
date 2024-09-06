import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type BlogPost = {
    id: Nat;
    title: Text;
    content: Text;
    imageUrls: ?[Text];
    createdAt: Time.Time;
  };

  type Comment = {
    id: Nat;
    postId: Nat;
    author: Text;
    content: Text;
    createdAt: Time.Time;
  };

  stable var nextPostId: Nat = 0;
  stable var nextCommentId: Nat = 0;
  let blogPosts = HashMap.HashMap<Nat, BlogPost>(0, Int.equal, Int.hash);
  let comments = HashMap.HashMap<Nat, [Comment]>(0, Int.equal, Int.hash);

  public query func getBlogPosts() : async [BlogPost] {
    Iter.toArray(blogPosts.vals())
  };

  public query func getBlogPost(id: Nat) : async Result.Result<BlogPost, Text> {
    switch (blogPosts.get(id)) {
      case (null) { #err("Blog post not found") };
      case (?post) { #ok(post) };
    }
  };

  public func createBlogPost(title: Text, content: Text, imageUrls: ?[Text]) : async Result.Result<Nat, Text> {
    let id = nextPostId;
    let post: BlogPost = {
      id = id;
      title = title;
      content = content;
      imageUrls = imageUrls;
      createdAt = Time.now();
    };
    blogPosts.put(id, post);
    nextPostId += 1;
    #ok(id)
  };

  public func addComment(postId: Nat, author: Text, content: Text) : async Result.Result<Nat, Text> {
    switch (blogPosts.get(postId)) {
      case (null) { #err("Blog post not found") };
      case (?_) {
        let commentId = nextCommentId;
        let comment: Comment = {
          id = commentId;
          postId = postId;
          author = author;
          content = content;
          createdAt = Time.now();
        };
        let postComments = switch (comments.get(postId)) {
          case (null) { [comment] };
          case (?existing) { Array.append(existing, [comment]) };
        };
        comments.put(postId, postComments);
        nextCommentId += 1;
        #ok(commentId)
      };
    }
  };

  public query func getComments(postId: Nat) : async [Comment] {
    switch (comments.get(postId)) {
      case (null) { [] };
      case (?postComments) { postComments };
    }
  };
}
