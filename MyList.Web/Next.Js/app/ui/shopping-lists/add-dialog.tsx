'use client';

import AddListForm from "./add-list-form";

export default function AddDialog({ cancelEvent } : { cancelEvent: Function }) {
    return (
        <div className="fixed h-screen w-screen backdrop-blur-sm backdrop-brightness-75 z-50 flex items-center justify-center">
            <div className='truncate rounded-xl bg-white p-3 z-3 w-1/2 md:w-1/4 h-auto' >
                <h1>Add New List</h1>
                <AddListForm cancelEvent={cancelEvent}/>
            </div>
        </div>
    );
}