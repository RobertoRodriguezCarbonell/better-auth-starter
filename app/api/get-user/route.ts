import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = session.user;
        console.log('User data retrieved:', user);
        
        return Response.json({ user }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error:', error);
        return Response.json({ 
            error: error instanceof Error ? error.message : 'Unknown error occurred' 
        }, { status: 500 });
    }
}