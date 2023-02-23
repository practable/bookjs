export default function (context, event) {
  return new Promise((resolve, reject) => {
    let slots = {}; //map to de-duplicate (just in case the manifest has repeated slot names by mistake)

    for (const name in context.policies) {
      const policy = context.policies[name];
      for (const slot in policy.slots) {
        let s = policy.slots[slot];
        s.notBookable = policy.notBookable;
        if (slots[slot]) {
          s.notBookable = s.notBookable && slots[slot].notBookable; // an untainted instance of the slot trumps all the tainted ones, i.e. only one untainted policy containing that slot means we must be able to book on that slot
        }
        slots[slot] = s; //add or update map
      }
    }
    return resolve({ status: "ok", slots: slots });
  });
}
