export default function (context, event) {
  return new Promise((resolve, reject) => {
    let slots = {}; //map to de-duplicate (just in case the manifest has repeated slot names by mistake)

    for (const name in context.policies) {
      const policy = context.policies[name];
      for (const slot in policy.slots) {
        slots[slot] = policy.slots[slot];
      }
    }

    return resolve({ status: "ok", slots: slots });
  });
}
