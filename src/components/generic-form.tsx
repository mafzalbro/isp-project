"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

// Update FormFieldConfig to handle both select and input fields correctly
export type FormFieldConfig = {
    id: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'select' | 'date' | 'tel';
    placeholder?: string;
    options?: { value: string; label: string }[]; // For select fields
};

// Generic form component
interface GenericFormProps<T> {
    formData: T;
    formConfig: FormFieldConfig[];
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (id: string, value: string) => void;
    readOnly?: boolean;
}

export function GenericForm<T>({ formData, formConfig, onFormChange, onSelectChange, readOnly = false }: GenericFormProps<T>) {
    return (
        <div className="grid gap-4 py-4 px-2 max-h-[70vh] overflow-auto">
            {formConfig.map((field) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={field.id} className="text-right">
                        {field.label}
                    </Label>



                    {/* Conditionally render Select or Input based on field type */}
                    {field.type === 'select' ? (
                        <Select
                            onValueChange={(value) => onSelectChange(field.id, value)}
                            value={(formData as any)[field.id]}
                            disabled={readOnly}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <Input
                            id={field.id}
                            type={field.type}
                            value={(formData as any)[field.id]}
                            onChange={onFormChange}
                            className="col-span-3"
                            placeholder={field.placeholder}
                            readOnly={readOnly}
                            disabled={readOnly}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
