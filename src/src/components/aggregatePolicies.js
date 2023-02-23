export default function (context, event) {
  return new Promise((resolve, reject) => {
    var policies = {};

    // add policies from session bookings)
    // and taint as notbookable
    for (const policy in context.sessionPolicies) {
      let p = context.sessionPolicies[policy];
      p.notBookable = true; //taint, don't book from this policy
      policies[policy] = p;
    }

    // add policies from groups, and ensure they are untainted (i.e. bookable)
    for (const name in context.groupDetails) {
      const group = context.groupDetails[name];
      for (const policy in group.policies) {
        let p = group.policies[policy];
        p.notBookable = false; //overwrite any taint to ensure untainted (i.e. bookable)
        policies[policy] = p;
      }
    }

    return resolve({ status: "ok", policies: policies });
  });
}
