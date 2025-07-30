import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Click the button below to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button asChild className="w-full">
            <Link href="/">Login</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
