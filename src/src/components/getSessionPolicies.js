export default function (context, event) {
  let promises = [];
  let names = [];
  for (const policy in context.sessionPolicyNames) {
    names.push(policy);
    promises.push(
      fetch(
        import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/policies/" + policy,
        {
          method: "GET",
          headers: {
            Authorization: context.token,
          },
        }
      ).then((res) => res.json())
    );
  }

  return Promise.all(promises).then((values) => {
    return new Promise((resolve, reject) => {
      var sessionPolicies = {};
      names.forEach(function (item, index) {
        sessionPolicies[item] = values[index];
      });

      resolve({ status: "ok", sessionPolicies: sessionPolicies });
    });
  });
}
