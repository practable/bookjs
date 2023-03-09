export default function (context, event) {
  let promises = [];
  let names = [];
  context.groupsQuery.forEach(function (group, index) {
    // only get details for groups that were in the query params
    names.push(group);
    promises.push(
      fetch(import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/groups/" + group, {
        method: "GET",
        headers: {
          Authorization: context.token,
        },
      }).then((res) => res.json())
    );
  });

  return Promise.all(promises).then((values) => {
    return new Promise((resolve, reject) => {
      var groupDetails = {};
      names.forEach(function (item, index) {
        groupDetails[item] = values[index];
      });

      resolve({ status: "ok", groupDetails: groupDetails });
    });
  });
}
