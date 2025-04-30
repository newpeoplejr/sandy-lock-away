
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Apple, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { mockUsers } from "@/data/users";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const testAccounts = [
  { email: "user@example.com", password: "user123", role: "пользователь" },
  { email: "admin@example.com", password: "admin123", role: "администратор" }
];

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showTestAccounts, setShowTestAccounts] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка тестовых аккаунтов
    const matchedUser = testAccounts.find(
      account => account.email === email && account.password === password
    );
    
    if (matchedUser) {
      toast({
        title: "Успешный вход",
        description: `Вы вошли как ${matchedUser.role}`,
      });
      onLogin();
    } else if (email && password) {
      // Демонстрационный вход
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в систему!",
      });
      onLogin();
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Пожалуйста, заполните все поля",
      });
    }
  };
  
  const fillTestAccount = (account: { email: string; password: string }) => {
    setEmail(account.email);
    setPassword(account.password);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-beach-deep-blue">
            Добро пожаловать в ПляжныеШкафчики
          </DialogTitle>
          <DialogDescription className="text-center text-beach-gray">
            Защитите свои вещи во время отдыха на пляже
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="signup">Регистрация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Электронная почта</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-beach-gray" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="вашапочта@пример.рф"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-beach-gray" />
                  <Input 
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">Войти</Button>
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  type="button" 
                  onClick={() => setShowTestAccounts(!showTestAccounts)}
                  className="text-xs"
                >
                  {showTestAccounts ? "Скрыть тестовые аккаунты" : "Показать тестовые аккаунты"}
                </Button>
                
                {showTestAccounts && (
                  <div className="mt-2 p-3 bg-slate-50 rounded-md text-xs">
                    <div className="flex items-center gap-1 mb-1 text-amber-600">
                      <AlertCircle size={14} />
                      <span className="font-medium">Тестовые аккаунты</span>
                    </div>
                    {testAccounts.map((account, idx) => (
                      <div key={idx} className="mb-2 last:mb-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <div><strong>Почта:</strong> {account.email}</div>
                            <div><strong>Пароль:</strong> {account.password}</div>
                            <div><strong>Роль:</strong> {account.role}</div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => fillTestAccount(account)}
                            className="h-7 text-xs"
                          >
                            Применить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Или войти через</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
                  <Apple className="h-4 w-4" />
                  Apple
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Электронная почта</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-beach-gray" />
                  <Input 
                    id="signup-email"
                    type="email"
                    placeholder="вашапочта@пример.рф"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-beach-gray" />
                  <Input 
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">Зарегистрироваться</Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Или зарегистрироваться через</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
                  <Apple className="h-4 w-4" />
                  Apple
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
