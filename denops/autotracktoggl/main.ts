import { Denops, vars } from "./deps.ts";
import { startTrack } from "./track.ts";

export async function main(denops: Denops): Promise<void> {
  const pluginName = denops.name;

  const apiToken = await vars.g.get(denops, "autotracktoggl_api_token");
  if (!apiToken) {
    throw new Error("Please set g:autotracktoggl_api_token");
  }

  denops.dispatcher = {
    async startTracking() {
      const dirName = await denops.eval('expand("<sfile>:p:h:t")');
      const branchName = await denops.eval("FugitiveHead()");

      if (!branchName) return;

      startTrack(dirName, branchName, pluginName, apiToken);
    },
  };

  await denops.cmd(`call denops#notify("${pluginName}", "startTracking", [])`);
}
