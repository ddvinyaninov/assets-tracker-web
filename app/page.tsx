import { Card, Title, Text } from '@tremor/react';
import Cluster from '../components/cluster';

export default function IndexPage() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Card className="mt-6" style={{'width': 860}}>
                <Cluster/>
            </Card>
        </main>
    );
}
