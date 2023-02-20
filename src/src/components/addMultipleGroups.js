export default function (context, event) {
  let promises = [];
  let names = [];

  //for (const group in context.groupNames)

  function AddGroup(group) {
    names.push(group);
    promises.push(
      fetch(
        import.meta.env.VITE_APP_BOOK_SERVER +
          "/api/v1/users/" +
          context.userName +
          "/groups/" +
          group,
        {
          method: "POST",
          headers: {
            Authorization: context.token,
          },
        }
      )
        .then((res) => {
          if (res.status == 204) {
            //should be OK NO CONTENT for successful add group
            return true;
          }
          return false;
        })
        .catch(console.error)
    );
  }

  if (Array.isArray(context.groupNames)) {
    context.groupNames.forEach(AddGroup);
  }

  return Promise.all(promises).then((values) => {
    return new Promise((resolve, reject) => {
      var results = {};
      names.forEach(function (item, index) {
        results[item] = values[index];
      });

      resolve({ status: "ok", results: results });
    });
  });
}
