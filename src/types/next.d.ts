declare module 'next/server' {
    interface RouteHandlerContext {
      params: { [key: string]: string | string[] }
    }
  }