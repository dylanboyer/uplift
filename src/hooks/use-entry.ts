import { useState } from "react";

interface EntryData {
  e_id: string;
  weight: number;
  sets: number;
  date: string;
}

interface UseCreateEntryResult {
  createEntry: (data: EntryData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useCreateEntry = (): UseCreateEntryResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEntry = async (data: EntryData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/backend/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update entry");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { createEntry, isLoading, error };
};

import { useState, useCallback } from 'react';

export const useDeleteEntry = (entryId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteEntry = useCallback(async (entryId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/backend/entries/${entryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [entryId]);

  return { deleteEntry, loading, error, success };
};