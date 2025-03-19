
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Minus, ChefHat, Clock, Utensils } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Tarif başlığı en az 3 karakter olmalıdır.",
  }),
  description: z.string().min(10, {
    message: "Tarif açıklaması en az 10 karakter olmalıdır.",
  }),
  category: z.enum(["main", "soup", "dessert", "vegetarian", "vegan", "breakfast", "snack"], {
    required_error: "Lütfen bir kategori seçiniz.",
  }),
  prepTime: z.number().min(1, {
    message: "Hazırlık süresi en az 1 dakika olmalıdır.",
  }),
  cookTime: z.number().min(1, {
    message: "Pişirme süresi en az 1 dakika olmalıdır.",
  }),
  difficulty: z.enum(["Kolay", "Orta", "Zor"], {
    required_error: "Lütfen zorluk seviyesi seçiniz.",
  }),
  imageUrl: z.string().url({
    message: "Geçerli bir resim URL'si giriniz.",
  }),
  featured: z.boolean().default(false),
  ingredients: z.array(z.string().min(2, {
    message: "Malzeme en az 2 karakter olmalıdır.",
  })).min(1, {
    message: "En az bir malzeme eklemelisiniz.",
  }),
  instructions: z.array(z.string().min(5, {
    message: "Adım en az 5 karakter olmalıdır.",
  })).min(1, {
    message: "En az bir adım eklemelisiniz.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const TarifEkle = () => {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewData, setPreviewData] = useState<FormValues | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "main",
      prepTime: 10,
      cookTime: 20,
      difficulty: "Orta",
      imageUrl: "https://source.unsplash.com/random/?food",
      featured: false,
      ingredients: [""],
      instructions: [""],
    },
  });

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
    form.setValue("ingredients", newIngredients.filter(i => i !== ""));
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      const newInstructions = [...instructions];
      newInstructions.splice(index, 1);
      setInstructions(newInstructions);
    }
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
    form.setValue("instructions", newInstructions.filter(i => i !== ""));
  };

  const handlePreview = () => {
    const isValid = form.trigger();
    if (isValid) {
      setPreviewData(form.getValues());
      setPreviewDialogOpen(true);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Filter out any empty ingredients or instructions
      const filteredData = {
        ...data,
        ingredients: data.ingredients.filter(item => item.trim() !== ""),
        instructions: data.instructions.filter(item => item.trim() !== ""),
      };
      
      await api.addRecipe({
        ...filteredData,
        rating: 0, // Default rating for new recipes
      });
      
      toast({
        title: "Tarif başarıyla eklendi!",
        description: "Tarifler sayfasında görüntüleyebilirsiniz.",
      });
      navigate("/tarifler");
    } catch (error) {
      console.error("Tarif eklenirken hata oluştu:", error);
      toast({
        title: "Tarif eklenemedi",
        description: "Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      main: "Ana Yemek",
      soup: "Çorba",
      dessert: "Tatlı",
      vegetarian: "Vejetaryen",
      vegan: "Vegan",
      breakfast: "Kahvaltı",
      snack: "Atıştırmalık"
    };
    return categories[category] || category;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <ChefHat className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Yeni Tarif Ekle</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Kendi tariflerinizi paylaşarak topluluk katkı sağlayın
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tarif Başlığı</FormLabel>
                      <FormControl>
                        <Input placeholder="Tarif başlığını giriniz..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Tarifinizi en iyi tanımlayan başlık.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tarif Açıklaması</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tarif hakkında kısa bir açıklama..." 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Tarifinizi kısaca tanıtın. İlham kaynağınız, öyküsü, vb.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Kategori seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="main">Ana Yemek</SelectItem>
                            <SelectItem value="soup">Çorba</SelectItem>
                            <SelectItem value="dessert">Tatlı</SelectItem>
                            <SelectItem value="vegetarian">Vejetaryen</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="breakfast">Kahvaltı</SelectItem>
                            <SelectItem value="snack">Atıştırmalık</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zorluk Seviyesi</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Zorluk seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kolay">Kolay</SelectItem>
                            <SelectItem value="Orta">Orta</SelectItem>
                            <SelectItem value="Zor">Zor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hazırlık Süresi (dakika)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cookTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pişirme Süresi (dakika)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Görsel URL'si</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Yemeğin görseli için bir URL girin.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Öne Çıkan Tarif</FormLabel>
                        <FormDescription>
                          Bu tarif ana sayfada öne çıkarılacak.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div>
                  <Label className="text-base">Malzemeler</Label>
                  <FormDescription className="mt-1 mb-3">
                    Tarifiniz için gereken tüm malzemeleri ekleyin.
                  </FormDescription>
                  
                  <div className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          placeholder={`Malzeme ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                          disabled={ingredients.length <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={addIngredient}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Malzeme Ekle
                  </Button>
                  
                  {form.formState.errors.ingredients && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.ingredients.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label className="text-base">Hazırlanışı</Label>
                  <FormDescription className="mt-1 mb-3">
                    Tarifinizin hazırlanış adımlarını ekleyin.
                  </FormDescription>
                  
                  <div className="space-y-3">
                    {instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-2">
                          {index + 1}
                        </div>
                        <Textarea
                          value={instruction}
                          onChange={(e) => updateInstruction(index, e.target.value)}
                          placeholder={`Adım ${index + 1}`}
                          className="flex-1 min-h-24"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeInstruction(index)}
                          disabled={instructions.length <= 1}
                          className="mt-2"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={addInstruction}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adım Ekle
                  </Button>
                  
                  {form.formState.errors.instructions && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.instructions.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  İptal
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handlePreview}
                  >
                    Önizle
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Ekleniyor..." : "Tarifi Ekle"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          
          {/* Preview Dialog */}
          <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{previewData?.title}</DialogTitle>
                <DialogDescription>
                  Tarif önizlemesi
                </DialogDescription>
              </DialogHeader>
              
              {previewData && (
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={previewData.imageUrl || "https://source.unsplash.com/random/?food"} 
                      alt={previewData.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Hazırlık: {previewData.prepTime} dk</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Utensils className="mr-1 h-4 w-4" />
                      <span>Pişirme: {previewData.cookTime} dk</span>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {previewData.difficulty}
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
                      {getCategoryLabel(previewData.category)}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Açıklama</h3>
                    <p className="mt-1 text-muted-foreground">{previewData.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Malzemeler</h3>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                      {previewData.ingredients
                        .filter(ing => ing.trim() !== "")
                        .map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Hazırlanışı</h3>
                    <ol className="mt-2 space-y-3">
                      {previewData.instructions
                        .filter(ins => ins.trim() !== "")
                        .map((instruction, index) => (
                          <li key={index} className="flex gap-2">
                            <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </div>
                            <p>{instruction}</p>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Kapat</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TarifEkle;
