'use client';

import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ActionItem({ edit, acceptEvent, declineEvent }: { edit?: boolean, acceptEvent: Function, declineEvent: Function }) {

    return (
        <div className="flex justify-between">
            { !!edit ?
                <>
                    <XMarkIcon className="h-6 text-red-500 pr-1" onClick={() => declineEvent()}/>
                    <CheckIcon className="h-6 text-cyan-600 pl-1" onClick={() => acceptEvent()}/> 
                </> :
                <>
                    <PencilIcon className="h-6 text-cyan-600 pr-1" onClick={() => acceptEvent()} type="submit"/>
                    <TrashIcon className="h-6 text-red-500 pl-1" onClick={() => declineEvent()}/> 
                </>
            }
        </div>
    );
}