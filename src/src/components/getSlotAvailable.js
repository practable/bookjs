export default function (context, event) {
  let promises = [];
  let names = [];
  for (const slot in context.slots) {
    names.push(slot);
    promises.push(
      fetch(
        import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/slots/" + slot,
        //+new URLSearchParams({  //get just the next available window
        //  limit: 1,
        //  offset: 0,
        // })
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
      var available = {};
      names.forEach(function (item, index) {
        available[item] = values[index];
      });

      resolve({ status: "ok", available: available });
    });
  });
}
