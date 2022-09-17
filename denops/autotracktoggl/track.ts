import Toggl from "./toggl.ts";

export const startTrack = async (
  projectName: string,
  entryName: string,
  createdWith: string,
  apiToken: string
) => {
  const toggl = new Toggl(apiToken);

  const me = await toggl.me();
  const workspace_id = me.default_workspace_id;

  let project = await toggl.findProjectByName(workspace_id, projectName);
  if (!project) {
    project = await toggl.createProject(workspace_id, projectName);
  }

  toggl.createTimeEntry(workspace_id, project.id, entryName, createdWith);
};
