class Toggl {
  headers: Headers;

  constructor(apiToken: string) {
    this.headers = new Headers();
    const token = `${apiToken}:api_token`;
    this.headers.append("Authorization", `Basic ${btoa(token)}`);
    this.headers.append("Content-Type", "application/json");
  }

  me = async (): Promise<Object> => {
    const res = await fetch("https://api.track.toggl.com/api/v9/me", {
      headers: this.headers,
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  };

  createTimeEntry = async (
    workspace_id: number,
    project_id: number,
    description: string,
    created_with: string
  ): Promise<boolean> => {
    const start = new Date();
    const params = {
      workspace_id,
      project_id,
      description,
      created_with,
      start,
      duration: -Math.floor(start.getTime() / 1000),
    };

    const res = await fetch("https://api.track.toggl.com/api/v9/time_entries", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });

    return res.ok;
  };

  findProjectByName = async (
    workspace_id: number,
    name: string
  ): Promise<Object> => {
    const res = await fetch(
      `https://api.track.toggl.com/api/v9/workspaces/${workspace_id}/projects?name=${name}`,
      { headers: this.headers }
    );

    if (res.ok) {
      const data = await res.json();
      if (!!data.length) return data[0];
    }
  };

  createProject = async (
    workspace_id: number,
    name: string
  ): Promise<Object> => {
    const params = {
      name,
      active: true,
      is_private: true,
    };

    const res = await fetch(
      `https://api.track.toggl.com/api/v9/workspaces/${workspace_id}/projects`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(params),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  };
}

export default Toggl;
