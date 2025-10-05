"use client";

import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function SupportPage() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our support team will get back to you shortly.",
    });
    // Reset form
    setFormState({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({...prev, [id]: value}));
  };
  
  const handleSelectChange = (value: string) => {
    setFormState(prev => ({...prev, category: value}));
  };

  return (
    <>
      <PageHeader
        title="Support"
        description="Get help and support for NetOps Central."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" value={formState.name} onChange={handleInputChange}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your Email" value={formState.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={handleSelectChange} value={formState.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing Issue</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your message" value={formState.subject} onChange={handleInputChange}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Describe your issue or inquiry" className="min-h-[150px]" value={formState.message} onChange={handleInputChange} />
                </div>
                <Button type="submit" className="w-fit">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
              <CardDescription>
                Find answers to common questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-sm font-medium">How do I reset my password?</p>
                <p className="text-sm text-muted-foreground">You can reset your password from the login page by clicking "Forgot your password?".</p>
                 <p className="text-sm font-medium mt-4">How do I upgrade my package?</p>
                <p className="text-sm text-muted-foreground">Navigate to the Packages page and select the plan you wish to upgrade to.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                <strong>Email:</strong> support@netopscentral.com
              </p>
              <p>
                <strong>Phone:</strong> (123) 456-7890
              </p>
              <p className="mt-2 text-muted-foreground">
                Our support team is available from 9 AM to 5 PM, Monday to Friday.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
