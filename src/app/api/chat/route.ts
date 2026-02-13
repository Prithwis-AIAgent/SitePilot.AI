import { NextRequest, NextResponse } from 'next/server';
import { Antigravity } from '@/lib/antigravity';

// Initialize agent instance (outside handler to persist across hot reloads in dev, 
// though serverless functions might re-init this is fine for now)
let agent: Antigravity | null = null;

function getAgent() {
    if (!agent) {
        agent = new Antigravity();
    }
    return agent;
}

export async function POST(req: NextRequest) {
    try {
        const { message, dom } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const agentInstance = getAgent();
        // Pass the DOM context from the request, fallback to empty string if not provided
        const actions = await agentInstance.processMessage(message, dom || '');

        return NextResponse.json({ actions }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // TODO: Restrict to portfolio domain in prod
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function OPTIONS(req: NextRequest) {
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
