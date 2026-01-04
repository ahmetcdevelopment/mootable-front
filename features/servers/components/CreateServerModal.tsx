"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useServerStore } from "@/store/serverStore";
import { Ship, Globe, Lock, Sparkles } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// Validation schema
const createServerSchema = z.object({
  name: z
    .string()
    .min(2, "Ship name must be at least 2 characters")
    .max(50, "Ship name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Ship name can only contain letters, numbers, spaces, hyphens and underscores"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  isPublic: z.boolean(),
});

type CreateServerFormData = z.infer<typeof createServerSchema>;

interface CreateServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (serverId: string) => void;
}

export function CreateServerModal({ isOpen, onClose, onSuccess }: CreateServerModalProps) {
  const [isPublic, setIsPublic] = useState(false);
  const { createServer, isCreating } = useServerStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateServerFormData>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
    },
  });

  const handleClose = () => {
    reset();
    setIsPublic(false);
    onClose();
  };

  const onSubmit = async (data: CreateServerFormData) => {
    const success = await createServer({
      name: data.name,
      description: data.description || undefined,
      isPublic,
    });

    if (success) {
      handleClose();
      // Could navigate to new server or trigger callback
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Launch a New Ship"
      description="Create your own Nebuchadnezzar in the Matrix"
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Ship Icon Preview */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-moot-primary/20 to-moot-accent/20 border-2 border-dashed border-moot-primary/50 flex items-center justify-center group hover:border-moot-primary transition-colors cursor-pointer">
            <Ship className="w-10 h-10 text-moot-primary group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Name Input */}
        <Input
          {...register("name")}
          id="server-name"
          label="Ship Name"
          placeholder="Enter your ship's name..."
          error={errors.name?.message}
          autoFocus
        />

        {/* Description Input */}
        <div className="w-full">
          <label htmlFor="server-description" className="block text-sm font-medium text-moot-text mb-2">
            Description <span className="text-moot-textMuted">(optional)</span>
          </label>
          <textarea
            {...register("description")}
            id="server-description"
            rows={3}
            className={cn(
              "input-field resize-none",
              errors.description && "border-moot-error focus:ring-moot-error"
            )}
            placeholder="Describe your ship's mission..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-moot-error">{errors.description.message}</p>
          )}
        </div>

        {/* Visibility Toggle */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-moot-text">
            Ship Visibility
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Private Option */}
            <button
              type="button"
              onClick={() => setIsPublic(false)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                !isPublic
                  ? "border-moot-primary bg-moot-primary/10"
                  : "border-moot-surfaceLight hover:border-moot-primary/50 bg-moot-surfaceLight/50"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <Lock className={cn("w-5 h-5", !isPublic ? "text-moot-primary" : "text-moot-textMuted")} />
                <span className={cn("font-medium", !isPublic ? "text-moot-text" : "text-moot-textMuted")}>
                  Private
                </span>
              </div>
              <p className="text-xs text-moot-textMuted">
                Only members with invite code can join
              </p>
            </button>

            {/* Public Option */}
            <button
              type="button"
              onClick={() => setIsPublic(true)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                isPublic
                  ? "border-moot-primary bg-moot-primary/10"
                  : "border-moot-surfaceLight hover:border-moot-primary/50 bg-moot-surfaceLight/50"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <Globe className={cn("w-5 h-5", isPublic ? "text-moot-primary" : "text-moot-textMuted")} />
                <span className={cn("font-medium", isPublic ? "text-moot-text" : "text-moot-textMuted")}>
                  Public
                </span>
              </div>
              <p className="text-xs text-moot-textMuted">
                Anyone can discover and join
              </p>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isCreating}
            className="flex-1"
          >
            <Sparkles className="w-4 h-4" />
            Launch Ship
          </Button>
        </div>
      </form>
    </Modal>
  );
}
