"use client";

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				const Icon =
					props.variant === "destructive"
						? XCircle
						: props.variant === "success"
						? CheckCircle2
						: props.variant === "warning"
						? AlertCircle
						: props.variant === "info"
						? Info
						: null;

				return (
					<Toast key={id} {...props}>
						<div className='flex items-start gap-2'>
							{Icon && <Icon className='h-4 w-4 mt-0.5 flex-shrink-0' />}
							<div className='grid gap-0.5'>
								{title && <ToastTitle>{title}</ToastTitle>}
								{description && (
									<ToastDescription>{description}</ToastDescription>
								)}
							</div>
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
