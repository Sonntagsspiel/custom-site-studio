import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  colorScheme: z.string().min(4).max(7),
  designStyle: z.string(),
  sections: z.array(z.string()),
  font: z.string(),
  layout: z.string(),
  additionalRequirements: z.string().optional(),
});

const designStyles = [
  { value: "modern", label: "Modern" },
  { value: "minimalist", label: "Minimalistisch" },
  { value: "creative", label: "Kreativ" },
  { value: "classic", label: "Klassisch" },
];

const sections = [
  { id: "about", label: "Über uns" },
  { id: "contact", label: "Kontakt" },
  { id: "products", label: "Produkte" },
  { id: "blog", label: "Blog" },
  { id: "faq", label: "FAQs" },
];

const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "opensans", label: "Open Sans" },
  { value: "montserrat", label: "Montserrat" },
  { value: "lato", label: "Lato" },
];

const layouts = [
  { value: "single", label: "Einspaltig" },
  { value: "double", label: "Zweispaltig" },
  { value: "sidebar", label: "Mit Sidebar" },
];

export default function Requirements() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sections: [],
      additionalRequirements: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Anforderungen gespeichert",
      description: "Ihre Anforderungen wurden erfolgreich gespeichert.",
    });
  }

  return (
    <div className="container grid gap-6 py-8 md:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Website Anforderungen
          </h2>
          <p className="text-muted-foreground">
            Definieren Sie hier, wie Ihre Website aussehen soll.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="colorScheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farbschema</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      {...field}
                      className="h-10 w-full cursor-pointer"
                    />
                  </FormControl>
                  <FormDescription>
                    Wählen Sie die Hauptfarbe für Ihre Website
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design-Stil</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie einen Design-Stil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {designStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sections"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Inhaltsabschnitte</FormLabel>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {sections.map((section) => (
                      <FormField
                        key={section.id}
                        control={form.control}
                        name="sections"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={section.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(section.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          section.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== section.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {section.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="font"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schriftart</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie eine Schriftart" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="layout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Layout</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie ein Layout" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {layouts.map((layout) => (
                        <SelectItem key={layout.value} value={layout.value}>
                          {layout.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zusätzliche Anforderungen</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Beschreiben Sie hier weitere Anforderungen..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Speichern</Button>
          </form>
        </Form>
      </div>

      <div className="hidden rounded-lg border p-8 md:block">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Live-Vorschau</h3>
          <p className="text-sm text-muted-foreground">
            Hier wird Ihre Website in Echtzeit angezeigt
          </p>
        </div>
      </div>
    </div>
  );
}