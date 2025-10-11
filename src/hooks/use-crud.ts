"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

type CrudConfig<T> = {
  storageKey: string;
  mockData: T[];
  entityName: string;
  entityNamePlural: string;
  initialFormData: Omit<T, "id">;
};

export function useCrud<T extends { id: any; name?: string }>({
  storageKey,
  mockData,
  entityName,
  entityNamePlural,
  initialFormData,
}: CrudConfig<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<T | null>(null);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [formData, setFormData] = useState<Omit<T, "id">>(initialFormData);
  const [readOnly, setReadOnly] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        localStorage.setItem(storageKey, JSON.stringify(mockData));
        setData(mockData);
      }
    } catch (error) {
      console.error(
        `Failed to load or parse ${entityNamePlural} from localStorage`,
        error
      );
      setData(mockData);
    }
  }, [storageKey, mockData, entityNamePlural]);

  const updateLocalStorage = (newData: T[]) => {
    localStorage.setItem(storageKey, JSON.stringify(newData));
  };

  const openDialog = (readOnlyMode = false) => {
    setReadOnly(readOnlyMode);
    setIsDialogOpen(true);
  };

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setItemToEdit(null);
    setFormData(initialFormData);
    setReadOnly(false);
  }, [initialFormData]);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleSelectChange = useCallback((id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (readOnly) {
      closeDialog();
      return;
    }

    for (const key in formData) {
      if (
        // @ts-ignore
        formData[key] === "" ||
        // @ts-ignore
        formData[key] === null ||
        // @ts-ignore
        formData[key] === undefined
      ) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill out all fields.",
        });
        return;
      }
    }

    let updatedData;
    if (itemToEdit) {
      updatedData = data.map((item) =>
        item.id === itemToEdit.id ? { ...itemToEdit, ...formData } : item
      );
      toast({
        title: `${entityName} Updated`,
        description: `${(formData as any).id} has been updated.`,
      });
    } else {
      const newItem = {
        id: `${storageKey.slice(0, 3)}_${Date.now()}`,
        ...formData,
      } as T;
      updatedData = [...data, newItem];
      toast({
        title: `${entityName} Added`,
        description: `${(newItem as any).id} has been added.`,
      });
    }

    setData(updatedData);
    updateLocalStorage(updatedData);
    closeDialog();
  }, [
    data,
    itemToEdit,
    formData,
    closeDialog,
    toast,
    entityName,
    storageKey,
    readOnly,
  ]);

  const handleEditClick = useCallback((item: T) => {
    setItemToEdit(item);
    const { id, ...editFormData } = item;
    setFormData(editFormData);
    openDialog(false);
  }, []);

  const handleViewClick = useCallback((item: T) => {
    const { id, ...viewFormData } = item;
    setFormData(viewFormData);
    openDialog(true);
  }, []);

  const handleDeleteClick = useCallback((item: T) => {
    setItemToDelete(item);
    setIsAlertDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!itemToDelete) return;
    const updatedData = data.filter((item) => item.id !== itemToDelete.id);
    setData(updatedData);
    updateLocalStorage(updatedData);
    toast({
      title: `${entityName} Deleted`,
      description: `${itemToDelete.id} has been deleted.`,
    });
    setIsAlertDialogOpen(false);
    setItemToDelete(null);
  }, [data, itemToDelete, toast, entityName]);

  return {
    data,
    isDialogOpen,
    isAlertDialogOpen,
    itemToEdit,
    itemToDelete,
    formData,
    readOnly,
    setFormData,
    openDialog,
    closeDialog,
    handleFormChange,
    handleSelectChange,
    handleSubmit,
    handleEditClick,
    handleViewClick,
    handleDeleteClick,
    confirmDelete,
    setIsAlertDialogOpen,
    setItemToDelete,
  };
}
