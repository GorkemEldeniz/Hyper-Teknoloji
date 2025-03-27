"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

export default function SignOutButton() {
	const { toast } = useToast();

	const { execute: signOut, status: signOutStatus } = useAction(signOutAction, {
		onSuccess: () => {
			toast({
				variant: "success",
				title: "Başarılı",
				description: "Çıkış yapıldı",
			});
			localStorage.removeItem("cart");
		},
		onError: ({ error }) => {
			toast({
				variant: "destructive",
				title: "Hata",
				description: error?.serverError || "Çıkış yapılırken bir hata oluştu",
			});
		},
	});

	return (
		<Button disabled={signOutStatus === "executing"} onClick={() => signOut()}>
			{signOutStatus === "executing" ? (
				<Loader2 className='w-4 h-4 animate-spin' />
			) : (
				"Çıkış Yap"
			)}
		</Button>
	);
}
