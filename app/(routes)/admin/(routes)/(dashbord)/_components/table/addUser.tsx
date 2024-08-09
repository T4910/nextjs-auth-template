"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react";
import { RegisterForm } from "@/components/auth/registerForm"
import { InviteUserForm } from "./inviteUserForm";
import { ReactNode } from "react";

export function AddUserButton() {
    // tab for adding directly & for inviting
    return (
        <AddUserWrapper>
            <Button className="space-x-1">
                <Plus />
                <p className="sr-only md:not-sr-only">Add users</p>
            </Button>
        </AddUserWrapper>
    )
}

export function AddUserWrapper({ children }: { children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Add Users</DialogTitle>
                <DialogDescription>
                    Fill in the user details here.
                </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="direct" className="w-full space-y-4">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="direct">Direct</TabsTrigger>
                        <TabsTrigger value="invite">Invite</TabsTrigger>
                    </TabsList>
                    <TabsContent value="direct">
                        <RegisterForm isAdmin={true}/> 
                    </TabsContent>
                    <TabsContent value="invite">
                        <InviteUserForm />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}