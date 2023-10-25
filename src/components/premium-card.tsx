import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export const PremiumCard = () => {
    return(
        <Card className='flex w-80 bg-gradient-to-br from-primary from-30% to-secondary-foreground overflow-hidden'>
            <div>
                <CardHeader>
                    <h1 className='text-2xl leading-6 text-card'>Teste o Premium sem pagar nada!</h1>
                    <p className='text-sm text-muted'>- Um mês grátis</p>
                </CardHeader>
                <CardContent>
                    <Button variant='secondary'>Testar Agora</Button>
                </CardContent>
            </div>
        </Card>
    );
}