const getRoutes: Record<
  string,
  (req: any, res: any, log: any, error: any) => any
> = {};

export const handleGet = (
  path: string,
  handler: (req: any, res: any, log: any, error: any) => any
) => {
  getRoutes[path] = handler;
};

export const getHandler = (path: string) => getRoutes[path];

// ROUTES
handleGet('/', (req: any, res: any) => {
  return res.json({
    app: 'bp-log',
    version: '1.0.0',
    description: 'A simple blood pressure analysis API.',
    status: 'running',
  });
});

handleGet('/ping', (req: any, res: any) => {
  return res.text('Pong!');
});
