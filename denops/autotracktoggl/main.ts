import { Denops, vars } from "./deps.ts";
import { startTrack } from "./track.ts";

export async function main(denops: Denops): Promise<void> {
  const pluginName = denops.name;

  const apiToken = await vars.g.get(denops, "autotracktoggl_api_token");
  if (!apiToken) {
    throw new Error("Please set g:autotracktoggl_api_token");
  }

  let currentDirName = "";
  let currentBranchName = "";

  const startTracking = async (): Promise<void> => {
    const dirName = await denops.eval('expand("<sfile>:p:h:t")');
    const branchName = await denops.eval("FugitiveHead()");

    if (!branchName) return;
    if (currentDirName === dirName && currentBranchName === branchName) return;

    await startTrack(dirName, branchName, pluginName, apiToken);

    currentDirName = dirName;
    currentBranchName = branchName;
  };

  denops.dispatcher = {
    async startTracking() {
      await startTracking();
      setInterval(startTracking, 3000);
    },
  };

  await denops.cmd("call autotracktoggl#start()");
}
