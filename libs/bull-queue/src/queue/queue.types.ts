export interface Queue<TJobs extends Record<string, { dto: unknown }>> {
  name: string;
  jobs: {
    [K in keyof TJobs]: {
      name: K;
      dto: new (...args: any[]) => TJobs[K]['dto'];
    };
  };
}

export type TJobDto<
  Q extends Queue<any>,
  job extends keyof Q['jobs'],
> = InstanceType<Q['jobs'][job]['dto']>;
