export default function (context, event) {
  let promises = [];
  let names = [];
  for (const group in context.groups) {
    names.push(group);
    promises.push(
      fetch(import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/groups/" + group, {
        method: "GET",
        headers: {
          Authorization: context.token,
        },
      }).then((res) => res.json())
    );
  }

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

// These all work as services - and have increasing complexity.

/* export default function (context, event) {
  return new Promise((resolve, reject) => {
    const data = { a: "a", b: "b" };
    console.log("groupDetails(JSON)", JSON.stringify(data));
    return resolve({ status: "ok", groupDetails: data });
  });
}
*/
/*
export default function (context, event) {
  const group = "g-everyone"; //TODO just for test

  return fetch(
    import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/groups/" + group,
    {
      method: "GET",
      headers: {
        Authorization: context.token,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return new Promise((resolve, reject) => {
        resolve({ status: "ok", groupDetails: data });
      });
    });
}
*/

/*
export default function (context, event) {
  let group = "g-everyone"; //TODO just for test

  const p0 = fetch(
    import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/groups/" + group,
    {
      method: "GET",
      headers: {
        Authorization: context.token,
      },
    }
  ).then((res) => res.json());

  group = "g-engdes1-lab";
  const p1 = fetch(
    import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/groups/" + group,
    {
      method: "GET",
      headers: {
        Authorization: context.token,
      },
    }
  ).then((res) => res.json());

  return Promise.all([p0, p1]).then((values) => {
    return new Promise((resolve, reject) => {
      resolve({ status: "ok", groupDetails: values });
    });
  });
}*/
