"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

 
const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    profile: z.string().optional(), 
    avatar: z.any().optional(),
});
export default function HomePage() {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          profile: "",
        },
      })
      const handleFileUpload = async (uploadFile: File): Promise<string | undefined> => {
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "hellogram");
      
        try {
          // const response = await fetch(
          //   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          //   {
          //     method: "POST",
          //     body: formData,
          //   }
          // );
      
          // if (!response.ok) {
          //   throw new Error(`HTTP error! Status: ${response.status}`);
          // }
      
          // const data = await response.json();
          // console.log(data);
          return "sexy"
          // return data.secure_url as string;
        } catch (error) {
          console.error(error);
          return undefined;
        }
      };
      
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        let link: string | undefined = undefined;
        if (values.avatar) {
          try {
            link  = await handleFileUpload(values.avatar);
            console.log(link);
          } catch (error) {
            console.error("Error uploading avatar:", error);
          }
        }
        const data: { name: string; email: string; profile?: string | null } = {
          name: values.username,
          email: values.email,
        };
        if (link) {
          data.profile = link;
        }
        await fetch("/api/v1/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        router.push("/chat");
        form.reset();
        
      }
    
  return (
    <div className="flex justify-center items-center bg-image w-screen h-screen overflow-hidden">
    <div className="p-10 bg-white text-[#0088CC] w-96 rounded-lg drop-shadow-xl">
      <p className="text-3xl text-center font-bold relative z-20 mt-2">
        Join Now !
      </p>
      <div className="mt-4 relative z-20">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>What is your Name ?</FormLabel>
                <FormControl>
                    <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                    <Input id="picture" type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            field.onChange(file); // Pass the selected file to the form
                            }
                        }}
                     />
                    </FormControl>
                    <FormDescription>This is your public display Avatar.</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                    <Input className="bg-transparent" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className="bg-[#0088CC] font-semibold" type="submit">Submit</Button>
        </form>
        </Form>
      </div>
    </div>
    </div>
  );
}

