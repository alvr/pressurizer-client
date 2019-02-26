interface IConfig {
  apiUrl: string
}

export const config: IConfig = {
  apiUrl: process.env.VUE_APP_BACKEND,
}
