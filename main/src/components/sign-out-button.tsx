"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
	const router = useRouter();

	const { toast } = useToast();

	const { execute: signOut, status: signOutStatus } = useAction(signOutAction, {
		onSuccess: () => {
			toast({
				title: "Başarılı",
				description: "Çıkış yapıldı",
			});
			router.push("/sign-in");
		},
		onError: ({ error }) => {
			toast({
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
