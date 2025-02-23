import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingCircle } from "@/components/loading-circle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllEntriesFromExercise } from "@/hooks/use-exercise";
import { useDeleteEntry } from "@/hooks/use-entry";

import { Navigate, useNavigate } from "react-router-dom";

interface EntryPopupProps {
  exercise: { name: string; id: string };
  onClose: () => void;
}

const REP_RANGE_HEADERS: Record<string, string> = {
  "1": "1-5 reps",
  "2": "6-10 reps",
  "3": "11+ reps",
};

export function ViewEntriesPopup({ exercise, onClose }: EntryPopupProps) {
  const { data, loading, error } = useGetAllEntriesFromExercise(exercise.id);
  const { deleteEntry, loading: deleteLoading, error: deleteError, success } = useDeleteEntry();

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/65">
      <div className="bg-zinc-800 border-2 border-black p-6 rounded-lg shadow-lg w-288 max-h-3/4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{exercise.name} Entries</h2>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>

        {loading && <LoadingCircle />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {data && Object.keys(data).length > 0 ? (
          Object.entries(data).map(([repRange, entries]) => (
            <div key={repRange} className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                {REP_RANGE_HEADERS[repRange] || `Rep Range ${repRange}`}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Sets</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{entry.created_at}</TableCell>
                      <TableCell>{entry.weight}</TableCell>
                      {!entry.sets || entry.sets === 0 ? (
                        <TableCell>-</TableCell>
                      ) : (
                        <TableCell>{entry.sets}</TableCell>
                      )}
                      <TableCell className="text-right">
                        <button
                          onClick={() => {
                            deleteEntry(entry.e_id);
                            navigate(0);
                          }}
                          className="p-2 rounded-md text-white transition-colors hover:bg-red-400"
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? (
                            <LoadingCircle />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          )}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))
        ) : loading || error ? null : (
          <p>No entries found.</p>
        )}
      </div>
    </div>
  );
}