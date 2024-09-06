export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Time = IDL.Int;
  const BlogPost = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'imageUrls' : IDL.Opt(IDL.Vec(IDL.Text)),
    'createdAt' : Time,
  });
  const Result = IDL.Variant({ 'ok' : BlogPost, 'err' : IDL.Text });
  const Comment = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'createdAt' : Time,
    'author' : IDL.Text,
    'postId' : IDL.Nat,
  });
  return IDL.Service({
    'addComment' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [Result_1], []),
    'createBlogPost' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Vec(IDL.Text))],
        [Result_1],
        [],
      ),
    'getBlogPost' : IDL.Func([IDL.Nat], [Result], ['query']),
    'getBlogPosts' : IDL.Func([], [IDL.Vec(BlogPost)], ['query']),
    'getComments' : IDL.Func([IDL.Nat], [IDL.Vec(Comment)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
