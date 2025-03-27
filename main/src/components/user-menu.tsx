import { getCurrentUserAction, signOutAction } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/user";
import { Loader2, LogOut, ShoppingCart } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserMenu({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const [currentUser, setCurrentUser] = useState<Omit<User, "password"> | null>(
		null
	);

	const { toast } = useToast();
	const router = useRouter();

	const { execute: signOut, status: signOutStatus } = useAction(signOutAction, {
		onSuccess: () => {
			toast({
				variant: "success",
				title: "Başarılı",
				description: "Çıkış yapıldı",
				duration: 3000,
			});
			localStorage.removeItem("cart");
			router.push("/sign-in");
		},
		onError: ({ error }) => {
			toast({
				variant: "warning",
				title: "Hata",
				description: error?.serverError || "Çıkış yapılırken bir hata oluştu",
				duration: 3000,
			});
		},
	});

	const { execute: getCurrentUser, status: getCurrentUserStatus } = useAction(
		getCurrentUserAction,
		{
			onSuccess: ({ data }) => {
				if (!data?.success) {
					console.error("Error getting current user", data?.error);
				} else {
					setCurrentUser(data.data);
				}
			},
			onError: ({ error }) => {
				console.error("Error getting current user", error);
			},
		}
	);

	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	if (getCurrentUserStatus === "executing") {
		return (
			<Button variant='ghost' size='icon' className='rounded-full'>
				<Loader2 className='h-4 w-4 animate-spin' />
			</Button>
		);
	}

	return (
		<DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src='' alt='User' />
						<AvatarFallback className='bg-primary text-primary-foreground'>
							{currentUser?.username.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56 mt-1' sideOffset={6}>
				<DropdownMenuLabel>Hesabım</DropdownMenuLabel>
				<DropdownMenuLabel>
					<span className='text-xs font-medium'>{currentUser?.email}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className='cursor-pointer'>
					<Link href='/orders' className='flex w-full'>
						<ShoppingCart className='mr-2 h-4 w-4' />
						<span>Siparişlerim</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => signOut()}
					disabled={signOutStatus === "executing"}
					className='text-destructive cursor-pointer'
				>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Çıkış Yap</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
