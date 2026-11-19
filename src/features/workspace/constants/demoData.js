export const stages = ["New", "Qualified", "Proposal", "Won"];
export const initialWorkspace = {
  deals: [
    {
      id: "d1",
      name: "Website redesign",
      company: "Northstar Studio",
      value: 12500,
      stage: "Proposal",
    },
    {
      id: "d2",
      name: "Brand partnership",
      company: "Forma Collective",
      value: 8750,
      stage: "Qualified",
    },
    {
      id: "d3",
      name: "Growth retainer",
      company: "Studio Co.",
      value: 4200,
      stage: "Won",
    },
    {
      id: "d4",
      name: "Product launch",
      company: "Goodkind",
      value: 9800,
      stage: "New",
    },
  ],
  invoices: [
    {
      id: "INV-1042",
      customer: "Northstar Studio",
      value: 5200,
      status: "Pending",
      dealId: null,
    },
    {
      id: "INV-1043",
      customer: "Forma Collective",
      value: 3800,
      status: "Pending",
      dealId: null,
    },
    {
      id: "INV-1044",
      customer: "Studio Co.",
      value: 4200,
      status: "Paid",
      dealId: "d3",
    },
  ],
  tasks: [
    {
      id: "t1",
      title: "Finalize homepage wireframes",
      project: "Website launch",
      done: false,
      dealId: null,
    },
    {
      id: "t2",
      title: "Review campaign creative",
      project: "Summer campaign",
      done: false,
      dealId: null,
    },
    {
      id: "t3",
      title: "Share brand guidelines",
      project: "Brand refresh",
      done: true,
      dealId: null,
    },
    {
      id: "t4",
      title: "Schedule customer kickoff",
      project: "Studio Co. onboarding",
      done: false,
      dealId: "d3",
    },
  ],
};
