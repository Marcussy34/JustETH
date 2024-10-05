export const idlFactory = ({ IDL }) => {
  const Store = IDL.Record({
    'name' : IDL.Text,
    'imageUrl' : IDL.Text,
    'rating' : IDL.Nat,
  });
  return IDL.Service({
    'createStore' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'deleteStore' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getAllStores' : IDL.Func([], [IDL.Vec(Store)], ['query']),
    'getStore' : IDL.Func([IDL.Text], [IDL.Opt(Store)], ['query']),
    'updateStore' : IDL.Func([IDL.Text, IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
