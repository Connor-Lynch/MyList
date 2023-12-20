'use client';

import { PlusIcon } from "@heroicons/react/20/solid";
import AddDialog from "./add-dialog";
import { useState } from "react";

export default function AddButton() {
    const [showAddDialog, setAddDialog] = useState(false);

    function toggleAddDialog() {
        setAddDialog(!showAddDialog);
    }

    return (
        <>
            <div>
                { showAddDialog &&
                    <AddDialog cancelEvent={toggleAddDialog}/>
                }
            </div>
            <button className="fixed bottom-3 right-3 h-16 w-16 rounded-full bg-cyan-600 text-white flex items-center justify-center drop-shadow-md z-10" onClick={toggleAddDialog}>
                <PlusIcon className="h-8" />
            </button>
        </>
    );
}