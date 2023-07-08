import { format } from 'date-fns';

export const ResponseHelper = (status: string, message: string, url: string) => ({
    status,
    message,
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    url,
});
