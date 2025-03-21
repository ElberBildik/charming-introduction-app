
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, ArrowRight, Lock, Key } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi giriniz.",
  }),
});

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulating API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Şifre sıfırlama bağlantısı gönderildi",
        description: "E-posta adresinize şifre sıfırlama bağlantısı gönderdik.",
      });
    } catch (error) {
      toast({
        title: "Şifre sıfırlama bağlantısı gönderilemedi",
        description: "Lütfen e-posta adresinizi kontrol edip tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
              <Key className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-orange-800">Şifrenizi mi unuttunuz?</h2>
            <p className="mt-2 text-sm text-orange-700/80">
              E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
            </p>
          </div>
          
          {isSuccess ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 border border-green-100">
                <AlertTitle className="text-green-800">Şifre sıfırlama bağlantısı gönderildi</AlertTitle>
                <AlertDescription className="text-green-700">
                  E-posta kutunuzu kontrol edin ve şifrenizi sıfırlamak için gönderdiğimiz bağlantıya tıklayın.
                  Eğer e-posta gelmezse spam klasörünü kontrol etmeyi unutmayın.
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Link to="/login">
                  <Button className="w-full">
                    Giriş sayfasına dön
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-orange-800">E-posta adresi</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <FormControl>
                          <Input
                            placeholder="ornek@email.com"
                            className="pl-10 border-amber-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Kayıt olduğunuz e-posta adresinizi giriniz.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Gönderiliyor..."
                    ) : (
                      <>
                        Şifre sıfırlama bağlantısı gönder
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span className="text-orange-700/80">Şifrenizi hatırladınız mı?</span>
                  <Link to="/login" className="font-medium text-primary hover:text-primary/90">
                    Giriş yapın
                  </Link>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
