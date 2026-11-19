import { AgentMock, ContactsMock, PipelineMock, SequenceMock } from "./Mockups";

// Maps a showcase / hero stage id to its mockup. Kept out of Mockups.jsx so that file
// only exports components (keeps React Fast Refresh working).
export const MOCKS = {
  pipeline: PipelineMock,
  sequences: SequenceMock,
  agents: AgentMock,
  contacts: ContactsMock,
};
